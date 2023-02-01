// Use Moment.js to format the date and assign to the declared variable.
// Declare the time display variables for calendar day
var timeDisplayEl = $("#currentDay");
var timeBlocksEl = $("#calendar");
var timeHour = [
  "9AM",
  "10AM",
  "11AM",
  "12AM",
  "1PM",
  "2PM",
  "3PM",
  "4PM",
  "5PM",
];
// Check the moment in time andle displaying the time
function displayTime() {
  var rightNow = moment().format("dddd, MMMM Do");
  timeDisplayEl.text(rightNow);
}
var compActTime = moment().hour();
var storedText = [];
function readSavedText() {
  for (var i = 0; i < timeHour.length; i++) {
    if (JSON.parse(localStorage.getItem(timeHour[i])) == null) {
      storedText[i] = "";
    } else {
      storedText[i] = JSON.parse(localStorage.getItem(timeHour[i]));
    }
  }
}
readSavedText();
for (var i = 0; i < timeHour.length; i++) {
  var listEl = $("<div>").addClass("row time-block");
  var timeEl = $("<div>")
    .addClass("hour col-lg-2 col-md-2 col-sm-3")
    .text(timeHour[i]);
  var textEl = $("<textarea>")
    .addClass("description col-lg-9 col-md-9 col-sm-7")
    .attr("id", timeHour[i])
    .text(storedText[i]);
    //Compare current time with working hours startinwith 9am
  if (compActTime < [i + 9]) {
    textEl.addClass("future");
  } else if (compActTime > [i + 9]) {
    textEl.addClass("past");
  } else {
    textEl.addClass("present");
  }
  var saveEl = $("<button>")
    .addClass("saveBtn col-lg-1 col-md-1 col-sm-2")
    .attr("data-letter", timeHour[i])
    .text("Save");
  listEl.append(timeEl);
  listEl.append(textEl);
  listEl.append(saveEl);
  timeBlocksEl.append(listEl);
}
$(".saveBtn").on("click", function () {
  var Id = $(this).attr("data-letter");
  var textId = "#" + Id;
  var text = $(textId).val();
  //   console.log(text);
  localStorage.setItem(Id, JSON.stringify(text));
});
setInterval(displayTime, 1000);



// TODO: 6. Parse the following Unix timestamp, 1318781876, and convert into any time/date format.
var unixFormat;
$("#6a").text(unixFormat);

