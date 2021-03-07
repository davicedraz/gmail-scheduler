const CALENDAR_NAME = "Your calendar name goes here";
const EVENT_NAME = "The name of the event on your calendar that will trigger the sending of email";
const EMAIL_RECIPIENT = "The recipient of the email goes here";

function init() {
  const today = new Date();
  const agenda = CalendarApp.getCalendarsByName(CALENDAR_NAME)[0];
  const events = agenda.getEventsForDay(today);

  const hadSession = events.find(event => event.getTitle() === EVENT_NAME);

  if (hadSession) {
    console.log("Event identified in your calendar! Sending email...");
    sendEmail();
  } else {
    // Intentionally returns an error, so that you can be notified by GScripts when the email has not been sent
    throw Error("No trigger event found on the calendar today, email not sent.");
  }
}

function formatActualDate(){
    var data = new Date(),
        day  = data.getDate().toString(),
        dayF = (day.length == 1) ? '0'+day : day,
        month  = (data.getMonth()+1).toString(),
        monthF = (month.length == 1) ? '0'+month : month,
        yearF = data.getFullYear();
    return dayF+"/"+monthF+"/"+yearF;
}

/*
* Here you can manipulate all the dynamic information you need in your periodic email, 
* from date, time or even make requests to excel spreadsheets, google documents and more.
*/
function sendEmail() {
  const formated_date = formatActualDate()
  const email_title = `Periodic email title - ${formated_date}`;
  const email_body = `This was a test run on ${formated_date.slice(0, -5)}.`

  MailApp.sendEmail(EMAIL_RECIPIENT, email_title, email_body);
}
