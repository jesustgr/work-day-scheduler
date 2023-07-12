// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
$(document).ready(function() {
  
  // Function to save the user input in local storage
  function saveEvent(hour, description) {
    localStorage.setItem(hour, description);
  }

  // Function to load the saved events from local storage
  function loadEvents() {
    $(".time-block").each(function () {
      var hour = $(this).attr("id");
      var description = localStorage.getItem(hour);

      $(this).find(".description").val(description);
    });
  }
  
  function applyTimeBlockClasses() {
    var currentHour = dayjs().hour();

    $(".time-block").each(function () {
      var hour = parseInt($(this).attr("id").split("-")[1]);

      if (hour < currentHour) {
        $(this).addClass("past");
      } else if (hour === currentHour) {
        $(this).addClass("present");
      } else {
        $(this).addClass("future");
      }
    });
  }

  // Event listener for the save button click
  $(".saveBtn").on("click", function () {
    var hour = $(this).parent().attr("id");
    var description = $(this).siblings(".description").val();

    saveEvent(hour, description);
  });

  // Display the current date in the header
  $("#currentDay").text(dayjs().format("dddd, MMMM D, YYYY"));

  // Load saved events and apply time block classes on page load
  loadEvents();
  applyTimeBlockClasses();
});
