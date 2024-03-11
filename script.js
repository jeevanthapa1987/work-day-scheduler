
  $(document).ready(function() {
    // Function to display current day at the top of the calendar
    function displayCurrentDay() {
      var currentDay = moment().format("dddd, MMMM Do YYYY");
      $("#currentDay").text(currentDay);
    }

    // Function to create time blocks for standard business hours
    function createTimeBlocks() {
      var currentHour = moment().hours();

      $(".container").empty();

      for (var hour = 9; hour <= 17; hour++) {
        var timeBlockRow = $("<div>").addClass("row time-block");
        var hourColumn = $("<div>")
          .addClass("col-1 hour")
          .text(moment(hour, "H").format("h A"));
        var textArea = $("<textarea>").addClass("col description");

        // Set background color based on past, present, or future
        if (hour < currentHour) {
          textArea.addClass("past");
        } else if (hour === currentHour) {
          textArea.addClass("present");
        } else {
          textArea.addClass("future");
        }

        // Retrieve saved events from local storage
        var savedEvent = localStorage.getItem("hour-" + hour);
        if (savedEvent !== null) {
          textArea.val(savedEvent);
        }

        var saveButton = $("<button>")
          .addClass("col-1 saveBtn")
          .html("<i class='fas fa-save'></i>");

        // Click event handler for saving events to local storage
        saveButton.on("click", function() {
          var eventText = $(this).siblings(".description").val();
          var eventHour = $(this)
            .siblings(".hour")
            .text()
            .trim();
          localStorage.setItem("hour-" + moment(eventHour, "h A").hour(), eventText);
        });

        timeBlockRow.append(hourColumn, textArea, saveButton);
        $(".container").append(timeBlockRow);
      }
    }

    // Call functions to display current day and create time blocks
    displayCurrentDay();
    createTimeBlocks();
  });

