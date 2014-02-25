//TEMPORARY FILE. DON'T WANT TO DO MERGE FILES LATER ON.
//WILL DELETE FILE IN NEXT COMMIT

//HTML for updating ais through option drop down
//To be added to each ai in aidashboard

<form class="aioptions">
    <select class="aioptions" id="-wlkjfwlekfjl">
        <option value="">Option</option>
        <option value="confirm">Confirm Action Item</option>
        <option value="update">Send Update</option>
        <option value="remind">Send Reminder</option>
        <option value="close">Close Action Item</option>
        <option value="delegate">Delegate to Person</option>
        <option value="extend">Extend Deadline</option>
    </select>
</form>


//JS for updating ais through option drop down
$("select.aioptions").change(function() {
	var aiId = $(this).attr("id");

	//If choice is to confirm AI, refresh status of AI to confirmed
    if($(this).val() == "confirm"){
        //call changeAIStatus
    }
    //If choice is to close the AI, set status of AI in Firebase
    //to closed (it will not appear in the list anymore)
    else if($(this).val() == "close"){
        //call change AIStatus
    }
    //If choice is to send an update to AI sender/"from",
    //prompt user to type in the update and send email to AI sender
    else if($(this).val() == "update"){
        var updateString = prompt("What is the update for Action Item?","10 Word update goes here...");
        if(updateString != ""){
            //call send update
        }
    }
    //If choice is to send a reminder to owner, prompt to ensure
    //user's choice and send automated email
    else if($(this).val() == "remind"){
        if(confirm('Do you want to send reminder?')){
            //call send reminder
        }
    }
    //If choice is to delegate AI, prompt user to get new owner/"to"
    //and then update AI in Firebase
    else if($(this).val() == "delegate"){
        var newOwner = prompt("Who do you want to ask to complete the Action Item?","john.doe@email.com");
        if (newOwner != ""){
            //set task to unconfirmed
            //assign to new person
        }
    }
    //If choice is to extend deadline, update AI in Firebase
    else if($(this).val() == "extend"){
        //set dueDate + 1 week (or working 3 days)
    }
});