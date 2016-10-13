"use strict";
var formValidity=true;
var cardTypeUnchecked = true;
/* Calls functions to check the validity of the form */
function validateForm(evt){
	if(evt.preventDefault){
		evt.preventDefault(); //prevent form from submitting
	}else{
		evt.returnValue=false; //prevent form from submitting in IE8
	}
	
	/*
		Can't put all the expressions together in one conditional statment because if one of the expressions fail
		it short circuits and does not run the rest of the functions
	*/
	if(!thereAreNullEntries())
		formValidity=false;
	if(!isValidInput("fname",/^[A-Z][-'a-zA-Z]{0,14}$/, "First name must begin with uppercase and not be exceed 15 characters."))
		formValidity=false;
	if(!isValidInput("lname",/^[A-Z][-'a-zA-Z]{0,14}$/, "Last name must begin with uppercase and not be exceed 15 characters."))
		formValidity=false;
	if(!isValidInput("phone", /^\d{10}$/, "Phone number must contain only ten digits!"))
		formValidity=false;
	if(!isValidInput("email",/^[a-zA-Z0-9\\-]+(\.[\w\\-]+)*@[a-zA-Z0-9]+(\.[a-zA-Z0-9\\-]+)*(\.[a-z]{2,6})$/, "Email addreses must follow the proper format. vinay.is.the-best.teacher@gmail.com"))
		formValidity=false;
	if(!isValidConfirmEmail())
		formValidity=false;
	if(!isValidInput("cname", /^[a-zA-Z][-'a-zA-Z]*$/, "Cardholder name must start with a letter."))
		formValidity=false;
	if(!isValidCardNum())
		formValidity=false;
	if(!isValidExpiryDate())
		formValidity=false;
	if(!isValidReservationDates())
		formValidity=false;
	
	if(formValidity===true){
		document.getElementsByTagName("form")[0].submit();
	}
}
/*
	Checks to make sure start date is after current date, and that end date is after
	start date
*/
function isValidReservationDates(){
	var currDate = new Date();
	var startDate = new Date($("#startDate").val());
	var endDate = new Date($("#endDate").val());
	if(startDate.getTime() > currDate.getTime()){
		if(endDate.getTime()>startDate.getTime())
			return true;
	}else{
		
		return false;
	}
}
/*
	Function that checks whether the expiry date of the credit/debit
	card is valid.
*/
function isValidExpiryDate(){
	var currDate = new Date();
	var expDate = new Date(document.getElementById("expdate").value);
	var currYear = currDate.getFullYear();
	var expYear = expDate.getFullYear();
	var currMonth = currDate.getUTCMonth();
	var expMonth = expDate.getUTCMonth();
	
	// Special case: When the month is january, year is stored as one less than the actual year for some reason
	if(currMonth === 0)
		currYear++;
	if	(expMonth === 0)
		expYear++;
	
	//exp date must be at least one month after the current month 
	if(currYear < expYear){
		return true;
	}	
	else if(currYear === expYear)
	{
		if(currMonth < expMonth){
			return true;
		}
		else{
			document.getElementById("expdate").style.backgroundColor="#fee9e9";
			printErrorMessage("Your card has already expired! Please enter a new card.","expiration date");	
			return false;
		}
	}else{
		// exp year smaller than curr year
		return false;
	}
}
function isValidCardNum(){
	if(!cardTypeUnchecked){
		var cardTypes = document.getElementsByName("cardtype");
		var cardType;
		for(var i=0;i<3;i++){
			if(cardTypes[i].checked)
				cardType=cardTypes[i].id;
		}
		var regex;
		var errMsg;
		switch(cardType){
			case "mastercard":
				regex = /^5[1-5][0-9]{14}$/;
				errMsg = "Invalid format. Proper mastercard format is 5500 0000 0000 0004";
				break;
			case "amex":
				regex = /^3[47][0-9]{13}$/;
				errMsg = "Invalid format. Proper american express format is 3400 0000 0000 009 or 3700 0000 0000 009";
				break;
			case "visa":
				regex = /^4[0-9]{15}$/;
				errMsg = "Invalid format. Proper visa format is 4111 1111 1111 1111";
				break;
		}
		if(!isValidInput("cardnum", regex, errMsg))
			return false;
		else
			return true;
	}else{
		return false;
	}
}
/*
	Checks if card type is unchecked
*/
function isCardTypeUnchecked(){
	var cardTypes = document.getElementsByName("cardtype");
	for(var i = 0; i < cardTypes.length; i++){
		if(cardTypes[i].checked)
			return false;
	}
	return true;
}
/*
	This function checks that the user entered in the same email in both email and confirm email fields.
*/
function isValidConfirmEmail(){
	var email = document.getElementById("email");
	var confirmEmail = document.getElementById("confirmEmail");
	if(confirmEmail.value!==""){
		if(email.value!==confirmEmail.value){
			confirmEmail.style.backgroundColor="#fee9e9";
			printErrorMessage("Confirm email must be identical to the email!","email address");
			return false;
		}
		else
			return true;
	}
	return false;
}
/* 
	This function is used to validate alot of the fields which require user keyboard input
		Parameters
		-takes the id of the input element
		-the regex pattern used to validate the input as parameters 
		-the error message which is to be displayed
*/
function isValidInput(elementId,regexPattern, errMsg){
	var element = document.getElementById(elementId);
	var elementPattern = regexPattern;
	if(element.value!==""){
		if(!elementPattern.test(element.value)){
			element.style.backgroundColor="#fee9e9";
			printErrorMessage(errMsg, element.name);
			return false;
		}
		else
			return true;
	}
	return false;
}
/* 
	Prints error message in the appropiate error cell 
		-pass in empty string as msg argument to hide the error box
*/
function printErrorMessage(msg, cellName){
	var allErrorCells = document.getElementsByClassName("errorMessage");
	// iterates through all error boxes until finds correct one
	for(var i = 0; i < allErrorCells.length; i++){
		if(allErrorCells[i].id === cellName){
			if(msg!==""){	
				allErrorCells[i].style.display="block";
			} else{
				allErrorCells[i].style.border="";
				allErrorCells[i].style.backgroundColor="";
				allErrorCells[i].style.boxShadow="";
			}	 		
			allErrorCells[i].innerHTML=msg;
			break; // if found the right error box, don't need to go through rest
		}
	}
}
/* Check for nulls for input for required fields */
function thereAreNullEntries(){
	var allInputBoxes = document.getElementsByTagName("input");
	var locationUnchecked = true;
	var contactNull=false;
	var emailNull=false;
	cardTypeUnchecked = true;
	var nullEntries = false;
	
	for(var i =0; i< allInputBoxes.length; i++){
		if(allInputBoxes[i].value === ""){
			if((allInputBoxes[i].id==="fname")||(allInputBoxes[i].id==="lname"))
				contactNull=true;
			else if((allInputBoxes[i].id==="email")||(allInputBoxes[i].id==="confirmEmail"))
				emailNull=true;
			else
				printErrorMessage("Please fill in " + allInputBoxes[i].name + "!", allInputBoxes[i].name);
			allInputBoxes[i].style.backgroundColor="#fee9e9";

			nullEntries=true;
		}else{	// this takes care of radio buttons as well because their value is never === ""
			printErrorMessage("", allInputBoxes[i].name);
			allInputBoxes[i].style.backgroundColor="";
		}
		if(allInputBoxes[i].name==="location" && allInputBoxes[i].checked){
			locationUnchecked = false;
		} 
		if(allInputBoxes[i].name==="cardtype" && allInputBoxes[i].checked){
			cardTypeUnchecked=false;
		}
	}
	if(contactNull){
		printErrorMessage("Please fill in both first and last name!", "contact name");
	}
	if(emailNull){
		printErrorMessage("Please fill in email and confirm it!", "email address");
	}
	if(locationUnchecked){
		nullEntries=true;
		printErrorMessage("Please select the location.","location");
		document.getElementsByName("location")[0].style.outline="1px solid red";
		document.getElementsByName("location")[1].style.outline="1px solid red";
		document.getElementsByName("location")[2].style.outline="1px solid red";
	}
	else{
		document.getElementsByName("location")[0].style.outline="";
		document.getElementsByName("location")[1].style.outline="";
		document.getElementsByName("location")[2].style.outline="";
	}
	if(cardTypeUnchecked){
		nullEntries=true;
		printErrorMessage("Please select a card type!","cardtype");
		document.getElementsByName("cardtype")[0].style.outline="1px solid red";
		document.getElementsByName("cardtype")[1].style.outline="1px solid red";
		document.getElementsByName("cardtype")[2].style.outline="1px solid red";
	}else{
		document.getElementsByName("cardtype")[0].style.outline="";
		document.getElementsByName("cardtype")[1].style.outline="";
		document.getElementsByName("cardtype")[2].style.outline="";
	}
	if(nullEntries)
		return false;
	return true;
}	
/* Creates event listeners when the document finishes loading */
function createEventListeners(){
	var form = document.getElementsByTagName("form")[0];
	
	if(form.addEventListener)
		form.addEventListener("submit",validateForm,false);
	else if(form.attachEvent)
		form.attachEvent("onsubmit",validateForm);
}

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
        if($(document).scrollTop() <= 520){
            $(".subHeader").css("background","rgba(13, 13, 13, 0.7)");
            $(".list ul").css("background", "rgba(13, 13, 13, 0.7)");
        }
        else {
            $(".subHeader").css("background","#232323");
            $(".list ul").css("background","#232323");
        }
    })
}); 