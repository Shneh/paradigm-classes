const result = document.getElementById('result');

function appendNumber(num) {
  result.value += num;
}

function appendOperator(op) {
  if(result.value === '') return;
  const lastChar = result.value.slice(-1);
  if ('+-*/^.'.includes(lastChar)) {
    result.value = result.value.slice(0, -1);
  }
  result.value += op;
}

function appendFunction(fn) {
  result.value += fn;
}

function clearResult() {
  result.value = '';
}

function backspace() {
  result.value = result.value.slice(0, -1);
}

function calculateResult() {
  if (result.value === '') return;
  try {
    let expression = result.value;

    // Replace ^ with ** for exponentiation
    expression = expression.replace(/(\d+|\))\^(\d+|\()/g, (_, left, right) => left + '**' + right);

    // Replace calculator function names with JavaScript Math functions
    expression = expression
      .replace(/sqrt\(/g, 'Math.sqrt(')
      .replace(/sin\(/g, 'Math.sin(')
      .replace(/cos\(/g, 'Math.cos(')
      .replace(/tan\(/g, 'Math.tan(')
      .replace(/log\(/g, 'Math.log10(')
      .replace(/ln\(/g, 'Math.log(')       // natural log
      .replace(/exp\(/g, 'Math.exp(')     // exponential e^x
      .replace(/sinh\(/g, 'Math.sinh(')
      .replace(/cosh\(/g, 'Math.cosh(')
      .replace(/tanh\(/g, 'Math.tanh(');

    // Evaluate the expression safely
    const evalResult = Function('"use strict";return (' + expression + ')')();

    result.value = Number.isFinite(evalResult) ? evalResult : 'Error';
  } catch (e) {
    result.value = 'Error';
  }
}
