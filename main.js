// Console.log

console.logCopy = console.log.bind(console);

console.log = function()
{
    // Timestamp to prepend
    var timestamp = new Date().toJSON();

    if (arguments.length)
    {
        // True array copy so we can call .splice()
        var args = Array.prototype.slice.call(arguments, 0);

        // If there is a format string then... it must
        // be a string
        if (typeof arguments[0] === "string")
        {
            // Prepend timestamp to the (possibly format) string
            args[0] = "%o: " + arguments[0];

            // Insert the timestamp where it has to be
            args.splice(1, 0, timestamp);

            // Log the whole array
            this.logCopy.apply(this, args);
        }
        else
        { 
            // "Normal" log
            this.logCopy(timestamp, args);
        }
    }
};

console.log("Website Data Loaded")
console.log("Rampage on top")






//console.error




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



// Scroll To Top

function scrollToTop() {

  window.scrollTo({top: 0, behavior: 'smooth'});
  
  }

  // Refresh 

  function refreshPage(){
    window.location.reload();
} 
  

// location 

const button = document.querySelector("button");

button.addEventListener("click", () => {
  navigator.geolocation.getCurrentPosition(position => {

    const { latitude, longitude } = position.coords;

    const url = "https://nominatim.openstreetmpa.org/reverse?format=json&lat=${latitude}&lon=${longitude}";
    fetch(url).then(res => res.json()).then(data => {
      console.table(data.address);
    }).catch(() => {
      console.log("error fetching data from API");
    })
    })
  })


  //location method 2

  const findMyState = () => {
    const status = document.querySelector('.status');

    const success = (position) => {
      
    }
    console.log(position)

    const error = () => {
      status.textContent = 'An error has. Unable to retrieve your exact location';
    }

    navigator.geolocation.getCurrentPosition(success, error);



    document.querySelector('.find-state').addEventListener('click', findMyState);
  }

  

  
