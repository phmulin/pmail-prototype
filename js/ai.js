//Action Item Object Constructor
var AI = function(params){
  if('from' in params){this.from = params.from;} else {this.from = USER_EMAIL;}
  if('to' in params){this.to = params.to;} else {this.to = USER_EMAIL;}
  if('title' in params){this.title = params.title;} else {this.title = 'Action Item';}
  if('status' in params){this.status = params.status;} else {this.status = 'unconfirmed';}
  if('dueDate' in params){
    this.dueDate = params.dueDate;
  } else {
    var today = new Date();
    //Set dueDate for next week (+7 days)
    this.dueDate = getDeadlineString(new Date(today.setDate(today.getDate() + 7)));
  }
};
  
AI.prototype = {
  get:function(){
    return {};
  },
  set:function(){
    return true;
  },
  getId:function(){
    return this.id;
  }
};