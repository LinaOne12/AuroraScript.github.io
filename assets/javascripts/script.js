


const tabs = document.querySelectorAll('.tab');
tabs.forEach(tab => {
  tab.addEventListener('click', () => {
    // Remove the active class from all tabs
    tabs.forEach(tab => {
      tab.classList.remove('active');
    });
    // Add the active class to the clicked tab
    tab.classList.add('active');
  });
});


// clock

 



  window.addEventListener("load", () => {
    clock();
    function clock() {
      const today = new Date();
  
      // get time components
      const hours = today.getHours();
      const minutes = today.getMinutes();
      const seconds = today.getSeconds();
  
      // add '0' to hour, minute & second when they are less 10
      const hour = hours < 10 ? "0" + hours : hours;
      const minute = minutes < 10 ? "0" + minutes : minutes;
      const second = seconds < 10 ? "0" + seconds : seconds;
  
      // make clock a 12-hour time clock
      const hourTime = hour > 12 ? hour - 12 : hour;
  
      // assign 'am' or 'pm' to indicate time of the day
      const ampm = hour < 12 ? "AM" : "PM";
  
      // get date components
      const month = today.getMonth();
      const year = today.getFullYear();
      const day = today.getDate();
  
      // declaring a list of all months in a year
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
  
      // get current date and time
      const date = monthList[month] + " " + day + ", " + year;
      const time = hourTime + ":" + minute + ":" + second + " " + ampm;
  
      // combine current date and time
      const dateTime = date + " - " + time;
  
      // print current date and time to the DOM
      document.getElementById("date-time").innerHTML = dateTime;
      setTimeout(clock, 1000);
    }
  });
  
  



document.addEventListener("DOMContentLoaded", function(event) {
  // Handle navigation link clicks
  var navLinks = document.querySelectorAll(".nav-link");
  navLinks.forEach(function(link) {
    link.addEventListener("click", function(event) {
      event.preventDefault();
      var target = this.getAttribute("href");

      // Fade out the content
      var content = document.getElementById("content");
      content.classList.remove("fade-in");
      content.classList.add("fade-out");

      // Delay switching to the new content
      setTimeout(function() {
        window.location.href = target;
      }, 500); // Delay should match the animation duration in CSS
    });
  });
});


// Establish a WebSocket connection
const socket = new WebSocket('wss://your-websocket-server-url');

// Handle WebSocket connection open event
socket.addEventListener('open', event => {
  console.log('WebSocket connection established.');
});

// Handle WebSocket message received event
socket.addEventListener('message', event => {
  const data = JSON.parse(event.data);
  // Update the data container with the received data
  document.getElementById('data-container').innerText = data.message;
});

// Handle WebSocket connection close event
socket.addEventListener('close', event => {
  console.log('WebSocket connection closed.');
});

// Handle WebSocket connection error event
socket.addEventListener('error', event => {
  console.error('WebSocket connection error:', event.error);
});


