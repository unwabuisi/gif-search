$(document).ready(function() {

    var trendingURL = "http://api.giphy.com/v1/gifs/trending?api_key=dc6zaTOxFJmzC";

    // Adds buttons with trending Gifs
    $.ajax({
        url:trendingURL,
        method:"GET"
    }).done(function(response){
        $.each(response.data, function(i,v) {
            var gif = this;
            var title = gif.title;
            var buttonText = "";

            // This removes the ' GIF by' after the title of each GIF
            if (title.indexOf(" GIF") >=0) {
                buttonText = title.substr(0, title.indexOf(" GIF"));
            }

            //Creates a button for each trending GIF
            var button = $("<button>").text(buttonText);
            button.attr('class','gif-button');
            button.attr('data-title',this.images.original.url);
            $("#trending").append(button);
        });
    });

    $("#gifSearchBtn").on("click", function(event) {
        event.preventDefault();
        var gif = $("#gifSearch").val();
        var button = $("<button>").text(gif);
        button.attr('class','gif-button');
        $('#searched').append(button);
        gifDisplay(gif);
    });

    $(".jumbotron").on("click",".gif-button" , function() {
        if ($(this).attr('data-title')) {
            $("#gifs").html("<img src=" + $(this).attr('data-title') + ">");
        }
        else {
            gifDisplay($(this).text());
        }
    });

    function gifDisplay(gif) {
        var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=dc6zaTOxFJmzC&q=" + gif + "&limit=25";

        $.ajax({
            url:queryURL,
            method:"GET"
        }).done(function(response){
            var gifs = response.data;
            $.each(gifs, function(i,v) {
                var pic = this;
                var display = pic.images.fixed_width_still.url;
                var moving = pict.images.fixed_width.url;
                console.log(pic)

                var img = $("<img>").attr('src',display);
                // ToDo:  add click event to turn on moving gifs
                $("#gifs").append(img);
            });

        });
    }


});
