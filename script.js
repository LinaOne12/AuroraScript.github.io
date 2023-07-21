// script.js
document.addEventListener("DOMContentLoaded", function () {
      const dropdownItems = document.querySelectorAll(".dropdown");
      dropdownItems.forEach(item => {
        item.addEventListener("mouseenter", function () {
          this.querySelector("ul").style.display = "block";
        });
        item.addEventListener("mouseleave", function () {
          this.querySelector("ul").style.display = "none";
        });
      });
    });
    