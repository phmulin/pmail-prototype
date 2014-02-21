//loads the initial Pmail UI
function cleanupGmailUI() {
  //$( ".gb_g" ).css( "background-color", "green" );

  //remove red "Gmail" link [upper left]
  $("div.akh.J-J5-Ji.J-JN-I").parent().hide();
  //remove main top navigation and search bar [top]
  $("div.nH.oy8Mbf.qp").hide();
  //remove Inbox, Sent, All Mail etc. links
  $("div.ajl.aib.aZ6").hide();
  //remove hangout [lower left]
  $("div.aeO.aeR").hide();
  $("div.aeO").hide();
  $("div.aeO").removeAttr("gh");
  $("div.aeO").next().hide();
  $("div.akc.aZ6.ajm").hide();
  $("div.ajl.aib.aZ6.aji").height(300);
  $("div.akc.Ls77Lb.aZ6").next().remove();
  //alter left nativation bar, remove "move" (.n6) and labels (.zw)
  $("div.n6").hide();
  $("div.zw").hide();

  //Change how email list is displayed. Remove bottons and icons on the left and space out content
  //add id to email list
  $("table.F.cf.zt").attr('id','pmail-inbox-list');
  //Select email list table and set all icons to hide.
  $("#pmail-inbox-list").find("td.PF.xY, td.oZ-x3.xY.aid, td.apU.xY, td.WA.xY").hide();
  //remove the colgroup in table
  $("#pmail-inbox-list").find("colgroup").remove();
  //Set new email list layout
  var emaillist = $("#pmail-inbox-list").children().children(); 
  $.each( emaillist, function(index, emailrow) {
    $(emailrow).find("td:eq(4)").width(150);
    $(emailrow).find("td:eq(5)").width("auto");
    $(emailrow).find("td:eq(6)").width(24);
    $(emailrow).find("td:eq(7)").width(50);
  });

  //remove bottons, navs, and ads above emails
  $("div.D.E.G-atb.bP").parent().hide();
  $("div.D.E.G-atb.bP").parent().next().hide();

  //initialize loadPamilUI() via init()
  init(3);
};


//loads the initial PmailUI
function loadPmailUI() {
  // add id and spacing
  $("div.nH.oy8Mbf.nn.aeN").next().find("div.nH.nn").attr('id', 'pmail-inbox');
  $("div.nH.oy8Mbf.nn.aeN").next().find("div.nH.nn").after('<div class="nH nn" id="pmail-inbox-spacing" style="width: 4px; height: 4px;"></div>');

  //add AI dashboard
  var aidashboard = "\
  <div class='nH nn' id='pmail-aidashboard' style='width: 400px;'>\
    <div class='nH'>\
      <div class='BltHke nK' role='main'>\
        <div class='nH Cq'><div class='nJ A2'>Current Action Items</div></div>\
        <div class='awe4 UI UJ' gh='tl'>\
          <div class='Cp'>\
            <div>\
              <table cellpadding='0' id=':jt' class='F cf zt'>\
                <colgroup>\
                  <col style='width:50%;'>\
                  <col style='width:25%;'>\
                  <col style='width:25%;'>\
                </colgroup>\
                <tbody id='pmail-aidashboard-list'>\
                  <tr id='pmail-column-heads'>\
                    <th class='nJ A2'>Title</th>\
                    <th class='nJ A2'>From</th>\
                    <th class='nJ A2'>To</th>\
                  </tr>\
                </tbody>\
              </table>\
            </div>\
          </div>\
        </div>\
      </div>\
    </div>\
  </div>\
  ";

  //Add AI Dashboard
  $("#pmail-inbox-spacing").after(aidashboard);

  //Adjust CSS of Inbox and AI Dashabord
  $("#pmail-inbox").width(800); //Inbox
  $("#pmail-aidashabord").width(400); //AI Dashabord

};


//Renders AIs on dashboard if the callback in pmail.js is triggered
function renderAIs(listOfAIs){
  //remove existing AIs in list
  $('#pmail-aidashboard-list').find('tr').not('#pmail-column-heads').remove();

  //add AIs in listOfAIs
  var aisOfUser = [];
  $.each( listOfAIs, function(key, data){
    if(data.to == USER_EMAIL || data.from == USER_EMAIL){
      var actionitem_html = " <tr class='zA yO'>\
                                <td>"+data.title+"</td>\
                                <td style='font-size: x-small;'>"+data.from.replace('@gmail.com', '')+"</td>\
                                <td style='font-size: x-small;'>"+data.to.replace('@gmail.com', '')+"</td>\
                              </tr>\
                            ";
      $('#pmail-aidashboard-list').append(actionitem_html);
    }
  });
};

//If a user clicks on "compose button", we modify the compose email UI
//and add "Assign AI"
function addAIcomposeUI(){
  //assign ID to compose new message element
  $("div.nH.aJl.nn").next().attr("id", "pmail-compose");
  //get receipient element and append AI element
  var aiElement = "\
    <div class='aoD az6'>\
      <input id='pmail-ai-field' class='aoT' tabindex='1' placeholder='Assign Action Item To'>\
    </div>\
  ";
  
  $("#pmail-compose").find('form').append(aiElement);

  //if user submits email, check if AI was assigned and
  //call function to save AI
  $('div[aria-label="Send ‪(⌘Enter)‬"]').click(function() {
    if($("#pmail-ai-field").val() != ''){
      //Calls safeNewAI to store AI in Firebase.
      //First attribute provided is the AI owner, second AI title from email subject
      //Function returns RESTful path to AI [0] and AI object [1]
      var response = safeNewAI($("#pmail-ai-field").val(),$("input[name='subjectbox']").val());
      //Send out email of new AI to owner and sender
      sendAIEmail(response, 'new');
    }
  });
};


//Handles events that trigger a change in URL
function eventHandler(){
  
  //if URL in Gmail changes
  $(window).bind( 'hashchange', function(e) { 
      //if a user clicks on "compose" button, wait until
      //compose box has opened and call function that
      //modifies the compose email UI
      if(document.location.hash == "#inbox?compose=new"){
        setTimeout(function() {
          addAIcomposeUI();
        }, 300);
      }
  });

};