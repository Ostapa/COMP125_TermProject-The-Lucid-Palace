/*
			COMP125: Client-Side Web Development
			Group Project: The Lucid Palace
			Authors: Kevin Ma, Ostap Hamarnyk, Vinood Persad, Joshua MacAulay
			Date: March 28, 2016
			
			Filename: reservaitionConfirm.js
*/
"use strict";
function displayFormData(){
	var queryString = location.search;
	queryString = queryString.substring(1,queryString.length-1);
	queryString = decodeURIComponent(queryString);
	queryString = queryString.replace(/\+/g," ");
	queryString = queryString.replace(/\=/g,": ");
	var formData = queryString.split(/[&:]/);	
	for(var i =0; i<formData.length;i++){
		/*
			NOTE: I printed the labels in all upper case because I did not want to go and 
				  rename all the tags in both the html and js files. some of them are named like
				  card number others like Room Type. So I just decided to have them all as uppercase.
		*/
		switch(formData[i].toLowerCase()){
			case "contact name":
				$("article").append("<h2 class='heading'>Guest Information</h2>");
				$("article").append("<span class='lbl'>"+formData[i].toUpperCase()+"</span>: ");
				$("article").append("<span class='vals'>"+formData[i+1]+" "+formData[i+3]+"</span><br> ");
				i+=3;
				continue;
			case "mobile phone number":
				$("article").append("<span class='lbl'>"+formData[i].toUpperCase()+"</span>: ");
				var phone = formData[i+1];
				phone = "(" + phone.substring(1,4) + ") " +
						phone.substring(4,7) + " - " +
						phone.substring(7,12);
				$("article").append("<span class='vals'>"+phone+"</span><br> ");
				i+=1;
				continue;
			case "email address":
				$("article").append("<span class='lbl'>"+formData[i].toUpperCase()+"</span>: ");
				$("article").append("<span class='vals'>"+formData[i+1]+"</span><br> ");
				i+=3;
				continue;
			case "room type":
				//only decrement room count when reached confirmation
				//people might start reservation and then cancel/change their minds
				var numAvailRooms;
				switch(formData[i+1]){
					case " Interconnecting":
						numAvailRooms = parseInt(localStorage.getItem("Interconnecting"));
						numAvailRooms--;
						localStorage.setItem("Interconnecting",numAvailRooms);
						break;
					case " Duplex":
						numAvailRooms = parseInt(localStorage.getItem("Duplex"));
						numAvailRooms--;
						localStorage.setItem("Duplex",numAvailRooms);
						break;
					case " Lanai":
						numAvailRooms = parseInt(localStorage.getItem("Lanai"));
						numAvailRooms--;
						localStorage.setItem("Lanai",numAvailRooms);
						break;
					case " Suite":
						numAvailRooms = parseInt(localStorage.getItem("Suite"));
						numAvailRooms--;
						localStorage.setItem("Suite",numAvailRooms);
						break;
					case " King":
						numAvailRooms = parseInt(localStorage.getItem("King"));
						numAvailRooms--;
						localStorage.setItem("King",numAvailRooms);
						break;
				}
				$("article").append("<h2 class='heading'>Room Information</h2>");
				$("article").append("<span class='lbl'>"+formData[i].toUpperCase()+"</span>: ");
				break;
			case "date":
				$("article").append("<span class='lbl'>DURATION OF STAY</span>: ");
				$("article").append("<span class='vals'>"+"From " + formData[i+1] + " until " + formData[i+3] + "</span><br/>");
				i+=3;
				break;
			case "card type":
				$("article").append("<h2 class='heading'>Payment Information</h2>");
				$("article").append("<span class='lbl'>"+formData[i].toUpperCase()+"</span>: ");
				break;
			case "card number":
				var cnum = formData[i+1];
				cnum = cnum.substring(0,5) + " " +
					   cnum.substring(5,9) + " " +
					   cnum.substring(9,13) + " " +
					   cnum.substring(13);
				$("article").append("<span class='lbl'>"+formData[i].toUpperCase()+"</span>: ");
				$("article").append("<span class='vals'>"+cnum+"</span><br/>");
				i=formData.length;	//exit for loop because do not need to display exp date
				break;
			//all other name-value pairs from the form that do not need special actions
			default:
				if(i % 2 == 0)
					$("article").append("<span class='lbl'>"+formData[i].toUpperCase()+"</span>: ");
				else
					$("article").append("<span class='vals'>"+formData[i]+"</span><br> ");
				break;
		}
	}
	/*
		CHANGE CSS HERE FOR THE OUTPUT!
			I put classes for all the outputs so you don't need to change the code just css)
	*/
	//Headings// This is just a demonstration. Feel free to change Ostap)
	$(".heading").css("color","white");
	$(".heading").css("background-color","#333");
	$(".heading").css("padding","5px");
	//$(".heading").css("width","100%");
	//Labels
	// This is just a demonstration. Feel free to change Ostap)
	$(".lbl").css("fontWeight","bold");
// This is just a demonstration. Feel free to change Ostap)	// This is just a demonstration. Feel free to change Ostap)
	
	//Values
	$(".vals").css("fontWeight","200");
    $(".vals").css("color","#d34e2e");// This is just a demonstration. Feel free to change Ostap)
    
}
$("body").load(displayFormData());

$(document).ready(function(){
    $("#more").click(function(){
        $("#lucia .details").animate({height:300 + "px"});
        $("#more").hide();
        $("#lucia .details p").css("display","block");
    });
    $("#hideMore").click(function(){
        $("#lucia .details").animate({height:100 + "px"});
        $("#more").show();
        $("#lucia .details p").css("display","none");
    })
    
    $("#bmore").click(function(){
        $("#bahamas .details").animate({height:300 + "px"});
        $("#bmore").hide();
        $("#bahamas .details p").css("display","block");
    });
    $("#bhideMore").click(function(){
        $("#bahamas .details").animate({height:100 + "px"});
        $("#bmore").show();
        $("#bahamas .details p").css("display","none");
    })
    
     $("#jmore").click(function(){
        $("#jamaica .details").animate({height:300 + "px"});
        $("#jmore").hide();
        $("#jamaica .details p").css("display","block");
    });
    $("#jhideMore").click(function(){
        $("#jamaica .details").animate({height:100 + "px"});
        $("#jmore").show();
        $("#jamaica .details p").css("display","none");
    })
    
    $(window).scroll(function(){
        if($(document).scrollTop() > 0){
            $(".subHeader").css("background","#232323");
            $(".list ul").css("background","#232323");
        }
        else {
            $(".subHeader").css("background","rgba(13, 13, 13, 0.7)");
            $(".list ul").css("background", "rgba(13, 13, 13, 0.7)");
        }
    })
}); 