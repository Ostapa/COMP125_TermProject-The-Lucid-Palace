/*
			COMP125: Client-Side Web Development
			Group Project: The Lucid Palace
			Authors: Kevin Ma, Ostap Hamarnyk, Vinood Persad, Joshua MacAulay
			Date: March 28, 2016
			
        Filename: event.js 
*/
//global objects
var dateObject = new Date();
var readableDate = {
    date: ""
}

var customer = {
    firstName: "",
    lastName: "",
    companyName: "",
    phoneNumber: "",
    eventLength: "",
    dateSelected: "",
    eventLocation: "",
    total: ""
}
var creditInfo = {
    creditType: "",
    creditName: "",
    creditNumber: "",
    expiryDate: ""
}

var phoneNumVal = false;
var companyVal = false;
var creditVal = false;

//gets the event length
function getEventlength() {
    var length;
    length = parseInt(document.getElementById("eventLength").value);

    switch (length) {
        case 150:
            customer.eventLength = "1 Hour";
            break;
        case 450:
            customer.eventLength = "3 Hours";
            break;
        case 750:
            customer.eventLength = "5 Hours";
            break;
        case 1200:
            customer.eventLength = "8 Hours";
            break;
        default:
            customer.eventLength = "Choose event Length";
            break;
    }
    //alert(customer.eventLength);
    return customer.eventLength;
}

//calculates the total cost 
function showCost() {
    var cost;
    cost = document.getElementById("eventLength").value;
    customer.total = (cost * 1.13).toFixed(2);
    var showCost = document.getElementById("showCost").innerHTML = "Total Cost: $" + customer.total;
    //alert(customer.total);
    return customer.total;
}

//displays the calender in the table 
function calender(selectMonth) {
    var date;
    var dateToday = new Date();
    var dayOfWeek;
    var daysInMonth;
    var dateCells;
    var captionValue;
    var month;
    var year;
    var months = ["January", "February", "March", "April", "May",
        "June", "July", "August", "September", "October", "November",
        "December"];
    //allows you to scroll months
    if (selectMonth === -1) {
        dateObject.setMonth(dateObject.getMonth() - 1);
    } else if (selectMonth === 1) {
        dateObject.setMonth(dateObject.getMonth() + 1);
    }
    month = dateObject.getMonth();
    year = dateObject.getFullYear();
    dateObject.setDate(1);
    dayOfWeek = dateObject.getDay();
    captionValue = months[month] + " " + year;
    document.getElementById("tableCaption").innerHTML = captionValue;

        if (month === 0 || month === 2 || month === 4 ||
        month === 6 || month === 7 || month === 9 ||
        month === 11 )
        { // Jan, Mar, May, Jul, Aug, Oct, Dec
            daysInMonth = 31;
        } else if (month === 1) {
            //feb
            daysInMonth = 28
        } else {
            //Apr, Jun, Sep, Nov
            daysInMonth = 30;
        }

    dateCells = document.getElementsByTagName("td");
    for (var i = 0; i < dateCells.length; i++) {
        // clear existing table dates
        dateCells[i].innerHTML = "";
        dateCells[i].className = "";
    }
    for (var i = dayOfWeek; i < daysInMonth + dayOfWeek; i++) {
        // add dates to days cells
        dateCells[i].innerHTML = dateObject.getDate();
        dateCells[i].className = "date";
        if (dateToday < dateObject) {
            dateCells[i].className = "aheadDates"; //uses css to change the future available dates from grey to white 
        }
        date = dateObject.getDate() + 1;
        dateObject.setDate(date);
    }
    dateObject.setMonth(dateObject.getMonth() - 1);
    // reset month to month shown
    document.getElementById("calender").style.display = "block";
    // display calendar if itís not already visible

}

//scrolls through calender months 
function prevMonth() {
    calender(-1)
}
function nextMonth() {
    calender(+1)
}

//chooses the date in the calender
function dateChosen(event) {
    if (event === undefined) {
        event = window.event;
    }
    var callerElement = event.target || event.srcElement;
    if (callerElement.innerHTML === "") {

        document.getElementById("calender").style.display = "block";
        return false;
    }
    dateObject.setDate(callerElement.innerHTML);

    var fullDate = new Date();
    var dateToday = Date.UTC(fullDate.getFullYear(), fullDate.getMonth, fullDate.getDate);
    var chosenDate = Date.UTC(dateObject.getFullYear(), dateObject.getMonth(), dateObject.getDate());

    if (chosenDate <= dateToday) {
        document.getElementById("calender").style.display = "block";
        
        return false;
    }
    //converts the chosen date into readable form and displays it to dateSelected
    readableDate.date = dateObject.toLocaleDateString();
    
    //if (readableDate.date < dateToday == true) {
    //    document.getElementById("calenderError").innerHTML = "please choose a current or future date"
    //}
    document.getElementById("dateSelected").innerHTML = "Selected Date: " + readableDate.date;

    customer.dateSelected = readableDate.date;
    return customer.dateSelected;
}


//******************
//
//FORM VALIDATION
//
//******************
//global variables
var redColor = "rgb(255,233,233)";
var whiteColor = "rgb(255,255,255)";

//customer info error spot 
var errorCustomerOut = document.getElementById("eOutput");
var creditErrorOut = document.getElementById("creditError");

//credit selected
function creditSelected() {
    var radioButton = document.getElementsByName("creditType");

    if (!radioButton[0].checked && !radioButton[1].checked && !radioButton[2].checked) {
        creditErrorOut.innerHTML = "Please select a credit Type";
    }
}
//checks creditcard number 
function cardNumberCheck() {
    var cardNumber = document.getElementById("creditNumber").value;
    var cardNumberField = document.getElementById("creditNumber");
    var visaPattern = /^(\d\d\d\d\d\d\d\d\d\d\d\d\d\d\d\d)$/.test(cardNumber);
    var amexPattern = /^(\d\d\d\d\d\d\d\d\d\d\d\d\d\d\d)$/.test(cardNumber);
    var creditType = document.querySelector('input[name = "creditType"]:checked').value

    if (creditType == "Visa" || creditType == "Mastercard" ){
        if (visaPattern == false) {
            creditErrorOut.innerHTML = "Visa/Mastercard number has to be 16 digits long. Please re-enter number";
            cardNumberField.style.background = redColor;
            return creditVal = false;
        }
        else if (visaPattern == true) {
            cardNumberField.style.background = whiteColor;
            creditErrorOut.innerHTML = "";
            return creditVal = true;
        }
    }
    else if (creditType == "Amex") {
        if (amexPattern == false) {
            creditErrorOut.innerHTML = "American Express number has to be 15 digits long. Please re-enter number";
            cardNumberField.style.background = redColor;
            return creditVal = false;
        }
        else if (amexPattern == true) {
            creditErrorOut.innerHTML = "";
            cardNumberField.style.background = whiteColor;
            return creditVal = true;
        }
    }

}
function companyCheck() {
    var companyName = document.getElementById("companyName").value;
    var companyField = document.getElementById("companyName");
    var companyPattern = /^[A-Z]/.test(companyName);

    if (companyPattern == false) {
        errorCustomerOut.innerHTML = "The first letter of the company name must be capitalized"
        companyField.style.background = redColor;
        return companyVal = false;
    }
    else if (companyPattern == true) {
        errorCustomerOut.innerHTML = "";
        companyField.style.background = whiteColor;
        return companyVal = true;
    }
}
//checks phone number is 10 digits
function phoneNumCheck() {
    var phoneNumber = document.getElementById("phoneNumber").value;
    var phoneField = document.getElementById("phoneNumber");
    var digits = /^(\d\d\d\d\d\d\d\d\d\d)$/.test(phoneNumber);


    if (digits == false) {
        errorCustomerOut.innerHTML = "Phone number must be 10 digits and contain only numbers."
        phoneField.style.background = redColor;
        return false;

    }
    else if (digits == true) {
        errorCustomerOut.innerHTML = "";
        phoneField.style.background = whiteColor;
        return phoneNumVal = true;
    }
}


function submitFunction() {
    openResult();
    creditResult();
    
    if (customer.firstName != "" && customer.lastName != "" && customer.companyName != "" && customer.phoneNumber != "" && customer.eventLength != "" && customer.eventLocation != ""
        && creditInfo.creditName != "" && creditInfo.creditNumber != "" && creditInfo.expiryDate != "" ) {
        
        if (companyVal == true && phoneNumVal == true && creditVal == true) {
            window.open("eventOutput.html");
        }
        else {
            alert("Form was not completed properly. Please fill out all fields");
        }
    }
}
//*********************
//storage
//*********************
function openResult() {
    customer.firstName = document.getElementById("fName").value;
    customer.lastName = document.getElementById("lName").value;
    customer.companyName = document.getElementById("companyName").value;
    customer.phoneNumber = document.getElementById("phoneNumber").value;
    customer.eventLocation = document.getElementById("location").value;

    
    localStorage.firstName = customer.firstName;
    localStorage.lastName = customer.lastName;
    localStorage.companyName = customer.companyName;
    localStorage.phoneNumber = customer.phoneNumber;
    localStorage.eventlength = customer.eventLength;
    localStorage.date = customer.dateSelected;
    localStorage.eventLocation = customer.eventLocation;
    localStorage.cost = customer.total;
}

function creditResult() {
    creditInfo.creditType = document.querySelector('input[name = "creditType"]:checked').value;
    creditInfo.creditName = document.getElementById("creditName").value;
    creditInfo.creditNumber = document.getElementById("creditNumber").value;
    creditInfo.expiryDate = document.getElementById("expiryDate").value;

    localStorage.creditType = creditInfo.creditType;
    localStorage.creditName = creditInfo.creditName;
    localStorage.creditNumber = creditInfo.creditNumber;
    localStorage.expiryDate = creditInfo.expiryDate;
}

function showResult() {
    document.getElementById("fnameResult").innerHTML = "First Name: " + localStorage.firstName;
    document.getElementById("lNameResult").innerHTML = "Last Name: " + localStorage.lastName;
    document.getElementById("companyNameResult").innerHTML = "Company Name: " + localStorage.companyName;
    document.getElementById("pNumberResult").innerHTML = "Phone Number: " + localStorage.phoneNumber;
    document.getElementById("eventLengthResult").innerHTML = "Event Length: " + localStorage.eventlength;
    document.getElementById("dateResult").innerHTML = "Date: " + localStorage.date;
    document.getElementById("eventLocation").innerHTML = "Event Location: " + localStorage.eventLocation;
    document.getElementById("costResult").innerHTML = "Total Cost: $" + localStorage.cost;

    document.getElementById("creditType").innerHTML = "Credit Type: " + localStorage.creditType;
    document.getElementById("creditName").innerHTML = "Credit Name: " + localStorage.creditName;
    document.getElementById("creditNumber").innerHTML = "Credit Number: " + localStorage.creditNumber;
    document.getElementById("expiryDate").innerHTML = "Expiration Date: " + localStorage.expiryDate;
}

function clearStorage() {
    localStorage.clear();
    window.close();
}
function eventListeners() {

    //Form Validation event listeners
    //********************************************
    //company check
    var company = document.getElementById("companyName");
    if (company.addEventListener) {
        company.addEventListener("change", companyCheck, false);
    } else if (company.attachEvent) {
        company.attachEvent("onchange", companyCheck);
    }

    //phone check 
    var phone = document.getElementById("phoneNumber")
    if (phone.addEventListener) {
        phone.addEventListener("change", phoneNumCheck, false);
    } else if (phone.attachEvent) {
        phone.attachEvent("onchange", phoneNumCheck);
    }

    //credit number check
    var creditNum = document.getElementById("creditNumber");
    if (creditNum.addEventListener) {
        creditNum.addEventListener("change", cardNumberCheck, false)
    } else if (creditNum.attachEvent) {
        creditNum.attachEvent("onchange", cardNumberCheck);
    }

    //*********************************************


    //date chosen event listner 
    var cells = document.getElementsByTagName("td");
    if (cells[0].addEventListener) {
        for (var i = 0; i < cells.length; i++) {
            cells[i].addEventListener("click", dateChosen, false);
        }
    } else if (cells[0].attachEvent) {
        for (var i = 0; i < cells.length; i++) {
            cells[i].attachEvent("onclick", dateChosen);
        }

    }
    //scrolls though the months 
    var previousMonth = document.getElementById("prev");
    if (previousMonth.addEventListener) {
        previousMonth.addEventListener("click", prevMonth, false);
    } else if (previousMonth.attachEvent) {
        previousMonth.attachEvent("onclick", prevMonth);
    }
    var next = document.getElementById("next");
    if (next.addEventListener) {
        next.addEventListener("click", nextMonth, false);
    } else if (next.attachEvent) {
        next.attachEvent("onclick", nextMonth)
    }
    //displays total cost event listner 
    var displayCost = document.getElementById("eventLength");
    if (displayCost.addEventListener) {
        displayCost.addEventListener("change", showCost, false);
    } else if (displayCost.attachEvent) {
        displayCost.attachEvent("onchange", showCost);
    }
    //gets the event length listner 
    var eventLength = document.getElementById("eventLength");
    if (eventLength.addEventListener) {
        eventLength.addEventListener("change", getEventlength, false);
    } else if (eventLength.attachEvent) {
        eventLength.attachEvent("onchange", getEventlength);
    }

    //submit button listener
    var submitBtn = document.getElementById("submitBtn");
    if (submitBtn.addEventListener) {
        submitBtn.addEventListener("click", submitFunction, false);
    } else if (submitBtn.attachEvent) {
        submitBtn.attachEvent("onclick", submitFunction);
    }
}


//loads the display calender 
if (window.addEventListener) {
    window.addEventListener("load", calender, false);
} else if (window.attachEvent) {
    window.attachEvent("onload", calender);
}
//loads the event listners
if (window.addEventListener) {
    window.addEventListener("load", eventListeners, false);
} else if (window.attachEvent) {
    window.attachEvent("onload", eventListeners);
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