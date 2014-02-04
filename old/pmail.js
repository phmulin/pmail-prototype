var jQuery_load_retries = 5;
var gmail_load_retries = 200;

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
            gmail_load_retries = gmail_load_retries -1;
            if(gmail_load_retries > 0)
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
      jQuery_load_retries = jQuery_load_retries -1;
        if(jQuery_load_retries > 0){
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



//loads the initial Pmail UI
function cleanupGmailUI() {
  $( ".gb_g" ).css( "background-color", "green" );
  $("div.akc.aZ6").css("display","none");
  init(3);
};


//loads the initial Pmail UI
function loadPmailUI() {
  return 'loeadPmailUI';
};





function init(step) {
  if(typeof(step)==='undefined') step = 0;

  if(step == 0){
    waitForGmailToLoad();
  }
  else if (step == 1){
    loadjQuery();
  }
  else if (step == 2){
    cleanupGmailUI();
    
  }
  else if (step == 3){
    loadPmailUI();
    console.log('**** Successful end of script! ****');
  }
};

//initialize Pmail app
init(0);