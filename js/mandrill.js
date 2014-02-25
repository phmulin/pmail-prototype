//sendEmail('philipp.gutheim@gmail.com','philipp.gutheim@gmail.com','lala','super duper');

function sendEmail(from, to, subject, msg){
    var data = {
        "key": "T5TTpbVThGRJHknOiSP5kQ",
        "message": {
            "html": msg,
            "subject": subject,
            "from_email": USER_EMAIL,
            "to": [
                {
                    "email": to,
                    "type": "to"
                }
            ]
        }
    }

    var response = $.ajax({
        type: 'POST',
        url: 'https://mandrillapp.com/api/1.0/messages/send.json',
        contentType: 'application/json; charset=utf-8',
        data: JSON.stringify(data)
    });
};

//Defines AI email template and inserts information. Returns email as html string.
function renderTemplate(aiId, from, to, title, completionDate){
    if(completionDate === undefined){
        //If deadline undefined, set it to be due in 7 days
        var today = new Date();
        var completionDate = getDeadlineString(new Date(today.setDate(today.getDate() + 7)));
    } else {
        var completionDate = getDeadlineString(completionDate);
    }
    return '<div id=":4kf" class="ii gt m14450ad7950c4cd7 adP adO"><div id=":5be" style="overflow: hidden;"><div><table cellspacing="0" cellpadding="8" border="0" summary="" style="width:100%;font-family:Arial,Sans-serif;border-width:1px 2px 2px 1px;border:1px Solid #ccc"><tbody><tr><td><div style="padding:2px"><span></span><h3 style="padding:0 0 6px 0;margin:0;font-family:Arial,Sans-serif;font-size:16px;font-weight:bold;color:#222"><span>New Action Item: '+title+'</span></h3><table cellpadding="0" cellspacing="0" border="0" summary="Event details"><tbody><tr><td style="padding:0 1em 10px 0;font-family:Arial,Sans-serif;font-size:13px;color:#888;white-space:nowrap" valign="top"><div><i style="font-style:normal">From</i></div></td><td style="padding-bottom:10px;font-family:Arial,Sans-serif;font-size:13px;color:#222" valign="top"><u></u><u></u><u></u><u></u>'+from+'</td></tr><tr><td style="padding:0 1em 10px 0;font-family:Arial,Sans-serif;font-size:13px;color:#888;white-space:nowrap" valign="top"><div><i style="font-style:normal">To</i></div></td><td style="padding-bottom:10px;font-family:Arial,Sans-serif;font-size:13px;color:#222" valign="top"><span><span>You ('+to+')</span></span></td></tr><tr><td style="padding:0 1em 10px 0;font-family:Arial,Sans-serif;font-size:13px;color:#888;white-space:nowrap" valign="top"><div><i style="font-style:normal">Target Date:</i></div></td><td style="padding-bottom:10px;font-family:Arial,Sans-serif;font-size:13px;color:#222" valign="top"><span>'+completionDate+'</span></td></tr></tbody></table></div><p style="color:#222;font-size:13px;margin:0"><span style="color:#888">Accept?&nbsp;&nbsp;&nbsp;</span><u></u><strong><span><span><a href="" style="color:#20c;white-space:nowrap" target="_blank">Yes</a></span></span><span style="margin:0 0.4em;font-weight:normal"> - </span><span><span><a href="" style="color:#20c;white-space:nowrap" target="_blank">Maybe</a></span></span><span style="margin:0 0.4em;font-weight:normal"> - </span><span><span><a href="" style="color:#20c;white-space:nowrap" target="_blank">No</a></span></span></strong>&nbsp;&nbsp;&nbsp;&nbsp;<u></u></p></td></tr><tr><td style="background-color:#f6f6f6;color:#888;border-top:1px Solid #ccc;font-family:Arial,Sans-serif;font-size:11px">Action Item ID: '+aiId+'</td></tr></tbody></table></div></div><div class="yj6qo"></div></div>';
};

//Converts javascript date object into nicely formatted date string
function getDeadlineString(date){
    var deadline = new Date (date);

    var month_names = new Array ( );
    month_names[month_names.length] = "January";
    month_names[month_names.length] = "February";
    month_names[month_names.length] = "March";
    month_names[month_names.length] = "April";
    month_names[month_names.length] = "May";
    month_names[month_names.length] = "June";
    month_names[month_names.length] = "July";
    month_names[month_names.length] = "August";
    month_names[month_names.length] = "September";
    month_names[month_names.length] = "October";
    month_names[month_names.length] = "November";
    month_names[month_names.length] = "December";

    var day_names = new Array ( );
    day_names[day_names.length] = "Sunday";
    day_names[day_names.length] = "Monday";
    day_names[day_names.length] = "Tuesday";
    day_names[day_names.length] = "Wednesday";
    day_names[day_names.length] = "Thursday";
    day_names[day_names.length] = "Friday";
    day_names[day_names.length] = "Saturday";

    return day_names[deadline.getDay()] + ", " + month_names[deadline.getMonth()] + " " + deadline.getDate() + " " + deadline.getFullYear();
};