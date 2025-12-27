# 防水服务平台后端API设计

## 1. API概述

本API设计基于防水服务平台的业务需求，支持C端小程序、B端门户、管理系统和师傅端应用的所有功能。API采用RESTful设计风格，使用JSON格式进行数据交互。

## 2. API基础信息

### 2.1 基础URL

```
https://api.waterproof.example.com/v1
```

### 2.2 请求头

| 字段名 | 类型 | 描述 | 必选 |
| :--- | :--- | :--- | :--- |
| Content-Type | String | 请求体格式，固定为application/json | 是 |
| Authorization | String | 认证令牌，格式为Bearer {token} | 是 |
| User-Agent | String | 请求客户端信息 | 否 |

### 2.3 响应格式

```json
{
  "code": 200,
  "message": "成功",
  "data": {...}
}
```

| 字段名 | 类型 | 描述 |
| :--- | :--- | :--- |
| code | Integer | 响应码，200表示成功，其他表示失败 |
| message | String | 响应消息 |
| data | Object/Array | 响应数据 |

### 2.4 错误码

| 错误码 | 描述 |
| :--- | :--- |
| 200 | 成功 |
| 400 | 请求参数错误 |
| 401 | 未授权 |
| 403 | 禁止访问 |
| 404 | 资源不存在 |
| 500 | 服务器内部错误 |
| 501 | 服务不可用 |

## 3. 用户相关API

### 3.1 用户登录

- **URL**: `/auth/login`
- **方法**: POST
- **请求体**:
  ```json
  {
    "openid": "string",
    "unionid": "string",
    "nickName": "string",
    "avatarUrl": "string",
    "gender": 0,
    "phone": "string"
  }
  ```
- **响应体**:
  ```json
  {
    "code": 200,
    "message": "成功",
    "data": {
      "token": "string",
      "user": {
        "id": 1,
        "name": "string",
        "phone": "string",
        "avatar": "string",
        "userType": 1,
        "status": 1
      }
    }
  }
  ```

### 3.2 获取用户信息

- **URL**: `/users/me`
- **方法**: GET
- **响应体**:
  ```json
  {
    "code": 200,
    "message": "成功",
    "data": {
      "id": 1,
      "name": "string",
      "phone": "string",
      "avatar": "string",
      "gender": 0,
      "address": "string",
      "userType": 1,
      "status": 1
    }
  }
  ```

### 3.3 更新用户信息

- **URL**: `/users/me`
- **方法**: PUT
- **请求体**:
  ```json
  {
    "name": "string",
    "avatar": "string",
    "gender": 0,
    "address": "string"
  }
  ```
- **响应体**:
  ```json
  {
    "code": 200,
    "message": "成功",
    "data": {
      "id": 1,
      "name": "string",
      "phone": "string",
      "avatar": "string",
      "gender": 0,
      "address": "string",
      "userType": 1,
      "status": 1
    }
  }
  ```

## 4. 首页相关API

### 4.1 获取轮播图

- **URL**: `/banners`
- **方法**: GET
- **响应体**:
  ```json
  {
    "code": 200,
    "message": "成功",
    "data": [
      {
        "id": 1,
        "title": "string",
        "image": "string",
        "link": "string"
      }
    ]
  }
  ```

### 4.2 获取核心服务

- **URL**: `/services`
- **方法**: GET
- **响应体**:
  ```json
  {
    "code": 200,
    "message": "成功",
    "data": [
      {
        "id": 1,
        "title": "string",
        "icon": "string",
        "description": "string"
      }
    ]
  }
  ```

### 4.3 获取工程案例

- **URL**: `/project-cases`
- **方法**: GET
- **请求参数**:
  - page: Integer, 默认1
  - pageSize: Integer, 默认10
  - categoryId: Long, 分类ID，可选
- **响应体**:
  ```json
  {
    "code": 200,
    "message": "成功",
    "data": {
      "list": [
        {
          "id": 1,
          "title": "string",
          "description": "string",
          "image": "string",
          "category": "string"
        }
      ],
      "total": 100,
      "page": 1,
      "pageSize": 10
    }
  }
  ```

### 4.4 获取客户评价

- **URL**: `/customer-reviews`
- **方法**: GET
- **请求参数**:
  - page: Integer, 默认1
  - pageSize: Integer, 默认10
  - masterId: Long, 师傅ID，可选
- **响应体**:
  ```json
  {
    "code": 200,
    "message": "成功",
    "data": {
      "list": [
        {
          "id": 1,
          "name": "string",
          "content": "string",
          "rating": 5,
          "project": "string"
        }
      ],
      "total": 100,
      "page": 1,
      "pageSize": 10
    }
  }
  }
  ```

## 5. 师傅相关API

### 5.1 获取师傅列表

- **URL**: `/masters`
- **方法**: GET
- **请求参数**:
  - page: Integer, 默认1
  - pageSize: Integer, 默认10
  - level: String, 师傅等级，可选
  - title: String, 师傅头衔，可选
  - keyword: String, 搜索关键词（姓名或工号），可选
  - region: String, 所在区域，可选
- **响应体**:
  ```json
  {
    "code": 200,
    "message": "成功",
    "data": {
      "list": [
        {
          "id": 1,
          "name": "string",
          "avatar": "string",
          "jobNumber": "string",
          "title": "string",
          "level": "string",
          "rating": 4.9,
          "experience": "15年",
          "serviceCount": 1280,
          "region": "上海市·浦东新区",
          "certifications": ["实名认证", "金牌工长", "持证上岗"],
          "score": 100,
          "completedOrders": 50
        }
      ],
      "total": 100,
      "page": 1,
      "pageSize": 10
    }
  }
  ```

### 5.2 获取师傅详情

- **URL**: `/masters/{id}`
- **方法**: GET
- **响应体**:
  ```json
  {
    "code": 200,
    "message": "成功",
    "data": {
      "id": 1,
      "name": "string",
      "avatar": "string",
      "phone": "string",
      "jobNumber": "string",
      "title": "string",
      "level": "string",
      "rating": 4.9,
      "experience": "15年",
      "serviceCount": 1280,
      "region": "上海市·浦东新区",
      "certifications": ["实名认证", "金牌工长", "持证上岗"],
      "score": 100,
      "completedOrders": 50,
      "description": "string",
      "reviews": [
        {
          "id": 1,
          "content": "string",
          "rating": 5,
          "project": "string",
          "createdAt": "2023-10-01 12:00:00"
        }
      ]
    }
  }
  ```

## 6. 产品相关API

### 6.1 获取产品列表

- **URL**: `/products`
- **方法**: GET
- **请求参数**:
  - page: Integer, 默认1
  - pageSize: Integer, 默认10
  - categoryId: Long, 分类ID，可选
  - keyword: String, 搜索关键词，可选
  - sort: String, 排序字段（price, sales, created_at），可选
  - order: String, 排序方式，可选，asc或desc
  - isRecommend: Integer, 是否推荐（1:是, 0:否），可选
- **响应体**:
  ```json
  {
    "code": 200,
    "message": "成功",
    "data": {
      "list": [
        {
          "id": 1,
          "name": "string",
          "description": "string",
          "images": ["string", "string"],
          "categoryName": "string",
          "price": 100.00,
          "originalPrice": 120.00,
          "score": 100,
          "sales": 100,
          "stock": 50,
          "isRecommend": 0
        }
      ],
      "total": 100,
      "page": 1,
      "pageSize": 10
    }
  }
  ```

### 6.2 获取产品详情

- **URL**: `/products/{id}`
- **方法**: GET
- **响应体**:
  ```json
  {
    "code": 200,
    "message": "成功",
    "data": {
      "id": 1,
      "name": "string",
      "description": "string",
      "images": ["string", "string"],
      "categoryId": 1,
      "categoryName": "string",
      "price": 100.00,
      "originalPrice": 120.00,
      "stock": 50,
      "sales": 100,
      "score": 100,
      "specs": {"color": "red", "size": "L"},
      "isRecommend": 0,
      "createdAt": "2023-10-01 12:00:00"
    }
  }
  ```

## 7. 订单相关API

### 7.1 创建订单

- **URL**: `/orders`
- **方法**: POST
- **请求体**:
  ```json
  {
    "serviceId": 1,
    "productIds": "1,2,3",
    "type": 1,
    "customerName": "string",
    "customerPhone": "string",
    "address": "string",
    "appointmentTime": "2023-10-01 14:00:00",
    "problemDescription": "string",
    "projectType": "卫生间漏水"
  }
  ```
- **响应体**:
  ```json
  {
    "code": 200,
    "message": "成功",
    "data": {
      "id": 1,
      "orderNo": "string",
      "status": "待接单",
      "totalAmount": 0.00,
      "createdAt": "2023-10-01 12:00:00"
    }
  }
  ```

### 7.2 获取订单列表

- **URL**: `/orders`
- **方法**: GET
- **请求参数**:
  - page: Integer, 默认1
  - pageSize: Integer, 默认10
  - status: String, 订单状态，可选
  - type: Integer, 订单类型，可选
- **响应体**:
  ```json
  {
    "code": 200,
    "message": "成功",
    "data": {
      "list": [
        {
          "id": 1,
          "orderNo": "string",
          "type": 1,
          "status": "待接单",
          "customerName": "string",
          "customerPhone": "string",
          "address": "string",
          "appointmentTime": "2023-10-01 14:00:00",
          "description": "string",
          "totalAmount": 0.00,
          "createdAt": "2023-10-01 12:00:00"
        }
      ],
      "total": 100,
      "page": 1,
      "pageSize": 10
    }
  }
  ```

### 7.3 获取订单详情

- **URL**: `/orders/{id}`
- **方法**: GET
- **响应体**:
  ```json
  {
    "code": 200,
    "message": "成功",
    "data": {
      "id": 1,
      "orderNo": "string",
      "type": 1,
      "status": "待接单",
      "customerName": "string",
      "customerPhone": "string",
      "address": "string",
      "appointmentTime": "2023-10-01 14:00:00",
      "problemDescription": "string",
      "projectType": "卫生间漏水",
      "totalAmount": 0.00,
      "paidAmount": 0.00,
      "paymentStatus": 0,
      "paymentMethod": 1,
      "paymentTime": "2023-10-01 13:00:00",
      "startTime": "2023-10-01 14:00:00",
      "endTime": "2023-10-01 16:00:00",
      "evaluateStatus": 0,
      "master": {
        "id": 1,
        "name": "string",
        "avatar": "string",
        "phone": "string",
        "jobNumber": "string",
        "title": "string"
      },
      "services": [
        {
          "id": 1,
          "name": "卫生间漏水维修",
          "price": 1000.00
        }
      ],
      "products": [
        {
          "id": 1,
          "name": "防水卷材",
          "price": 200.00,
          "quantity": 2
        }
      ],
      "createdAt": "2023-10-01 12:00:00",
      "updatedAt": "2023-10-01 12:00:00"
    }
  }
  ```

### 7.4 取消订单

- **URL**: `/orders/{id}/cancel`
- **方法**: PUT
- **响应体**:
  ```json
  {
    "code": 200,
    "message": "成功",
    "data": {
      "id": 1,
      "status": "已取消"
    }
  }
  ```

## 8. 积分相关API

### 8.1 获取积分信息

- **URL**: `/scores/me`
- **方法**: GET
- **响应体**:
  ```json
  {
    "code": 200,
    "message": "成功",
    "data": {
      "currentScore": 150,
      "totalScore": 200
    }
  }
  ```

### 8.2 获取积分记录

- **URL**: `/scores/records`
- **方法**: GET
- **请求参数**:
  - page: Integer, 默认1
  - pageSize: Integer, 默认10
  - type: String, 积分类型，可选
- **响应体**:
  ```json
  {
    "code": 200,
    "message": "成功",
    "data": {
      "list": [
        {
          "id": 1,
          "type": "接单",
          "action": "接单",
          "score": "+30",
          "time": "2023-10-01 12:00:00",
          "orderId": "string"
        }
      ],
      "total": 100,
      "page": 1,
      "pageSize": 10
    }
  }
  ```

## 9. 积分商城相关API

### 9.1 获取商品列表

- **URL**: `/score-mall/products`
- **方法**: GET
- **请求参数**:
  - page: Integer, 默认1
  - pageSize: Integer, 默认10
  - category: String, 商品分类，可选
  - keyword: String, 搜索关键词，可选
- **响应体**:
  ```json
  {
    "code": 200,
    "message": "成功",
    "data": {
      "list": [
        {
          "id": 1,
          "name": "string",
          "score": 399,
          "originalPrice": 99,
          "image": "string",
          "category": "商品",
          "description": "string",
          "stock": 50,
          "status": "上架"
        }
      ],
      "total": 100,
      "page": 1,
      "pageSize": 10
    }
  }
  ```

### 9.2 兑换商品

- **URL**: `/score-mall/exchange`
- **方法**: POST
- **请求体**:
  ```json
  {
    "productId": 1
  }
  ```
- **响应体**:
  ```json
  {
    "code": 200,
    "message": "成功",
    "data": {
      "id": 1,
      "productName": "string",
      "score": 399,
      "status": "待审核",
      "createdAt": "2023-10-01 12:00:00"
    }
  }
  ```

### 9.3 获取兑换记录

- **URL**: `/score-mall/records`
- **方法**: GET
- **请求参数**:
  - page: Integer, 默认1
  - pageSize: Integer, 默认10
  - status: String, 兑换状态，可选
- **响应体**:
  ```json
  {
    "code": 200,
    "message": "成功",
    "data": {
      "list": [
        {
          "id": 1,
          "productId": 1,
          "productName": "string",
          "productImage": "string",
          "score": 399,
          "exchangeTime": "2023-10-01 12:00:00",
          "status": "已完成",
          "orderId": "string"
        }
      ],
      "total": 100,
      "page": 1,
      "pageSize": 10
    }
  }
  ```

## 10. 积分排名相关API

### 10.1 获取积分排行榜

- **URL**: `/ranking`
- **方法**: GET
- **请求参数**:
  - page: Integer, 默认1
  - pageSize: Integer, 默认10
  - keyword: String, 搜索关键词，可选
- **响应体**:
  ```json
  {
    "code": 200,
    "message": "成功",
    "data": {
      "topThree": [
        {
          "id": 1,
          "name": "string",
          "avatar": "string",
          "currentScore": 580,
          "level": "钻石师傅"
        }
      ],
      "list": [
        {
          "id": 4,
          "name": "string",
          "avatar": "string",
          "currentScore": 420,
          "level": "金牌师傅"
        }
      ],
      "currentUser": {
        "id": 6,
        "name": "string",
        "avatar": "string",
        "currentScore": 320,
        "level": "银牌师傅",
        "ranking": 6
      },
      "total": 100,
      "page": 1,
      "pageSize": 10
    }
  }
  ```

## 11. 管理系统API

管理系统API用于后台管理，包括用户管理、订单管理、师傅管理、产品管理、积分管理等功能。由于管理系统功能较为复杂，这里只列出主要的API分类，具体API设计可以参考详细的管理系统API文档。

### 11.1 用户管理
- `/admin/users`: 管理用户列表
- `/admin/users/{id}`: 管理用户详情
- `/admin/users/{id}/status`: 更新用户状态

### 11.2 订单管理
- `/admin/orders`: 管理订单列表
- `/admin/orders/{id}`: 管理订单详情
- `/admin/orders/{id}/assign`: 分配订单给师傅
- `/admin/orders/{id}/status`: 更新订单状态

### 11.3 师傅管理
- `/admin/masters`: 管理师傅列表
- `/admin/masters/{id}`: 管理师傅详情
- `/admin/masters/{id}/status`: 更新师傅状态

### 11.4 产品管理
- `/admin/products`: 管理产品列表
- `/admin/products/{id}`: 管理产品详情
- `/admin/products/{id}/status`: 更新产品状态

### 11.5 积分管理
- `/admin/scores`: 管理积分规则
- `/admin/scores/records`: 管理积分记录

### 11.6 兑换管理
- `/admin/exchange`: 管理兑换记录
- `/admin/exchange/{id}/status`: 更新兑换状态

## 12. API安全设计

1. **认证与授权**: 使用JWT令牌进行身份认证，不同角色拥有不同的权限
2. **接口限流**: 对API接口进行限流，防止恶意请求
3. **数据加密**: 敏感数据在传输过程中进行加密
4. **输入验证**: 对所有输入参数进行严格验证，防止注入攻击
5. **输出过滤**: 对输出数据进行过滤，防止敏感信息泄露
6. **日志记录**: 记录所有API请求日志，便于审计和追溯
7. **定期安全审计**: 定期进行API安全审计，发现并修复安全漏洞

## 13. API性能优化

1. **缓存机制**: 对频繁访问的数据进行缓存，减少数据库查询
2. **分页查询**: 所有列表接口都支持分页查询，避免返回大量数据
3. **异步处理**: 对耗时操作采用异步处理，提高API响应速度
4. **数据库优化**: 优化数据库查询语句，创建合理的索引
5. **CDN加速**: 静态资源使用CDN加速，提高访问速度
6. **负载均衡**: 采用负载均衡技术，提高系统的并发处理能力

## 14. API版本管理

1. **版本号**: API版本号包含在URL中，如`/v1/users`
2. **向后兼容**: 新版本API要保持向后兼容，避免破坏现有客户端
3. **废弃警告**: 对于即将废弃的API，在响应头中添加废弃警告
4. **版本迁移**: 提供版本迁移指南，帮助客户端平滑升级

## 15. 总结

本API设计基于防水服务平台的业务需求，涵盖了C端小程序、B端门户、管理系统和师傅端应用的所有功能。设计中考虑了API的安全性、性能、可扩展性和可维护性，为后续的系统开发和运维提供了坚实的基础。