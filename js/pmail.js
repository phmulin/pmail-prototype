//loads Pmain UI and logic for composing emails
function compose() {
  
  //$( ".gb_g" ).css( "background-color", "green" );

  //remove red "Gmail" link [upper left]
  $("div.akh.J-J5-Ji.J-JN-I").parent().css("display","none");
  //remove main top navigation and search bar [top]
  $("div.nH.oy8Mbf.qp").css("display","none");
  //remove hangout [lower left]
  $("div.aeO.aeR").css("display","none");
  $("div.aeO").css("display","none");
  $("div.aeO").removeAttr("gh");
  $("div.aeO").next().css("display","none");
  $("div.akc.aZ6.ajm").css("display","none");
  $("div.ajl.aib.aZ6.aji").height(300);
  $("div.akc.Ls77Lb.aZ6").next().remove();
  //alter left nativation bar, remove "move" (.n6) and labels (.zw)
  $("div.n6").css("display","none");
  $("div.zw").css("display","none");
  //do initial removal of navigation and ad above emails
  cleanupGmailUIOnEvent();
  //initialize loadPamilUI() via init()
  init(3);
};

function localdb() {
  //setup local storage
  var init = function(){
    //...
  };
  var save = function(type, data){
    //type is what information
    //data is kv-pairs
  };
  var load = function(type, key){
    //returns data
  };
  var del = function(){
    //deletes a record
  };
  var reset = function(){
    //cleans the entire local storage
  };
};


function pmailEventHandler() {

  var addComposeUI = function() {
    //$("div.T-I.J-J5-Ji.T-I-KE.L3.T-I-JW.T-I-Je.T-I-J0").click()//on release compose button
    //add display none div to compose screen

    //OR: Once To field in email becomes "un-display:none", add AI field
    //Click event or change in display event for Receipient field
    //Add AI field
  };

  var addAI = function() {
    //Once user added information
    //add ID token to email
    //store information in local storage
  };

  var aiDashabordClick = function(){
    //load 
  };

  var loadAI = function(mode){
    if(mode == 'init'){
      console.log('jep loading');
    }
  };


  //add event clicks etc
};