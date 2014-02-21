//Action Item Object Constructor
var AI = function(params){
  if('from' in params){this.from = params.from} else {this.from = null};
  if('to' in params){this.to = params.to} else {this.to = null};
  if('title' in params){this.title = params.title} else {this.title = ''};
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