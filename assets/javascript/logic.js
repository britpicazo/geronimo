// These are the starting variables
var eventful = "NpDT6Lg3gwd859Cr.";
var latChoice = 0;
var lngChoice = 0;
var eventLat = 0;
var eventLng = 0;
var foodLL = {lat: latChoice, lng: lngChoice};
var eventLL = {lat: latChoice, lng: lngChoice};
var centerLat = (latChoice + eventLat)/2;
var centerLng = (lngChoice + eventLng)/2;
var centerLL = {lat: centerLat, lng: centerLng};

$('#radius').on('keydown keyup', function(e){
   if ($(this).val() > 15
       && e.keyCode != 46 // delete
       && e.keyCode != 8 // backspace
      ) {
      e.preventDefault();
      $(this).val(15);
   }
});


// These are the button events that move the page
$("#button1").on('click', function(){
	event.preventDefault();
	$("#page1").css('display', 'none');
	$("#page2").css('display', 'block');
	$('#goBack').css('display', 'block');
	$('#brand').css('margin-left', '0%');
	$("#button1").css('display', 'none');
	$("#button2").css('display', 'block');
});

$("#button2").on("click", function(){
	event.preventDefault();
	$("#page2").css('display', 'none');
	$("#page3").css('display', 'block');
	$('#goBack').css('display', 'block');
	// $('#brand').css('margin-left', '0%');
	$("#button2").css('display', 'none');

		var zip = $("#zip").val();
		var cuisine = $("#cuisine").val();
		var radius = parseInt(($("#radius").val())*1609.344);

		var queryURL = "https://still-oasis-47024.herokuapp.com/api/" 
						+ zip + "/"  + cuisine + "/" + radius;
    		$.ajax({
      			url: queryURL,
      			method: "GET"
    		}).done(function(response) {
      			console.log(response);
    			console.log(zip);
    			console.log(cuisine);
    			console.log(radius);
    			console.log(response.businesses);

    			var results = response.businesses;
        			for (var i = 0; i < 5; i++) {

       				// These variables hold the query results
       				var bizPic = results[i].image_url;
            		var name = results[i].name;
       				var distance = Math.round((results[i].distance*0.0006214)*100)/100;
       				var rating = results[i].rating;
       				var reviewCount = results[i].review_count;
       				var foodCost = results[i].price;
       				var neighborhood = results[i].location.address1 + ' ' + results[i].location.address2 + ', ' + results[i].location.city;
       				var foodType = results[i].categories[0].title;
       				var foodLat = results[i].coordinates.latitude;
       				var foodLng = results[i].coordinates.longitude;
       				var phone = results[i].display_phone;
 

       				// These variables hold the different dividers
            		var eatMe = $("<div class='row'>");
       				var foodButton = $("<button id='restaurant' class='col-md-12'>")
       				var restImage = $('<img id="rest-image">')
       					restImage.attr('src', bizPic);
       				var restClose = $('</img>');
       				var bizName = $('<p id="name">' + name + '<p/>');
       				var distDiv = $('<p id="distance">' + distance + ' miles' + '</p>');
       				var starPower = $('<img id="star-rating">')
       				var reviews = $('<p id="review-count">' + reviewCount + '</p>');
       				var cost = $('<p id="cost">' + foodCost + '</p>');
       				var foodLocation = $('<p id="address">' + neighborhood + '</p>');
       				var foodCat = $('<p id="category">' + foodType + '</p>');
       				var buttonClose = $('</button>')
       				var latFood = $("<p id='latt' style='display:none;'>" + foodLat + "</p>");
       				var lngFood = $("<p id='long' style='display:none;'>" + foodLng + "</p>");
       				var disPhone = $("<p id='phone' style='display:none;'>" + phone + "</p>");
       				var eatClose = $('</div>');

       				// This puts everything together and displays it on page 3
       					foodButton.append(restImage);
       					foodButton.append(restClose);
       					foodButton.append(bizName);
       					foodButton.append(distDiv);
       					foodButton.append(starPower);
       					foodButton.append(reviews);
       					foodButton.append(cost);
       					foodButton.append(foodLocation);
       					foodButton.append(foodCat);
       					foodButton.append(latFood);
       					foodButton.append(lngFood);
       					foodButton.append(disPhone);
       					foodButton.append(buttonClose);
       					eatMe.append(foodButton);
       					eatMe.append(eatClose);
            			$("#page3").append(eatMe);
                    // console.log(response.Runtime);
    }});
});

// Note that this function is for any of the #restaurant ids on page 3, there is no button on this page
$(document).on('click', '#restaurant', function(){
    event.preventDefault();
    latChoice = $('#latt').text();
    lngChoice = $('#long').text();
    var thisName = $('#name').text();
    var thisPhone = $('#phone').text();
    var foodLL = {lat: latChoice, lng: lngChoice};
    console.log(latChoice);
    console.log(lngChoice);
    console.log(thisName);
    console.log(thisPhone);

    $("#page3").css('display', 'none');
    $("#page4").css('display', 'block');
    $("#button3").css('display', 'block');
});

$("#button3").on('click', function(){
	event.preventDefault();
	$("#page4").css('display', 'none');
	$("#page5").css('display', 'block');
	$("#button3").css('display', 'none');
});

$("#events").on('click', function(){
	event.preventDefault();
	$("#page5").css('display', 'none');
	$("#page6").append();
	$("#page6").css('display', 'block');
	$("#button5").css('display', 'block');
});

$("#button5").on('click', function(){
	event.preventDefault();
	initMap();
	$("#page6").css('display', 'none');
	$("#page1").css('display', 'block');
	$('#goBack').css('display', 'none');
	$('#brand').css('margin-left', '22%');
	$("#button5").css('display', 'none');
	$("#button1").css('display', 'block');
});


// This handles the goBack function

// $('#goBack').on('click', function(){
// 	$("#page1").css('display', 'block');
// 	$("#page2").css('display', 'none');
// 	$('#goBack').css('display', 'none');
// 	$('#brand').css('margin-left', '22%');
// 	$("#button1").css('display', 'block');
// 	$("#button2").css('display', 'none');
// });


// This clears the textbox on page 3
$('.newgif').on('click', function(){
	$('.newgif').val('');
})

// This is the datepicker function
$(function() {
    $("#datepicker").datepicker({ minDate: 0 });
    $('#datepicker').on('click', function() {
    $('#ui-datepicker-div').css('background-color', 'white');
	});
});

function initMap(){
	var map = new google.maps.Map(document.getElementById('map'), {
	zoom: 4,
	center: 
	});
	var marker1 = new google.maps.Marker({
		position: foodLL,
		map: map
	});

	var marker2 = new google.maps.Marker({
		position: eventLL,
		map: map
	})
}

// This allows the dropdown selection to be added to the input field
$(document).on('click', '.dropdown-menu li a', function() {
    $('#event-type').val($(this).html());
});