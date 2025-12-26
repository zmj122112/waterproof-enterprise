/**
 * 积分计算服务
 * 管理积分规则、计算积分变化、处理积分历史等
 */

// 初始积分
const INITIAL_SCORE = 100;

// 积分有效期（天）
const SCORE_EXPIRY_DAYS = 365;

// 积分规则配置
const SCORE_RULES = {
  // 接单相关
  ACCEPT_ORDER: 30,        // 接单 +30分
  REJECT_ORDER: -10,       // 派单后不接单 -10分
  COMPLETE_ORDER: 20,      // 完成订单 +20分
  CANCEL_ORDER: -15,       // 取消订单 -15分
  
  // 施工拍照相关
  PHOTO_BEFORE_CONSTRUCTION: 10,  // 施工前拍照 +10分
  NO_PHOTO_BEFORE: -5,      // 不拍 -5分
  PHOTO_DURING_CONSTRUCTION: 10,   // 施工中拍照 +10分
  NO_PHOTO_DURING: -5,       // 不拍 -5分
  PHOTO_AFTER_CONSTRUCTION: 10,    // 完工后拍照 +10分
  NO_PHOTO_AFTER: -5,        // 不拍 -5分
  
  // 评价相关
  POSITIVE_RATING: 30,      // 好评 +30分
  NEUTRAL_RATING: 10,       // 中评 +10分
  NEGATIVE_RATING: -30,     // 差评 -30分
  
  // 其他行为
  FIRST_LOGIN: 5,          // 首次登录 +5分
  DAILY_LOGIN: 1,          // 每日登录 +1分
  SHARE_APP: 5,            // 分享应用 +5分
  COMPLETE_PROFILE: 20,    // 完善个人资料 +20分
  TRAINING_COMPLETE: 50,    // 完成培训 +50分
  SAFETY_INSPECTION: 25     // 安全检查通过 +25分
};

// 师傅等级配置
const MASTER_LEVELS = [
  { name: '初级师傅', minScore: 0, maxScore: 99, description: '新加入的师傅，需要继续努力' },
  { name: '铜牌师傅', minScore: 100, maxScore: 199, description: '完成基础培训，具备基本技能' },
  { name: '银牌师傅', minScore: 200, maxScore: 299, description: '技能熟练，服务质量良好' },
  { name: '金牌师傅', minScore: 300, maxScore: 499, description: '技术精湛，客户满意度高' },
  { name: '钻石师傅', minScore: 500, maxScore: Infinity, description: '行业专家，服务卓越' }
];

/**
 * 计算积分变化
 * @param {string} action 行为类型
 * @returns {number} 积分变化值
 */
export const calculateScoreChange = (action) => {
  return SCORE_RULES[action] || 0;
};

/**
 * 计算新的积分
 * @param {number} currentScore 当前积分
 * @param {string} action 行为类型
 * @returns {number} 新的积分值
 */
export const calculateNewScore = (currentScore, action) => {
  const change = calculateScoreChange(action);
  let newScore = currentScore + change;
  // 积分不能为负数
  return Math.max(0, newScore);
};

/**
 * 获取初始积分
 * @returns {number} 初始积分值
 */
export const getInitialScore = () => {
  return INITIAL_SCORE;
};

/**
 * 获取积分规则列表
 * @returns {Array} 积分规则列表
 */
export const getScoreRules = () => {
  return [
    { type: '接单', action: 'ACCEPT_ORDER', description: '接单', score: SCORE_RULES.ACCEPT_ORDER },
    { type: '接单', action: 'REJECT_ORDER', description: '派单后不接单', score: SCORE_RULES.REJECT_ORDER },
    { type: '接单', action: 'COMPLETE_ORDER', description: '完成订单', score: SCORE_RULES.COMPLETE_ORDER },
    { type: '接单', action: 'CANCEL_ORDER', description: '取消订单', score: SCORE_RULES.CANCEL_ORDER },
    { type: '施工拍照', action: 'PHOTO_BEFORE_CONSTRUCTION', description: '施工前拍照', score: SCORE_RULES.PHOTO_BEFORE_CONSTRUCTION },
    { type: '施工拍照', action: 'NO_PHOTO_BEFORE', description: '不拍', score: SCORE_RULES.NO_PHOTO_BEFORE },
    { type: '施工拍照', action: 'PHOTO_DURING_CONSTRUCTION', description: '施工中拍照', score: SCORE_RULES.PHOTO_DURING_CONSTRUCTION },
    { type: '施工拍照', action: 'NO_PHOTO_DURING', description: '不拍', score: SCORE_RULES.NO_PHOTO_DURING },
    { type: '施工拍照', action: 'PHOTO_AFTER_CONSTRUCTION', description: '完工后拍照', score: SCORE_RULES.PHOTO_AFTER_CONSTRUCTION },
    { type: '施工拍照', action: 'NO_PHOTO_AFTER', description: '不拍', score: SCORE_RULES.NO_PHOTO_AFTER },
    { type: '评价', action: 'POSITIVE_RATING', description: '获得好评', score: SCORE_RULES.POSITIVE_RATING },
    { type: '评价', action: 'NEUTRAL_RATING', description: '获得中评', score: SCORE_RULES.NEUTRAL_RATING },
    { type: '评价', action: 'NEGATIVE_RATING', description: '获得差评', score: SCORE_RULES.NEGATIVE_RATING },
    { type: '其他', action: 'FIRST_LOGIN', description: '首次登录', score: SCORE_RULES.FIRST_LOGIN },
    { type: '其他', action: 'DAILY_LOGIN', description: '每日登录', score: SCORE_RULES.DAILY_LOGIN },
    { type: '其他', action: 'SHARE_APP', description: '分享应用', score: SCORE_RULES.SHARE_APP },
    { type: '其他', action: 'COMPLETE_PROFILE', description: '完善个人资料', score: SCORE_RULES.COMPLETE_PROFILE },
    { type: '其他', action: 'TRAINING_COMPLETE', description: '完成培训', score: SCORE_RULES.TRAINING_COMPLETE },
    { type: '其他', action: 'SAFETY_INSPECTION', description: '安全检查通过', score: SCORE_RULES.SAFETY_INSPECTION }
  ];
};

/**
 * 根据积分获取师傅等级
 * @param {number} score 当前积分
 * @returns {Object} 师傅等级信息
 */
export const getMasterLevel = (score) => {
  const level = MASTER_LEVELS.find(l => score >= l.minScore && score <= l.maxScore);
  return level;
};

/**
 * 根据积分获取师傅等级名称
 * @param {number} score 当前积分
 * @returns {string} 师傅等级名称
 */
export const getMasterLevelName = (score) => {
  return getMasterLevel(score).name;
};

/**
 * 计算排名
 * @param {Array} masterList 师傅列表
 * @param {string} masterId 师傅ID
 * @returns {Object} 排名信息
 */
export const calculateRanking = (masterList, masterId) => {
  // 按积分降序排序
  const sortedList = [...masterList].sort((a, b) => b.currentScore - a.currentScore);
  // 查找排名
  const index = sortedList.findIndex(master => master.id === masterId);
  const ranking = index + 1;
  const total = sortedList.length;
  const percentage = total > 0 ? Math.round(((total - ranking) / total) * 100) : 0;
  
  return {
    ranking,
    total,
    percentage
  };
};

/**
 * 格式化积分为显示文本
 * @param {number} score 积分值
 * @returns {string} 格式化后的积分文本
 */
export const formatScore = (score) => {
  return score.toString();
};

/**
 * 计算总积分
 * @param {Array} scoreHistory 积分历史记录
 * @returns {number} 总积分
 */
export const calculateTotalScore = (scoreHistory) => {
  return scoreHistory.reduce((total, record) => {
    return total + parseInt(record.score);
  }, INITIAL_SCORE);
};

/**
 * 计算有效积分
 * @param {Array} scoreHistory 积分历史记录
 * @returns {number} 有效积分
 */
export const calculateValidScore = (scoreHistory) => {
  const now = new Date();
  return scoreHistory.reduce((total, record) => {
    const recordDate = new Date(record.createdAt);
    const daysDiff = Math.floor((now - recordDate) / (1000 * 60 * 60 * 24));
    // 只计算未过期的积分
    if (daysDiff <= SCORE_EXPIRY_DAYS) {
      return total + parseInt(record.score);
    }
    return total;
  }, INITIAL_SCORE);
};

/**
 * 计算积分兑换所需积分
 * @param {number} productScore 商品所需积分
 * @param {number} userScore 用户当前积分
 * @returns {Object} 兑换结果
 */
export const calculateExchangeScore = (productScore, userScore) => {
  const canExchange = userScore >= productScore;
  const remainingScore = canExchange ? userScore - productScore : userScore;
  
  return {
    canExchange,
    requiredScore: productScore,
    userScore,
    remainingScore
  };
};

/**
 * 计算积分有效期
 * @param {Date} createDate 创建日期
 * @returns {Object} 有效期信息
 */
export const calculateScoreExpiry = (createDate) => {
  const expiryDate = new Date(createDate);
  expiryDate.setDate(expiryDate.getDate() + SCORE_EXPIRY_DAYS);
  const now = new Date();
  const daysRemaining = Math.ceil((expiryDate - now) / (1000 * 60 * 60 * 24));
  const isExpired = daysRemaining < 0;
  
  return {
    expiryDate,
    daysRemaining: Math.max(0, daysRemaining),
    isExpired
  };
};

/**
 * 生成积分历史记录
 * @param {string} action 行为类型
 * @param {string} masterId 师傅ID
 * @param {string} orderId 订单ID（可选）
 * @returns {Object} 积分历史记录
 */
export const generateScoreHistory = (action, masterId, orderId = null) => {
  const scoreChange = calculateScoreChange(action);
  return {
    id: `SH${Date.now()}${Math.floor(Math.random() * 1000)}`,
    masterId,
    action,
    score: scoreChange,
    orderId,
    createdAt: new Date().toISOString(),
    description: getScoreRules().find(rule => rule.action === action)?.description || action
  };
};

/**
 * 统计积分历史
 * @param {Array} scoreHistory 积分历史记录
 * @returns {Object} 积分统计信息
 */
export const analyzeScoreHistory = (scoreHistory) => {
  const positiveScores = scoreHistory.filter(record => record.score > 0);
  const negativeScores = scoreHistory.filter(record => record.score < 0);
  
  // 按类型统计
  const typeStats = {};
  getScoreRules().forEach(rule => {
    const type = rule.type;
    if (!typeStats[type]) {
      typeStats[type] = {
        name: type,
        totalScore: 0,
        count: 0
      };
    }
  });
  
  scoreHistory.forEach(record => {
    const rule = getScoreRules().find(r => r.action === record.action);
    if (rule) {
      typeStats[rule.type].totalScore += record.score;
      typeStats[rule.type].count++;
    }
  });
  
  return {
    totalRecords: scoreHistory.length,
    totalPositive: positiveScores.length,
    totalNegative: negativeScores.length,
    totalPositiveScore: positiveScores.reduce((sum, record) => sum + record.score, 0),
    totalNegativeScore: negativeScores.reduce((sum, record) => sum + record.score, 0),
    typeStats: Object.values(typeStats)
  };
};

/**
 * 获取积分规则详情
 * @param {string} action 行为类型
 * @returns {Object|null} 积分规则详情
 */
export const getScoreRuleDetail = (action) => {
  return getScoreRules().find(rule => rule.action === action) || null;
};

/**
 * 检查积分是否足够
 * @param {number} requiredScore 所需积分
 * @param {number} userScore 用户当前积分
 * @returns {boolean} 是否足够
 */
export const isScoreEnough = (requiredScore, userScore) => {
  return userScore >= requiredScore;
};

/**
 * 计算升级所需积分
 * @param {number} currentScore 当前积分
 * @returns {Object} 升级信息
 */
export const calculateUpgradeScore = (currentScore) => {
  const currentLevel = getMasterLevel(currentScore);
  const nextLevelIndex = MASTER_LEVELS.indexOf(currentLevel) + 1;
  const nextLevel = MASTER_LEVELS[nextLevelIndex];
  
  if (!nextLevel) {
    // 已经是最高等级
    return {
      canUpgrade: false,
      currentLevel,
      nextLevel: null,
      requiredScore: 0,
      remainingScore: 0,
      progress: 100
    };
  }
  
  const requiredScore = nextLevel.minScore - currentScore;
  const totalRequired = nextLevel.minScore - currentLevel.minScore;
  const progress = Math.round(((currentScore - currentLevel.minScore) / totalRequired) * 100);
  
  return {
    canUpgrade: requiredScore > 0,
    currentLevel,
    nextLevel,
    requiredScore,
    remainingScore: requiredScore,
    progress: Math.min(100, progress)
  };
};

// 导出所有功能
export default {
  INITIAL_SCORE,
  SCORE_EXPIRY_DAYS,
  calculateScoreChange,
  calculateNewScore,
  getInitialScore,
  getScoreRules,
  getMasterLevel,
  getMasterLevelName,
  calculateRanking,
  formatScore,
  calculateTotalScore,
  calculateValidScore,
  calculateExchangeScore,
  calculateScoreExpiry,
  generateScoreHistory,
  analyzeScoreHistory,
  getScoreRuleDetail,
  isScoreEnough,
  calculateUpgradeScore
};