// Set preencherCampos function
function preencherCampos() {

    // Get the selected paciente
    const selectElement = document.getElementById('pacienteForm');
    const selectedCpf = selectElement.value;

    // Find the selected paciente in the pacientes array
    for (let i = 0; i < pacientes.length; i++) {
        if (pacientes[i].cpf == selectedCpf) {
            selectedPaciente = pacientes[i];
            break;
        }
    }

    // If the selected paciente is found
    if (selectedPaciente) {

        // Set the paciente data in the form
        document.getElementById('cpf').value = selectedPaciente.cpf;
        document.getElementById('nomeCompleto').value = selectedPaciente.nomeCompleto;
        document.getElementById('idade').value = selectedPaciente.idade;
        document.getElementById('diaMarcado').value = new Date(selectedPaciente.diaMarcado).toISOString().split('T')[0];
        document.getElementById('horaMarcada').value = selectedPaciente.horaMarcada;
    }
}

// Set event listener for the select element
document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('pacienteForm').addEventListener('change', preencherCampos);
});