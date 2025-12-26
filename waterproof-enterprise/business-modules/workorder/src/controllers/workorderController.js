const { Workorder, WorkorderSurvey, WorkorderConstruction, WorkorderInspection, WorkorderMaterial } = require('../models');
const { v4: uuidv4 } = require('uuid');

// 生成工单号
const generateWorkorderNo = () => {
  const prefix = 'W' + new Date().toISOString().slice(2, 10).replace(/-/g, '');
  const suffix = uuidv4().slice(0, 6).toUpperCase();
  return `${prefix}-${suffix}`;
};

// 获取所有工单
const getAllWorkorders = async (req, res) => {
  try {
    const { status, workorder_type, customer_id, page = 1, limit = 10 } = req.query;
    const offset = (page - 1) * limit;
    
    // 构建查询条件
    const where = {};
    if (status) where.status = status;
    if (workorder_type) where.workorder_type = workorder_type;
    if (customer_id) where.customer_id = customer_id;
    
    // 查询工单列表和总数
    const { count, rows } = await Workorder.findAndCountAll({
      where,
      offset,
      limit: parseInt(limit),
      include: [
        { model: WorkorderSurvey, as: 'survey', attributes: ['id', 'survey_time', 'leak_point', 'leak_cause'] },
        { model: WorkorderInspection, as: 'inspection', attributes: ['id', 'result', 'inspection_time'] }
      ],
      order: [['created_at', 'DESC']]
    });
    
    res.status(200).json({
      success: true,
      data: {
        workorders: rows,
        pagination: {
          total: count,
          page: parseInt(page),
          limit: parseInt(limit),
          totalPages: Math.ceil(count / limit)
        }
      },
      message: '获取工单列表成功'
    });
  } catch (error) {
    console.error('获取工单列表失败:', error);
    res.status(500).json({
      success: false,
      message: '获取工单列表失败',
      error: error.message
    });
  }
};

// 根据ID获取工单详情
const getWorkorderById = async (req, res) => {
  try {
    const { id } = req.params;
    const workorder = await Workorder.findByPk(id, {
      include: [
        { model: WorkorderSurvey, as: 'survey' },
        { model: WorkorderConstruction, as: 'constructions' },
        { model: WorkorderInspection, as: 'inspection' },
        { model: WorkorderMaterial, as: 'materials' }
      ]
    });
    
    if (!workorder) {
      return res.status(404).json({
        success: false,
        message: '工单不存在'
      });
    }
    
    res.status(200).json({
      success: true,
      data: workorder,
      message: '获取工单详情成功'
    });
  } catch (error) {
    console.error('获取工单详情失败:', error);
    res.status(500).json({
      success: false,
      message: '获取工单详情失败',
      error: error.message
    });
  }
};

// 创建工单
const createWorkorder = async (req, res) => {
  try {
    const { 
      customer_id, project_id, workorder_type, leak_type, leak_area, 
      description, address, created_by 
    } = req.body;
    
    // 验证必填字段
    if (!customer_id || !workorder_type || !address || !created_by) {
      return res.status(400).json({
        success: false,
        message: '客户ID、工单类型、服务地址和创建人为必填字段'
      });
    }
    
    // 生成工单号
    const workorder_no = generateWorkorderNo();
    
    // 创建工单
    const workorder = await Workorder.create({
      workorder_no,
      customer_id,
      project_id,
      workorder_type,
      leak_type,
      leak_area,
      description,
      address,
      created_by,
      status: 'CREATED'
    });
    
    res.status(201).json({
      success: true,
      data: workorder,
      message: '创建工单成功'
    });
  } catch (error) {
    console.error('创建工单失败:', error);
    res.status(500).json({
      success: false,
      message: '创建工单失败',
      error: error.message
    });
  }
};

// 更新工单
const updateWorkorder = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;
    
    // 查找工单
    const workorder = await Workorder.findByPk(id);
    if (!workorder) {
      return res.status(404).json({
        success: false,
        message: '工单不存在'
      });
    }
    
    // 更新工单信息
    await workorder.update(updateData);
    
    res.status(200).json({
      success: true,
      data: workorder,
      message: '更新工单成功'
    });
  } catch (error) {
    console.error('更新工单失败:', error);
    res.status(500).json({
      success: false,
      message: '更新工单失败',
      error: error.message
    });
  }
};

// 删除工单
const deleteWorkorder = async (req, res) => {
  try {
    const { id } = req.params;
    
    // 查找工单
    const workorder = await Workorder.findByPk(id);
    if (!workorder) {
      return res.status(404).json({
        success: false,
        message: '工单不存在'
      });
    }
    
    // 删除工单（级联删除相关记录）
    await workorder.destroy();
    
    res.status(200).json({
      success: true,
      message: '删除工单成功'
    });
  } catch (error) {
    console.error('删除工单失败:', error);
    res.status(500).json({
      success: false,
      message: '删除工单失败',
      error: error.message
    });
  }
};

// 分配工单
const assignWorkorder = async (req, res) => {
  try {
    const { id } = req.params;
    const { assigned_to } = req.body;
    
    // 查找工单
    const workorder = await Workorder.findByPk(id);
    if (!workorder) {
      return res.status(404).json({
        success: false,
        message: '工单不存在'
      });
    }
    
    // 更新工单分配信息和状态
    await workorder.update({
      assigned_to,
      status: 'ASSIGNED'
    });
    
    res.status(200).json({
      success: true,
      data: workorder,
      message: '分配工单成功'
    });
  } catch (error) {
    console.error('分配工单失败:', error);
    res.status(500).json({
      success: false,
      message: '分配工单失败',
      error: error.message
    });
  }
};

module.exports = {
  getAllWorkorders,
  getWorkorderById,
  createWorkorder,
  updateWorkorder,
  deleteWorkorder,
  assignWorkorder
};
