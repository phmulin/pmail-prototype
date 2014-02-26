MAIN_REF_PATH = "https://brilliant-fire-6191.firebaseio.com/";
var aidb = new Firebase(MAIN_REF_PATH + "ais");

//creates a new AI object and safes it in Firebase
function safeNewAI(ownerData, titleData){
  var newAI = new AI({to: ownerData, from: USER_EMAIL, title: titleData});
  return {
  	path: aidb.push(newAI).toString(),
  	to: newAI.to,
  	from: newAI.from,
  	title: newAI.title,
  	dueDate: newAI.dueDate,
  	status: newAI.status
  };
};

//Sends out email AI. Takes the location of the AI in Firebase and
//the email type as parameters
function sendAIEmail(ai,mode){
	//Checks type of email to be send out
	if(mode == 'new'){
		//split url to firebase reference and retrieve ai ID
		var aiId = ai.path.split("/")[ai.path.split("/").length-1];
		//send out initial email using the template
		sendEmail(ai.from,ai.to,ai.title,renderTemplate(aiId,ai.from,ai.to,ai.title,ai.dueDate));
	}
	if(mode == 'reminder'){
		//send out reminder email
	}
};

//Tries to retrieve ai by adding a listener at URL.
//Creates AI object and returns it.
function getAIById(aiId){
	var ref = new Firebase(MAIN_REF_PATH + "ais/" + aiId);
	ref.once('value', function(snapshot){
		var ai = new AI(snapshot.val());
		return ai;
	});
}

//Sets state of attribute of AI
function setAIById(aiId, attribute, value){
	var ref = new Firebase(MAIN_REF_PATH + "ais/" + aiId);
	if(attribute == "status"){
		ref.update({status: value});
	}
}

//Renders AIs on dashboard if the callback in pmail.js is triggered
function renderAIs(listOfAIs){
  //remove existing AIs in list
  $('#pmail-aidashboard-list').find('tr').remove();
  
  //add AIs in listOfAIs
  var aisOfUser = [];
  //USER_EMAIL = "philipp.gutheim@gmail.com";
  $.each(listOfAIs, function(aiId, data){
    //Render Action item if it is either owned by user or sent by user and not closed
    if((data.to == USER_EMAIL || data.from == USER_EMAIL) && data.status != 'closed'){
      var actionitem_html = "\
                              <tr class='zA yO'>\
                                  <td>\
                                      <form class='aioptions-form'>\
                                        <select class='aioptions-select' id="+aiId+">\
                                            <option value=''>Change Status...</option>\
                                            <option value='confirm'>Confirm Action Item</option>\
                                            <option value='close'>Close Action Item</option>\
                                        </select>\
                                      </form>\
                                      <div class='aifield' id="+aiId+">\
                                          <div>"+data.title+"</div>\
                                          <div>\
                                              <div class='aidetails spc status'>("+data.status+")</div>\
                                              <div class='aidetails'>"+data.from.replace('@gmail.com', '')+"</div>\
                                              <div class='aidetails'>--></div>\
                                              <div class='aidetails spc'>"+data.to.replace('@gmail.com', '')+"</div>\
                                              <div class='aidetails float-right'><img src='http://static.freepik.com/free-photo/calendar-icon-in-black_318-9776.jpg' width='20' height='20' class='aiddetails'/>"+data.dueDate+"</div>\
                                          </div>\
                                      </div>\
                                  </td>\
                              </tr>\
                            ";
      
      $('#pmail-aidashboard-list').append(actionitem_html);

      //Add 'on change' triggers to the option drop down of each AI in the dashboard
      $("select#"+aiId).change(function() {
        
        var aiId = $(this).attr("id");

        //If choice is to confirm AI, refresh status of AI to confirmed
        if($(this).val() == "confirm"){
          setAIById(aiId, "status", "active");
        }
        //If choice is to close the AI, set status of AI in Firebase
        //to closed (it will not appear in the list anymore)
        else if($(this).val() == "close"){
          setAIById(aiId, "status", "closed");
        }
      });
    }
  });

  //Adding eventHandler on click of AI
  //If clicked, we copy and paste the aiId into the hidden search
  //interface of gmail and trigger click event on search button
  $('.aifield').click(function () {
    var aiId = '"Action Item ID: ' + $(this).attr('id') + '"';
    $('form#gbqf').find('input#gbqfq').val(aiId);
    $('form#gbqf').find('button#gbqfb').trigger("click");
  });
};

function loadActionItems(){
	//If data changes, re-render list of Action items
	aidb.on('value', function(snapshot) {
		renderAIs(snapshot.val());
	});
}
