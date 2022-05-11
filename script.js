
// set up event listener on all buttons in calculator
// 1. define length of button elements
var buttons = document.querySelectorAll('.grid-item').length;

// 2. implement loop to add event listener to all buttons
for (var i = 0; i < buttons; i++) {
  document.querySelectorAll('.grid-item')[i].addEventListener('click', function () {
    console.log('you did it, you bad bitch');
  });
}

// function to show text value of button clicked in calc window
function copyToTextarea(el) {
  var text = el.textContent;
  var textarea = document.getElementById('window');
  textarea.value = textarea.value + text;
  console.log(text);
}

// function to clear calc window when 'ce' button has been clicked
function clearWindow(el) {
  // var text = el.textContent;
  var textarea = document.getElementById('window');
  textarea.value = null;
  console.log('BYE')
}

// setting up the mathematical operation
// 1. when an operation button is clicked, store the current 
//    value of the textarea in local storage

// 2. store the math operation selected in local storage



// carry out the operation
// 1. when equals button is clicked, store the current value
//    of the text area in local storage

// 2. retrieve data from local storage and perform the operation

