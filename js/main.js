var USER_EMAIL = 'philipp.gutheim@gmail.com'; //USER_EMAIL will be set in setUser_Email by main() as soon as Gmail UI is loaded

var JQUERY_LOAD_RETRIES = 5;
var GMAIL_LOAD_RETRIES = 200;

//Set USER_EMAIL by checking what gmail account is used
//Uses the loading screen of Gmail "loading email@address.com..." to get email account
function setUser_Email(){
  if($("div.msg").text().split(' ')[1].replace('…','') != null){
    USER_EMAIL = $("div.msg").text().split(' ')[1].split('…')[0];
  }
  console.log('new USER_EMAIL: ' + USER_EMAIL);
}

// Script checks every 0.5 seconds for 10 seconds if the GmailUI is loaded. Returns true if it is. 
function waitForGmailToLoad() {
    var head;

    // Loop to check if the Gmail UI is loaded
    var isGmailUIloaded = function() {
        var top_frame, canvas_frame;
        var isloaded = false;

        try {
            top_frame = window.top.document;
            if (top_frame.getElementById('canvas_frame')) {
            }
        } catch (e) {}
        top_frame = window.document;
        
        try {
            isloaded = document.getElementsByClassName('aic').length > 0;
        } catch (e) {}

        if(top_frame && isloaded) 
        {
            head = top_frame;
            init(1);
            return true;
        }
        else{
            GMAIL_LOAD_RETRIES = GMAIL_LOAD_RETRIES -1;
            if(GMAIL_LOAD_RETRIES > 0)
                window.setTimeout(waitForGmailToLoad, 500);
        }
        return (head !== undefined);
    };
    isGmailUIloaded();
};



function loadjQuery() {
  //Check if the jquery js file that we've added in the Manifest was loaded.
  //Iterates several times through script with 0.5 seconds pause.
  var checkIfjQueryLoaded = function() {
    //in case jquery is not loaded
    if (typeof jQuery == 'undefined') {  
      console.log('jQuery not loaded');
      JQUERY_LOAD_RETRIES = JQUERY_LOAD_RETRIES -1;
        if(JQUERY_LOAD_RETRIES > 0){
          window.setTimeout(loadjQuery, 500);
        }
        else{
          return false;
        }
    } else {
      // jQuery is loaded
      console.log('jQuery is loaded');
      init(2);
      return true;
    }
  };
  return checkIfjQueryLoaded();
};



//Initializes prototype. First waits for Gmail UI is loaded, then loads jQuery,
//cleans GmailUI and initializes PmailUI
function init(step) {
  if(typeof(step)==='undefined') step = 0;

  if(step == 0){
    waitForGmailToLoad();
  }
  else if (step == 1){
    loadjQuery();
    setUser_Email();
  }
  else if (step == 2){
    //cleanUI.js cleanupGmailUI()
    console.log('cleaning up UI');
    cleanupGmailUI();    
  }
  else if (step == 3){
    console.log('installing pmail UI');
    loadActionItems();
    loadPmailUI();
    eventHandler();
    console.log('**** Successful end of script! ****');
  }
};

//initialize Pmail app
init(0);