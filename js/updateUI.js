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
  //do initial removal of navigation and ad above emails
  cleanupGmailUIOnEvent();
  //initialize loadPamilUI() via init()
  init(3);
};

function cleanupGmailUIOnEvent(){
  //remove bottons, navs, and ads above emails
  $("div.D.E.G-atb.bP").parent().css("display","none");
  $("div.D.E.G-atb.bP").parent().next().css("display","none");
}


//loads the initial PmailUI
function loadPmailUI() {
  
  // need to load the right hand side AI Dashboard

  // add id and spacing
  $("div.nH.oy8Mbf.nn.aeN").next().find("div.nH.nn").attr('id', 'pmail-inbox');
  $("div.nH.oy8Mbf.nn.aeN").next().find("div.nH.nn").after('<div class="nH nn" id="pmail-inbox-spacing" style="width: 4px; height: 4px;"></div>');

  //add AI dashboard
  var aidashboard = "\
  <div class='nH nn' id='pmail-aidashabord' style='width: 532.8px;'>\
    <div class='nH'>\
      <div class='BltHke nK' role='main'>\
        <div class='nH Cq'><div class='nJ A2'>Awaiting Response</div></div>\
        <div class='awe4 UI UJ' gh='tl'>\
          <div class='Cp'>\
            <div>\
              <table cellpadding='0' id=':jt' class='F cf zt'>\
                <colgroup>\
                  <col class='k0vOLb'>\
                  <col class='ye'>\
                  <col class='y5'>\
                  <col class='WA'>\
                  <col class='y1'>\
                  <col class='null'>\
                  <col class='yg'>\
                  <col class='xX'>\
                </colgroup>\
                <tbody>\
                  <tr class='zA yO' id=':k4'>\
                    <td>1</td>\
                    <td>2</td>\
                    <td>3</td>\
                    <td>4</td>\
                    <td>5</td>\
                    <td>6</td>\
                    <td>7</td>\
                    <td>8</td>\
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

/*
<div class='nH nn' style='width: 532.8px;'>\ //main section
    <div class='nH'>//content section
      <div class='BltHke nK' role='main'>//spacing (minor)
        <div class='nH Cq'><div class='nJ A2'>Awaiting Response</div></div>//Headline
        <div class='awe4 UI UJ' gh='tl'>//wrapping
          <div class='Cp'>//wrapping
            <div>//wrapping
              <table cellpadding='0' id=':jt' class='F cf zt'>
                <colgroup>
                  <col class='k0vOLb'>
                  <col class='ye'>
                  <col class='y5'>
                  <col class='WA'>
                  <col class='y1'>
                  <col class='null'>
                  <col class='yg'>
                  <col class='xX'>
                </colgroup>
                <tbody>
                  <tr class='zA yO' id=':k4'>
                    <td>1</td>
                    <td>2</td>
                    <td>3</td>
                    <td>4</td>
                    <td>5</td>
                    <td>6</td>
                    <td>7</td>
                    <td>8</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
*/