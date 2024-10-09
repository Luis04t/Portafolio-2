// Mostrar valor en la pantalla de la calculadora
function appendValue(value) {
    var display = document.getElementById('display');
    display.value += value;
}

// Limpiar la pantalla de la calculadora
function clearDisplay() {
    document.getElementById('display').value = '';
}

// Borrar el último carácter de la pantalla
function deleteLast() {
    var display = document.getElementById('display');
    display.value = display.value.slice(0, -1);
}

// Calcular el resultado y almacenarlo en el historial
function calculateResult() {
    var display = document.getElementById('display');
    var expression = display.value;

    try {
        var result = eval(expression);  // Calcular la expresión
        display.value = result;
        
        saveToHistory(expression + " = " + result);  // Guardar en historial
    } catch (e) {
        display.value = 'Error';  // Mostrar error si la expresión es inválida
    }
}

// Guardar el cálculo en el historial usando localStorage
function saveToHistory(calculation) {
    var history = JSON.parse(localStorage.getItem('calcHistory')) || [];
    history.push(calculation);
    localStorage.setItem('calcHistory', JSON.stringify(history));
    renderHistory();
}

// Mostrar el historial en la pantalla
function renderHistory() {
    var history = JSON.parse(localStorage.getItem('calcHistory')) || [];
    var historyList = document.getElementById('history-list');
    historyList.innerHTML = '';
    history.forEach(function(item) {
        var li = document.createElement('li');
        li.textContent = item;
        historyList.appendChild(li);
    });
}

// Limpiar todo el historial y eliminarlo de localStorage
function clearHistory() {
    localStorage.removeItem('calcHistory');
    renderHistory();
}

// Cargar el historial cuando se carga la página
window.onload = function() {
    renderHistory();
}