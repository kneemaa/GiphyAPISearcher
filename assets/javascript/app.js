$(document).ready(function() {
	var apiKey = "43cZOe5ueBsGNNrthi7923PxU7YP0vc9";
	var list = ["wtf", "dumpster fire", "shaking my head", "seriously?","hell yes","hell no","confused","dancing","omg","celebrate","high five","stop","lol","crying",
	"scared"];

	function makeButtons(){
		for (i in list) {
			$(".options").append("<button type='button' class='searchTerms' id='"+list[i]+"'>"+list[i]+"</button>");
		};

	};

	function searchForGiphs(term) {
		term = term.split(" ").join("%20");
		console.log($("input[type=checkbox]").attr("checked"));

		var searchURL = "https://api.giphy.com/v1/gifs/search?api_key=" + apiKey + "&q=" + term + "&limit=10&offset=0&rating=PG&lang=en";

		$.ajax({
			url: searchURL,
			method: "GET"
		}).done(function(response) {
			for(i = 0; i < 10; i++) {
				var rating = response.data[i].rating;
				var urlThumb = response.data[i].images.original.url;
				var urlStill = response.data[i].images.original_still.url;

				var beginDiv = $("<div class='gifBlock'>");
				var img = "<img class='gif' data-moving='" + urlThumb + "' src='" + urlStill + "'>";
				var rate = "<p>Rating: " + rating.toUpperCase() + "</p>";
				beginDiv.append(rate,img);
				$(".giphs").append(beginDiv);
			}
		});
		
		
	};

	$(".giphs").on("click", ".gif", function() {
		var temp = $(this).attr("data-moving");
		var current = $(this).attr("src");
		$(this).attr("src", temp);
		$(this).attr("data-moving", current);
	})

	$("#add").on("click", function(event) {
		event.preventDefault();

		var input = $("#input").val().trim();
		if (input !== ""){
			list.push(input);
			$(".options").empty();
			makeButtons();
		}
	});

	$(".options").on("click",".searchTerms", function() {
		$(".giphs").empty();
		var searchWord = $(this).attr("id");
		searchForGiphs(searchWord);
	});

	makeButtons();

});

