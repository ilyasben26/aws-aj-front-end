$(document).ready(function () {
  // Show loader before making the API call
  $("#loader").show();

  $.getJSON(
    "https://3363l6925c.execute-api.eu-central-1.amazonaws.com/prod/getData",
    function (response) {
      var data = JSON.parse(response.body).content;
      var output = $("<div></div>");

      $.each(data, function (index, item) {
        var locationContainer = $("<div></div>");
        var location = $('<h2 class="location"></h2>').text(item.location);
        var status = $('<span class="status"></span>');

        var statusSymbol = item.status === "available" ? "✅" : "❌";
        status.text(statusSymbol);

        var datetime = $('<span class="datetime"></span>').text(
          " (zuletzt aktualisiert am: " + item.datetime + ")"
        );

        location.append(status).append(datetime);
        locationContainer.append(location);

        var listContainer = $("<ul></ul>");
        $.each(item.days, function (idx, day) {
          listContainer.append($("<li></li>").text(day));
        });

        locationContainer.append(listContainer);
        output.append(locationContainer);
      });

      // Hide the loader after fetching the data
      $("#loader").hide();

      $("#dataDisplay").empty().append(output);
    }
  );
});
