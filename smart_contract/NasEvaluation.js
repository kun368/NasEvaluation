'use strict';


class Record {

  from;
  txHash;
  time;
  school;  //学校
  academy; //学院
  teacherName; //老师姓名
  scoreAcademic; //学术水平评分
  scoreFunding;  //科研经费评分
  scoreRelationship; //师生关系评分
  scoreFuture;    //学生前途评分
  scoreSum;   //综合评价评分
  content;    //评价内容
  proveContent; //证明自己认识导师的内容

  constructor(text) {
    if (!text) {
      return;
    }
    const o = JSON.parse(text);
    this.from = o.from;
    this.txHash = o.txHash;
    this.time = o.time;
    this.school = o.school;
    this.academy = o.academy;
    this.teacherName = o.teacherName;
    this.scoreAcademic = o.scoreAcademic;
    this.scoreFunding = o.scoreFunding;
    this.scoreRelationship = o.scoreRelationship;
    this.scoreFuture = o.scoreFuture;
    this.scoreSum = o.scoreSum;
    this.content = o.content;
    this.proveContent = o.proveContent;
  }

  toString() {
    return JSON.stringify(this);
  }
}


const NasEvaluation = function () {
  LocalContractStorage.defineMapProperty(this, 'schoolMap');
};

NasEvaluation.prototype = {

  init: function () {
  },


  _push(collectionName, key, value) {
    let item = this[collectionName].get(key);
    if (!item) {
      item = [];
    }
    item.push(value);
    this[collectionName].put(key, item);
  },

  _get(collectionName, key) {
    let item = this[collectionName].get(key);
    if (!item) {
      item = [];
    }
    return item;
  },

  createEvaluation(school,
                   academy,
                   teacherName,
                   scoreAcademic,
                   scoreFunding,
                   scoreRelationship,
                   scoreFuture,
                   scoreSum,
                   content,
                   proveContent) {
    const item = new Record();
    item.from = Blockchain.transaction.from;
    item.txHash = Blockchain.transaction.hash;
    item.time = Blockchain.transaction.timestamp * 1000;
    item.school = school;
    item.academy = academy;
    item.teacherName = teacherName;
    item.scoreAcademic = scoreAcademic;
    item.scoreFunding = scoreFunding;
    item.scoreRelationship = scoreRelationship;
    item.scoreFuture = scoreFuture;
    item.scoreSum = scoreSum;
    item.content = content;
    item.proveContent = proveContent;
    this._push("schoolMap", item.school, item);
  },

  querySchool(school) {
    return this._get("schoolMap", school);
  }

};
module.exports = NasEvaluation;
