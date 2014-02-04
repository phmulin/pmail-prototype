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
  return 'loeadPmailUI';
};