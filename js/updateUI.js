//loads the initial Pmail UI
function cleanupGmailUI() {
  //remove red "Gmail" link [upper left]
  $("div.akh.J-J5-Ji.J-JN-I").parent().hide();
  //remove main top navigation and search bar [top]
  $("div.nH.oy8Mbf.qp").hide();
  
  //remove hangout [lower left]
  $("div.aeO.aeR").hide();
  $("div.aeO").hide();
  $("div.aeO").removeAttr("gh");
  $("div.aeO").next().hide();
  //deactivate scrolling bar of inbox
  $("div.Tm.aeJ").css('overflow-y','');

  $("div.nH.oy8Mbf.nn.aeN").next().attr('id', 'pmail-inbox');
  $("div#pmail-inbox").find("div.D.E.G-atb").hide();

  //Make Inbox Link visible again
  $("a.J-Ke.n0[title^='Inbox']").text('Back to All Emails');
  $("a.J-Ke.n0[title^='Inbox']").parents().eq(3).attr('id','foo');

  //Hide Sent Mail and Drafts links
  $("a.J-Ke.n0[title='Sent Mail']").hide();
  $("a.J-Ke.n0[title='Drafts']").hide();
  
  $("div.ajl.aib.aZ6.aji").height(300);
  $("div.akc.Ls77Lb.aZ6").next().remove();
  //alter left nativation bar, remove "move" (.n6) and labels (.zw)
  $("div.n6").hide();
  $("div.zw").hide();

  //Change how email list is displayed. Remove bottons and icons on the left and space out content
  //add id to email list
  $("table.F.cf.zt").attr("id","pmail-inbox-list");
  //Select email list table and set all icons to hide.
  $("#pmail-inbox-list").find("td.PF.xY, td.oZ-x3.xY.aid, td.apU.xY, td.WA.xY").hide();
  //remove the colgroup in table
  $("#pmail-inbox-list").find("colgroup").remove();
  //remove bottons, navs, and ads above emails
  $("div.D.E.G-atb.bP").parent().hide();
  $("div.D.E.G-atb.bP").parent().next().hide();

  //Set new email list layout and add event trigger when new email is added
  var emaillist = $("#pmail-inbox-list").children().children(); 
  $.each( emaillist, function(index, emailrow) {
    $(emailrow).find("td:eq(4)").width(150);
    $(emailrow).find("td:eq(5)").width("auto");
    $(emailrow).find("td:eq(6)").width(24);
    $(emailrow).find("td:eq(7)").width(50);
  });
  //if new email(s) come in, ensure that the same layout is applied
  $("#pmail-inbox-list").bind('DOMNodeInserted', function(){
    var newEmails = $("#pmail-inbox-list").find("tr.zA.zE");
    $("#pmail-inbox-list").find("tr.zA.zE").find("td.PF.xY, td.oZ-x3.xY.aid, td.apU.xY, td.WA.xY").hide();
    $.each( newEmails, function(index, emailrow) {
      $(emailrow).find("td:eq(4)").width(150);
      $(emailrow).find("td:eq(5)").width("auto");
      $(emailrow).find("td:eq(6)").width(24);
      $(emailrow).find("td:eq(7)").width(50);
    });
  });

  //initialize loadPamilUI() via init()
  init(3);
};


//loads the initial PmailUI
function loadPmailUI() {
  // add id and spacing
  $("div.nH.oy8Mbf.nn.aeN").next().after('<div class="nH nn" id="pmail-inbox-spacing" style="width: 4px; height: 4px;"></div>');


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
                <tbody id='pmail-aidashboard-list'>\
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

  //Adjust CSS of Left-Navigation, Inbox and AI Dashbord
  $("div.nH.oy8Mbf.nn.aeN").attr('id','pmail-left-navigation');
  $("#pmail-left-navigation").width(170);
  $("#pmail-inbox").width(820); //Inbox
  $("#pmail-aidashbord").width(400); //AI Dashbord

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
      var hash = document.location.hash;
      var hash_q = hash.split('?');
      var hash_s = hash.split('/');
      //if a user clicks on "compose" button, wait until
      //compose box has opened and call function that
      //modifies the compose email UI
      if(hash_q[hash_q.length-1] == "compose=new"){
        setTimeout(function() {
          addAIcomposeUI();
        }, 300);
      }

      //If the user opens an email that was searched through
      //the AI dashabord interface OR opened an email through the
      //regular inbox: rearrange UI
      else if(hash_s[hash_s.length-3] == "#search" || hash_s[hash_s.length-2] == "#inbox"){
        //expand email details by hiding empty area
        $("td.Bu.y3").hide();
        //hide "archive, spam and delete" navigation
        $("div.T-I.J-J5-Ji.lR.T-I-ax7.T-I-Js-IF.ar7").hide();
        $("div.T-I.J-J5-Ji.lR.T-I-ax7.T-I-Js-IF.ar7").next().hide();
        $("div.T-I.J-J5-Ji.lR.T-I-ax7.T-I-Js-IF.ar7").next().next().hide();
        //hide "move to inbox, labels" navigation
        //(2x because classes are different if you open through search or through inbox)
        $("div.T-I.J-J5-Ji.aFj.T-I-ax7.L3").hide();
        $("div.T-I.J-J5-Ji.aFj.T-I-ax7.L3").next().hide();
        $("div.T-I.J-J5-Ji.T-I-Js-IF.ar7.ns.T-I-ax7.L3").hide();
        $("div.T-I.J-J5-Ji.T-I-Js-IF.ar7.ns.T-I-ax7.L3").next().hide();
        //hide "more" navigation
        $("div.T-I.J-J5-Ji.ar7.nf.T-I-ax7.L3").hide();
        //hide settings etc navigation
        $("div.adF").hide();  
      }

      //If the user has searched for an email and the results are
      //displayed in a list
      else if(hash_s[hash_s.length-2] == "#search"){
        //hide "selecting, refresh, and settings etc" navigation
        $("div.nH.aqK").children().hide();
        $("div.l2.ov").hide();
      }

      //cleanup UI on return to inbox
      else if(hash_s[hash_s.length-1] == "#inbox"){
        $("div#pmail-inbox").find("div.D.E.G-atb").hide();
      }
  });
};
