// Console.log

console.log("Initializing...")
for (let i = 0; i < 5; i++) {
  console.count("Waiting...");
}
console.log("Initialized")
console.log("Fetching data...")
for (let i = 0; i < 5; i++) {
  console.count("Waiting...");
}
console.log("All your data belongs to us")
console.log("Data fetched")
console.log("Updating to the latest website version...")
for (let i = 0; i < 5; i++) {
  console.count("Waiting...");
}
console.log("Updated to version 1.5")
console.log("Fetching files")
console.log("Injecting Html files...")
console.log("Injecting Css files...")
console.log("Injecting JavaScript files...")
console.log("Injecting Image files...")
console.log("Injecting video files...")
console.log("All your files belong to us")
console.log("Injected")
for (let i = 0; i < 5; i++) {
  console.count("Waiting...");
}
console.log("All files have been installed correctly enjoy your stay :)")





//console.error

console.error

Promise.any([ 
  Promise.reject(new Error("Error found")), 
]).catch(e => { 
  console.log(e instanceof AggregateError); // true 
  console.log(e.message);                   // "All Promises rejected" 
  console.log(e.name);                      // "AggregateError" 
  console.log(e.errors);                    // [ Error: "some error" ] 
}); 

try { 
  var num = 10.123.toFixed(-1); 
} catch (e) { 
  console.error(e instanceof RangeError); // true 
  console.error(e.message);               // argument must be between 0-100 
  console.error(e.name);                  // RangeError 
} 



// Tab content 

function openCity(evt, cityName) {
      // Declare all variables
      var i, tabcontent, tablinks;
    
      // Get all elements with class="tabcontent" and hide them
      tabcontent = document.getElementsByClassName("tabcontent");
      for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
      }
    
      // Get all elements with class="tablinks" and remove the class "active"
      tablinks = document.getElementsByClassName("tablinks");
      for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
      }
    
      // Show the current tab, and add an "active" class to the button that opened the tab
      document.getElementById(cityName).style.display = "block";
      evt.currentTarget.className += " active";
    }
    
    /* Toggle between adding and removing the "responsive" class to topnav when the user clicks on the icon */
    function myFunction() {
      var x = document.getElementById("myTopnav");
      if (x.className === "topnav") {
        x.className += " responsive";
      } else {
        x.className = "topnav";
      }
    }
     //clock

    window.addEventListener("load", () => {
      clock();
      function clock() {
        const today = new Date();
    
        // get time components
        const hours = today.getHours();
        const minutes = today.getMinutes();
        const seconds = today.getSeconds();
    
        //add '0' to hour, minute & second when they are less 10
        const hour = hours < 10 ? "0" + hours : hours;
        const minute = minutes < 10 ? "0" + minutes : minutes;
        const second = seconds < 10 ? "0" + seconds : seconds;
    
        //make clock a 12-hour time clock
        const hourTime = hour > 12 ? hour - 12 : hour;
    
        // if (hour === 0) {
        //   hour = 12;
        // }
        //assigning 'am' or 'pm' to indicate time of the day
        const ampm = hour < 12 ? "AM" : "PM";
    
        // get date components
        const month = today.getMonth();
        const year = today.getFullYear();
        const day = today.getDate();
    
        //declaring a list of all months in  a year
        const monthList = [
          "January",
          "February",
          "March",
          "April",
          "May",
          "June",
          "July",
          "August",
          "September",
          "October",
          "November",
          "December"
        ];
    
        //get current date and time
        const date = monthList[month] + " " + day + ", " + year;
        const time = hourTime + ":" + minute + ":" + second + ampm;
    
        //combine current date and time
        const dateTime = date + " - " + time;
    
        //print current date and time to the DOM
        document.getElementById("date-time").innerHTML = dateTime;
        setTimeout(clock, 1000);
      }
    });

    // Loading screen

   
    const preloader = document.querySelector('.preloader');

const fadeEffect = setInterval(() => {
  // if we don't set opacity 1 in CSS, then   //it will be equaled to "", that's why we   // check it
  if (!preloader.style.opacity) {
    preloader.style.opacity = 1;
  }
  if (preloader.style.opacity > 0) {
    preloader.style.opacity -= 0.1;
  } else {
    clearInterval(fadeEffect);
  }
}, 200);

window.addEventListener('load', fadeEffect);


$('.badge').on('click', function() {
  $(this).hide();
  localStorage.seen_badge = "true";
});

function submitted()
{
   var a = document.getElementById("name").value.trim();
   document.getElementById("new").innerHTML=
     a===""?"":"Thank you, " + a + ". " + "Click here to continue.";
}


$(".input_text").focus(function(){
  $(this).prev('.fa').addclass('glowIcon')
})
$(".input_text").focusout(function(){
  $(this).prev('.fa').removeclass('glowIcon')
})

// browser online?


var x = "Is the browser online? " + navigator.onLine;


