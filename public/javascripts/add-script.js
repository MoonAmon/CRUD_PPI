
// Set cpfValidation function
function cpfValidation() {

    // Get the cpf input value
    const cpf = document.getElementById('cpf').value;

    // Check if the cpf is valid
    if (cpf.length != 11) {
        alert('CPF inválido');
        return false;
    }

    // Check for invalid sequences
    if (/^(\d)\1+$/.test(cpf)) {
        alert('CPF inválido');
        return false;
    }

    // Check if the cpf is a number
    if (isNaN(cpf)) {
        alert('CPF inválido');
        return false;
    }

    // Validate the first digit
    let sum = 0;
    for (let i = 0; i < 9; i++) {
        sum += parseInt(cpf.charAt(i)) * (10 - i);
    }
    let firstCheckDigit = 11 - (sum % 11);
    if (firstCheckDigit === 10 || firstCheckDigit === 11) {
        firstCheckDigit = 0;
    }
    if (firstCheckDigit != parseInt(cpf.charAt(9))) {
        alert('CPF inválido');
        return false;
    }

    // Validate the second digit
    sum = 0;
    for (let i = 0; i < 10; i++) {
        sum += parseInt(cpf.charAt(i)) * (11 - i);
    }
    let secondCheckDigit = 11 - (sum % 11);
    if (secondCheckDigit === 10 || secondCheckDigit === 11) {
        secondCheckDigit = 0;
    }
    if (secondCheckDigit !== parseInt(cpf.charAt(10))) {
        alert('CPF inválido');
        return false;
    }

    // Check if the cpf is unique
    for (let i = 0; i < pacientes.length; i++) {
        if (pacientes[i].cpf == cpf) {
            alert('CPF já cadastrado');
            return false;
        }
    }

    return true;
}

document.getElementById('addPacienteForm').addEventListener('submit', (event) => {

    if (!cpfValidation()) {
        event.preventDefault();
        alert('CPF inválido. Por favor, insira um CPF válido.');
    }

});
