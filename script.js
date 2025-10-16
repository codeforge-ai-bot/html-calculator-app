(() => {
  const display = document.getElementById('display');
  let current = '0';
  let prev = null;
  let operator = null;
  let justEvaluated = false;

  const updateDisplay = (val) => {
    display.textContent = val;
  };

  const performCompute = () => {
    if (prev === null || operator === null) return current;
    const a = parseFloat(prev);
    const b = parseFloat(current);
    let result = 0;
    switch (operator) {
      case '+': result = a + b; break;
      case '-': result = a - b; break;
      case '*':
      case '×': result = a * b; break;
      case '/':
      case '÷':
        result = b === 0 ? NaN : a / b; break;
      default: return current;
    }
    return String(result);
  };

  const commitValue = (value) => {
    current = value;
    updateDisplay(current);
  };

  const onNumber = (n) => {
    if (justEvaluated) {
      current = '0'; justEvaluated = false;
    }
    if (current === '0' && n !== '.') {
      current = n;
    } else {
      current += n;
    }
    updateDisplay(current);
  };

  const onOperator = (op) => {
    if (prev !== null && operator !== null && !justEvaluated) {
      const result = performCompute();
      prev = result;
      commitValue(result);
    } else {
      prev = current;
    }
    operator = op;
    justEvaluated = false;
    current = '0';
  };

  const equals = () => {
    if (prev === null || operator === null) return;
    const result = performCompute();
    commitValue(result);
    prev = null;
    operator = null;
    justEvaluated = true;
  };

  document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const value = btn.getAttribute('data-value');
      const action = btn.getAttribute('data-action');
      if (value !== null) {
        onNumber(value);
        return;
      }
      if (action) {
        switch(action){
          case 'clear':
            current = '0'; prev = null; operator = null; justEvaluated = false; updateDisplay(current); break;
          case 'negate':
            if (current.startsWith('-')) current = current.substring(1); else if (current !== '0') current = '-' + current; updateDisplay(current); break;
          case 'percent':
            current = String(parseFloat(current) / 100);
            updateDisplay(current); break;
          case 'add': onOperator('+'); break;
          case 'subtract': onOperator('-'); break;
          case 'multiply': onOperator('*'); break;
          case 'divide': onOperator('/'); break;
          case 'equals': equals(); break;
        }
      }
    });
  });
})();
