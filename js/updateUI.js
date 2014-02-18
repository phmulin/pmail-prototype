//loads the initial Pmail UI
function cleanupGmailUI() {
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

  //do initial removal of navigation and ad above emails
  cleanupGmailUIOnEvent();
  //initialize loadPamilUI() via init()
  init(3);
};

function cleanupGmailUIOnEvent(){
  //remove bottons, navs, and ads above emails
  $("div.D.E.G-atb.bP").parent().hide();
  $("div.D.E.G-atb.bP").parent().next().hide();
  //$("div.nH.aqK").hide();//navbar on non-inbox sections
}


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
                <tbody id='pmail-aidashboard-list'>\
                  <tr class='zA yO'>\
                    <td>1</td>\
                    <td>2</td>\
                    <td>3</td>\
                  </tr>\
                  <tr class='zA yO'>\
                    <td>1</td>\
                    <td>2</td>\
                    <td>3</td>\
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