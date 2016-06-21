
	// Initial array of animals
	var animalsArray = [];
	var animalResponse;
	// ========================================================


	// displayanimalInfo function now re-renders the HTML to display the appropriate content. 
	function displayAnimalInfo(){
		var animal= $(this).attr('data-name');   //this refers to button clicked this name is stored in var animal
		var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + animal + "&api_key=dc6zaTOxFJmzC&limit=10"; 
		// http://api.giphy.com/v1/gifs/search?q="monkey&api_key=dc6zaTOxFJmzC&limit=10
		// we have our url complete
		// the button data is passed into var animal is then passed into the query above	
		// Creates AJAX call for the specific animalbeing 
		$.ajax({
			url: queryURL, 
			method: 'GET'
		}).done(function(response) {
			// debugger;
			animalResponse = response;
			var results = response.data; 
			$('#animalsView').empty();

			//makes p and img elements and sticks them on page
			for (var i = 0; i < results.length; i++) {
				var animalDiv = $('<div>'); //creates a div called animalDiv
				var p = $('<p>', {   //review how objects can be a parameter in jQuery!!
                   text: results[i].rating  //get the rating for that particular index of result and insert text in ptag
                });
                  var animalImage = $('<img>', {  //create an image tag for gif ***this is what needs to change to still 
                   src: results[i].images.fixed_width.url,	                   
	                // "data-animate" : results[i].images.fixed_width.url,
	                "data-static" : results[i].images.fixed_width_still.url,
	            	class:'freeze'

	               	   
                  });

                animalDiv.append(p);
                animalDiv.append(animalImage);
                $('#animalsView').prepend(animalDiv);

	                	


	            $(document).on('click', function(){
	            
	            	if(animalImage.src == "results[i].images.fixed_width.url"){
	            		// alert("working");
	            		animalImage.src = 'results[i].images.fixed_width_still.url';
	            	}else{
	            		animalImage.src = "results[i].images.fixed_width.url";
	            	}
	            })

				// $(document).on('click' , function(){

				// 	var state=$(this).data('state');
				//     if(state==='animate'){
				//     	$(this).data('state', 'static');
				//     	var stillURL= $(this).data('static');
				//     	$(this).attr('src', stillURL);
				//     }else{
				//     	$(this).data('state', 'animate');
				//     	var animateURL=$(this).data('animate');
				//     	$(this).attr('src', animateURL);

				//     }
				
				// })	        

			}

		})
			
	};
	
		

		

	// ========================================================
		// declaring function that generates Buttons for #addAnimal button
	function renderButtons(){ 
		// Deletes the animals prior to adding new animals (this is necessary otherwise you will have repeat buttons)
		$('#buttonsView').empty();
		// Loops through the array of animals
		for (var i = 0; i < animalsArray.length; i++){
		
		    var a = $('<button>') 
		    a.addClass('animal'); 
		    a.attr('data-name', animalsArray[i]); // Added a data-attribute
		    a.text(animalsArray[i]); // Provided the initial button text
		    $('#buttonsView').append(a); // Added the button to the HTML
		}
	}
	// ========================================================
	// Makes the new animal buttons at top of page

	$('#addAnimal').on('click', function(){
		// This line of code will grab the input from the textbox
		var animal = $('#animal-input').val().trim();   ///******
		// The animal from the textbox is then added to our array
		animalsArray.push(animal);   //********
		
		// Our function then runs which handles the processing of our animal array
		renderButtons();
		// We have this line so that users can hit "enter" instead of clicking on ht button and it won't move to the next page
		return false;
	})
	// ========================================================
	// Click on img to change state--
	$(document).on('click', '.animal', displayAnimalInfo); 





  //        
	// ========================================================
	// This calls the renderButtons() function
	renderButtons();


