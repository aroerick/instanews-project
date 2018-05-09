// Built by LucyBot. www.lucybot.com
// var url = "https://api.nytimes.com/svc/topstories/v2/home.json";
// url += "?" + $.param({
//         "api-key": "63ff38af2226431eba347fc1bd5073e1"
// });

//EVERYTHING
        $("#genre-select").on("change", function(){
                $(".stories").empty();

//Header Adjustments
        $(".header").css({
                margin: "auto",
        }),
        $(".logo").css({
                height: "40%",
                width: "40%",
                "max-width": "175px"
        })

// Append loading gif
        $(".stories-grid").append("<img class='loader' src='assets/images/ajax-loader.gif'>");

//Getting dat API right
        let genreSelect = $(this).val();
        // console.log(genreSelect);
        let url = "https://api.nytimes.com/svc/topstories/v2/" + genreSelect + ".json"; 
        url+= "?" + $.param({
                "api-key": "63ff38af2226431eba347fc1bd5073e1"
        });

//      console.log(x);
//      console.log(y);

//Loopin for some data
        $.ajax({
                url: url,
                method: "GET",
        }).done(function(data) {
                let baseData = data.results.filter(function(value){
                        return value.multimedia.length > 0;
                }).slice(0, 12);
                // console.log(baseData);
                
                $.each(baseData, function(key, value) {
                        // console.log(value);
                        const storyUrl = value.url;
                        const storyDesc = value.abstract;
                        const storyImag = value.multimedia[4].url;

                        let html = "";
                        html += "<li class='list-item' style='background-image: url(";
                        html += storyImag + ")'>"
                        html += "<a href='" + storyUrl;
                        html += "' target='_blank'>"
                        html += "<div class='story-desc'>" + storyDesc;
                        html += "</div></a></li>";

                        $(".stories").append(html);
                });

        }).always(function(){
                $(".loader").detach();
        })
                .fail(function(err) {
                throw err;
        });
        });