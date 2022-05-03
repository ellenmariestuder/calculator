
// set up event listener on all buttons in calculator
// 1. define length of button elements
var buttons = document.querySelectorAll('.grid-item').length;

// 2. implement loop to add event listener to all buttons
for (var i = 0; i < buttons; i++) {
  document.querySelectorAll('.grid-item')[i].addEventListener('click', function () {
    console.log('you did it, you bad bitch');
  });
}




