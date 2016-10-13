// JavaScript source code
/*
			COMP125: Client-Side Web Development
			Group Project: The Lucid Palace
			Authors: Kevin Ma, Ostap Hamarnyk, Vinood Persad, Joshua MacAulay
			Date: March 28, 2016
			
			Filename: contactUsScript.js.html
*/
var valPhone = false;
var valEmail = false;

var color = "rgb(255,233,233)"
var whiteColor = "rgb(255,255,255)"

var customer = {
    fname: "",
    lName: "",
    email: "",
    phoneNum: "",
    comments: ""
}

function emailCheck() {
    var emailAddress = document.getElementById("email").value;
    var emailField = document.getElementById("email");
    var characters = /^(?=.*?[a-zA-Z0-9]+[@]+[a-zA-Z0-9]+[.]+[a-zA-Z0-9])/.test(emailAddress);
    var mailOut = document.getElementById("mailError");

    if (characters == false) {
        mailOut.innerHTML = "Invalid email address. Please re-enter your email address."
        emailField.style.background = color;
        return valEmail = false;
    }
    else if (characters == true) {
        mailOut.innerHTML = "";
        emailField.style.background = whiteColor;
        return valEmail = true;
    }
}

//checks phone number is 10 digits
function phoneNumCheck() {
    var phoneNumber = document.getElementById("pNumber").value;
    var phoneField = document.getElementById("pNumber");
    var digits = /^(\d\d\d\d\d\d\d\d\d\d)$/.test(phoneNumber);
    var numberOut = document.getElementById("phoneError");

    if (digits == false || phoneNumber === "") {
        numberOut.innerHTML = "Phone number must be 10 digits and contain only numbers."
        phoneField.style.background = color;
        return valPhone = false;
    }
    else if (digits == true) {
        numberOut.innerHTML = "";
        phoneField.style.background = whiteColor;
        return valPhone = true;
    }
}

function clearStorage() {
    localStorage.clear();
    window.close();
}

function showSummary() {
    document.getElementById("fnameResult").innerHTML = "First Name: " + localStorage.fName;
    document.getElementById("lNameResult").innerHTML = "Last Name: " + localStorage.lName;
    document.getElementById("emailResult").innerHTML = "Email: " + localStorage.email;
    document.getElementById("pNumberResult").innerHTML = "Phone Number: " + localStorage.phoneNum;
    document.getElementById("commentResult").innerHTML = "Comments: " + localStorage.comments;
}

function getElements() {

}

function submitForm() {
    var firstName = document.getElementById("fName").value;
    var lastName = document.getElementById("lName").value;
    if (firstName != "" && lastName != "" && valEmail == true && valPhone == true) {
           alert("Thank you for contacting us! We will get in touch with you as soon as possible!");
        /* localStorage.fName = firstName;
            localStorage.lName = lastName;
            localStorage.email = document.getElementById("email").value;
            localStorage.phoneNum = document.getElementById("pNumber").value;
            localStorage.comments = document.getElementById("comments").value;
            window.open("contactUsSummary.html");*/
    }
    else {
        alert("Form was not completed properly. Please fill out all fields")
    }
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
        if($(document).scrollTop() > 520){
            $(".subHeader").css("background","#232323");
            $(".list ul").css("background","#232323");
        }
        else {
            $(".subHeader").css("background","rgba(13, 13, 13, 0.7)");
            $(".list ul").css("background", "rgba(13, 13, 13, 0.7)");
        }
    })
}); 

