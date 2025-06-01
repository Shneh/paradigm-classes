const display = document.getElementById('calc-display');

function appendCalc(value) {
  display.value += value;
}

function clearCalc() {
  display.value = '';
}

function calculateResult() {
  try {
    display.value = eval(display.value);
  } catch (e) {
    display.value = 'Error';
  }
}
