document.getElementById('encryptButton').addEventListener('click',function(){
    const inputText = document.getElementById('inputText').value;
    const sanitizedText = sanitizeText(inputText);

    const outputText = document.getElementById('outputText');
    const placeholderImage = document.getElementById('placeholderImage');

    if (sanitizedText !== inputText) {
        alert('Por favor, ingrese solo letras minúsculas sin caracteres especiales.');
        outputText.style.display = 'none';
        placeholderImage.style.display = 'block';
    } else if (inputText.trim() !== '') {
        const encryptedText = transformText(inputText, true);
        outputText.value = encryptedText;
        outputText.style.display = 'block';
        placeholderImage.style.display = 'none';
    }
});

document.getElementById('decryptButton').addEventListener('click', function() {
    const inputText = document.getElementById('inputText').value;
    const sanitizedText = sanitizeText(inputText);

    const outputText = document.getElementById('outputText');
    const placeholderImage = document.getElementById('placeholderImage');

    if (sanitizedText !== inputText) {
        alert('Por favor, ingrese solo letras minúsculas sin caracteres especiales.');
        outputText.style.display = 'none';
        placeholderImage.style.display = 'block';
    } else if (inputText.trim() !== '') {
        const decryptedText = transformText(inputText, false);
        outputText.value = decryptedText;
        outputText.style.display = 'block';
        placeholderImage.style.display = 'none';
    }
});

document.getElementById('inputText').addEventListener('input', function() {
    const inputText = document.getElementById('inputText').value;
    const sanitizedText = sanitizeText(inputText);

    const outputText = document.getElementById('outputText');
    const placeholderImage = document.getElementById('placeholderImage');

    if (sanitizedText !== inputText) {
        outputText.style.display = 'none';
        placeholderImage.style.display = 'block';
    } else if (inputText.trim() === '') {
        outputText.style.display = 'none';
        placeholderImage.style.display = 'block';
    } else {
        outputText.style.display = 'block';
        placeholderImage.style.display = 'none';
    }
});

function transformText(text, encrypt) {
    const transformations = {
        'e': 'enter',
        'i': 'imes',
        'a': 'ai',
        'o': 'ober',
        'u': 'ufat'
    };

    if (encrypt) {
        return text.replace(/[eioua]/g, match => transformations[match]);
    } else {
        let decryptedText = text;
        for (const [key, value] of Object.entries(transformations)) {
            decryptedText = decryptedText.replace(new RegExp(value, 'g'), key);
        }
        return decryptedText;
    }

   
}

document.getElementById('copyButton').addEventListener('click', function() {
    const outputText = document.getElementById('outputText');
    
    if (outputText.value.trim() !== '') {
        navigator.clipboard.writeText(outputText.value)
            .then(() => {
                alert('Texto copiado al portapapeles.');
            })
            .catch(err => {
                console.error('Error al copiar al portapapeles: ', err);
                alert('No se pudo copiar el texto.');
            });
    } else {
        alert('No hay texto para copiar.');
    }
});


document.getElementById('clearButton').addEventListener('click', function() {
    document.getElementById('inputText').value = '';
    document.getElementById('outputText').value = '';
    document.getElementById('outputText').style.display = 'none';
    document.getElementById('placeholderImage').style.display = 'block';
});

function sanitizeText(text) {
    return text.replace(/[^a-z\s]/g, '');
}