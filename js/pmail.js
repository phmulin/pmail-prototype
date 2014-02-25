MAIN_REF_PATH = "https://brilliant-fire-6191.firebaseio.com/";
var aidb = new Firebase(MAIN_REF_PATH + "ais");

//If data changes, re-render list of Action items
aidb.on('value', function(snapshot) {
  renderAIs(snapshot.val());
});

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