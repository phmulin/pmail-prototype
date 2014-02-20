var db = new Firebase('https://brilliant-fire-6191.firebaseio.com/');
userais = db.child('users/' + USERNAME);

//If data changes, re-render list of Action items
userais.on('value', function(snapshot) {
  renderAIs(snapshot.val());
});

//takes a list of AI objects and stores them in Firebase
function safeNewAI(ownerData, titleData){
  var newAI = new AI({to: ownerData, from: USERNAME, title: titleData});
  console.log(newAI);
};


//TESTING DATA:
/*
var new_ai = new AI({title: 'My first AI'});
var new_ai2 = new AI({title: 'My second AI'});
userais.push(new_ai);
userais.push(new_ai2);
*/