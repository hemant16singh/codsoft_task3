// script.js
$(document).ready(function() {
    const display = $('#display');
    let lastInput = '';

    $('.btn').click(function() {
        const value = $(this).text();
        handleInput(value);
    });

    $(document).keydown(function(e) {
        const key = e.key;
        if (!isNaN(key) || ['+', '-', '*', '/', 'Enter', 'Backspace', 'Escape', '.'].includes(key)) {
            handleInput(key === 'Enter' ? '=' : key === 'Backspace' ? '←' : key === 'Escape' ? 'C' : key);
        }
    });

    function handleInput(value) {
        if (value === 'C') {
            display.text('');
            lastInput = '';
        } else if (value === '←') {
            display.text(display.text().slice(0, -1));
        } else if (value === '=') {
            try {
                const result = eval(display.text());
                display.text(result);
                lastInput = result;
            } catch {
                display.text('Error');
                lastInput = '';
            }
        } else {
            if (['+', '-', '*', '/'].includes(value) && ['+', '-', '*', '/'].includes(lastInput)) {
                display.text(display.text().slice(0, -1) + value);
            } else {
                display.text(display.text() + value);
            }
            lastInput = value;
        }
    }
});
