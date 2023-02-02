
// Use Moment.js to format the date and assign to the declared variable
// Declare the time display variables for calendar working day
var dayDisplayEl = $("#currentDay");
var timeBlocksEl = $(".container");
var timeHour = [
  "9AM",
  "10AM",
  "11AM",
  "12PM",
  "1PM",
  "2PM",
  "3PM",
  "4PM",
  "5PM",
];
// Check the actual moment in time and format time display
function displayTime() {
  var rightNow = moment().format("dddd, MMMM Do");
  dayDisplayEl.text(rightNow);
}

//Define variable for the actual time, that will be compared ten  with the hour in each div on calendar day. Declare variable for text input from user which is stored 
var compActTime = moment().hour();
var storedText = [];
function readStoredText() {
  for (var i = 0; i < timeHour.length; i++) {
    if (JSON.parse(localStorage.getItem(timeHour[i])) == null) {
      storedText[i] = "";
    } 
    else {
      storedText[i] = JSON.parse(localStorage.getItem(timeHour[i]));
    }
  }
}
readStoredText();

  for (var i = 0; i < timeHour.length; i++) {
   var list = $("<div>").addClass("row time-block");
   var time = $("<div>")
    .addClass("hour col-lg-2 col-md-2 col-sm-12")
    .text(timeHour[i]);
   var text = $("<textarea>")
    .addClass("description col-lg-9 col-md-9 col-sm-12")
    .attr("id", timeHour[i])
    .text(storedText[i]);
  //Format the hour' divs depending on the moment in time - compare current hour with working hours, starting with 9am  (0 + 9)
  if (compActTime < [i + 9]) {
    text.addClass("future");
  } else if (compActTime > [i + 9]) {
    text.addClass("past");
  } else {
    text.addClass("present");
  }
//Button to save test when user clicks on it
  var save = $("<button>")
    .addClass("saveBtn col-lg-1 col-md-1 col-sm-12")
    .attr("data-letter", timeHour[i])
    .text("save");
  list.append(time);
  list.append(text);
  list.append(save);
  timeBlocksEl.append(list);
  }

$(".saveBtn").on("click", function () {
  var hour = $(this).attr("data-letter");
    var text = $("#"+hour).val();
  localStorage.setItem(hour, JSON.stringify(text));
});
setInterval(displayTime, 1000);