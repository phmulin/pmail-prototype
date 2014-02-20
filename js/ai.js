//Action Item Object Constructor
var AI = function(options){
  this.owner = USERNAME;
  this.id = String((new Date).getTime()) + "-" + AI_ID_COUNTER; //set epoch time as unique id
  this.options = $.extend({ 
    title: 'Action Item',  
    emailthread: null,  
    from: this.user,
    to: this.user,
    deadline: null,
    durationHours: null, 
  }, options);

  AI_ID_COUNTER++;
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