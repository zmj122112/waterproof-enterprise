// 积分计算服务
class ScoreService {
  constructor() {
    // 初始积分
    this.initialScore = 100;
    
    // 积分规则
    this.scoreRules = {
      // 接单相关
      acceptOrder: 30,         // 接单
      rejectOrder: -10,        // 派单后不接单
      
      // 施工拍照相关
      photoBeforeConstruction: 10,  // 施工前拍照
      noPhotoBeforeConstruction: -5, // 不拍
      photoDuringConstruction: 10,   // 施工中拍照
      noPhotoDuringConstruction: -5,  // 不拍
      photoAfterConstruction: 10,    // 完工后拍照
      noPhotoAfterConstruction: -5,   // 不拍
      
      // 评价相关
      goodReview: 30,   // 好评
      mediumReview: 10, // 中评
      badReview: -30    // 差评
    };
  }
  
  // 初始化师傅积分
  initializeMasterScore() {
    return this.initialScore;
  }
  
  // 计算接单积分
  calculateOrderScore(isAccepted) {
    return isAccepted ? this.scoreRules.acceptOrder : this.scoreRules.rejectOrder;
  }
  
  // 计算施工拍照积分
  calculateConstructionPhotoScore(photoBefore, photoDuring, photoAfter) {
    let totalScore = 0;
    
    // 施工前拍照
    totalScore += photoBefore ? this.scoreRules.photoBeforeConstruction : this.scoreRules.noPhotoBeforeConstruction;
    
    // 施工中拍照
    totalScore += photoDuring ? this.scoreRules.photoDuringConstruction : this.scoreRules.noPhotoDuringConstruction;
    
    // 完工后拍照
    totalScore += photoAfter ? this.scoreRules.photoAfterConstruction : this.scoreRules.noPhotoAfterConstruction;
    
    return totalScore;
  }
  
  // 计算评价积分
  calculateReviewScore(reviewType) {
    switch (reviewType) {
      case 'good':
        return this.scoreRules.goodReview;
      case 'medium':
        return this.scoreRules.mediumReview;
      case 'bad':
        return this.scoreRules.badReview;
      default:
        return 0;
    }
  }
  
  // 计算总分
  calculateTotalScore(currentScore, scoreChange) {
    let newScore = currentScore + scoreChange;
    // 确保积分不小于0
    return Math.max(0, newScore);
  }
  
  // 获取积分等级
  getScoreLevel(score) {
    if (score >= 500) {
      return '钻石师傅';
    } else if (score >= 300) {
      return '黄金师傅';
    } else if (score >= 200) {
      return '白银师傅';
    } else if (score >= 100) {
      return '青铜师傅';
    } else {
      return '新手师傅';
    }
  }
  
  // 检查是否符合继续录用条件
  isEligibleForEmployment(score) {
    return score > 0;
  }
  
  // 获取排名奖励
  getRankingReward(ranking) {
    if (ranking === 1) {
      return '年度金奖';
    } else if (ranking === 2) {
      return '年度银奖';
    } else if (ranking === 3) {
      return '年度铜奖';
    } else {
      return '';
    }
  }
}

module.exports = new ScoreService();