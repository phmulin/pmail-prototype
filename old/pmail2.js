
var MAINVARS = '';

var head;
var max_retry = 200;


var main = {

  //Add jQuery to DOM
  loadJQuery: function(){
    var script = document.createElement('script');
    script.src = 'https://jqueryjs.googlecode.com/files/jquery-1.2.6.min.js';
    script.type = 'text/javascript';
    document.getElementsByTagName('head')[0].appendChild(script);
  },

/*
  //Searches in the DOM for the "Inbox" link that is always present on the left hand side
  checkForInboxLink: function(){
    var els = document.getElementsByTagName("a");
    for (var i = 0, l = els.length; i < l; i++) {
      var el = els[i];
      if (el.href === 'https://mail.google.com/mail/u/0/#inbox') {
        return true;
      }
    }
    return false;
  },
*/
    /*
    // Check if Gmail UI frame is ready 
    function isGmailUIFrame(doc) {
        try {
            return document.getElementsByClassName('aic').length > 0;
        } catch (e) {
            return false;
        }
    }
 */
    // Loop to check if the Gmail UI is loaded
    //var waitForGmailToLoad = function() {
      waitForGmailToLoad: function(){
        var top_frame, canvas_frame;
        try {
            top_frame = window.top.document;
            if (top_frame.getElementById('canvas_frame')) {
            }
        } catch (e) {}
        top_frame = window.document;
        
        //is Gmail UI Frame loaded?
        var isloaded = false;
        try {
            return document.getElementsByClassName('aic').length > 0;
        } catch (e) {
            return false;
        }


        if(top_frame && isloaded) 
        {
            head = top_frame;
            // Gmail UI is loaded: insert the script elements
            //createScriptElement(head);
            alert('isloaded');
            return head;
        }
        else{
            max_retry = max_retry -1;
            if(max_retry > 0)
                window.setTimeout(waitForGmailToLoad, 500);
        }
        return (head !== undefined);
    },


  //Setup before Pmail can be loaded. Adds jQuery and ensures main Gmail screen is open.
  init: function(){
    console.log("init");
    main.loadJQuery();
    if (typeof jQuery == 'undefined') {  
    // jQuery is not loaded
      alert('jquert not loaded');
    } else {
    // jQuery is loaded
      alert('jquert is loaded');
    }
    console.log('beforeLoad');
    var response = this.waitForGmailToLoad();
    console.log('afterLoad');
    console.log(response);
    //pMailGenerator.generatePmailUI();
  },

}




var pMailGenerator = {

  generatePmailUI: function() {
    alert(document.domain);
  },
}

/*
//Initialize script if we are in gmail
if(document.domain == 'mail.google.com'){
  if(main.checkForInboxLink() == false){
    console.log("No link. Before timeout");
    window.setTimeout(main.init,15000);
  }
  else{
    main.init();
  }
}
*/

if(document.domain == 'mail.google.com'){
  main.init();
}
