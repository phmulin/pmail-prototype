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
  $('#pmail-aidashboard-list').find('li').remove();
  
  //add AIs in listOfAIs
  var aisOfUser = [];
  $.each(listOfAIs, function(aiId, data){
    //Render Action item if it is either owned by user or sent by user and not closed
    if((data.to == USER_EMAIL || data.from == USER_EMAIL) && data.status != 'closed'){
      var actionitem_html = "<li class='parent-li' id="+aiId+"><span class='parent-li-title'>"+data.title+"</span> <span class='parent-li-status'>"+data.status+"</span></li>";
      $('#pmail-aidashboard-list').append(actionitem_html);
    }
  });

  //make every AI droppable and add sub AI structure)
  $('li.parent-li').each(function() {
    $(this).droppable({
      drop: function (event, ui) {
        $(this).append("\
          <ol id='placeholder' class='child-ol'>\
            <li class='child-li' id='placeholder-li'>Title of Child AI</li>\
          </ol>\
          ");
      }
    });
  });

  //Adding eventHandler on click of AI
  //If clicked, we copy and paste the aiId into the hidden search
  //interface of gmail and trigger click event on search button
  $('.parent-li').click(function () {
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
