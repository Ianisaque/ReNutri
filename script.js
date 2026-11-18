document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('empresa-form');
    const btnSubmit = document.getElementById('btn-submit');
    const successMsg = document.getElementById('form-success');

    // --- MÁSCARA DE TELEFONE ---
    const inputTelefone = document.getElementById('telefone');
    inputTelefone.addEventListener('input', (e) => {
        let value = e.target.value.replace(/\D/g, ''); // Remove letras
        if (value.length > 11) value = value.slice(0, 11); 
        
        if (value.length > 6) {
            value = `(${value.slice(0, 2)}) ${value.slice(2, 7)}-${value.slice(7)}`;
        } else if (value.length > 2) {
            value = `(${value.slice(0, 2)}) ${value.slice(2)}`;
        } else if (value.length > 0) {
            value = `(${value}`;
        }
        e.target.value = value;
    });

    // --- FUNÇÕES DE ERRO ---
    const setError = (input, message) => {
        const formGroup = input.parentElement;
        const errorSpan = formGroup.querySelector('.error-msg');
        formGroup.classList.add('error');
        errorSpan.textContent = message;
    };

    const clearError = (input) => {
        const formGroup = input.parentElement;
        const errorSpan = formGroup.querySelector('.error-msg');
        formGroup.classList.remove('error');
        errorSpan.textContent = '';
    };

    // Remove o erro
    const inputs = form.querySelectorAll('input, select');
    inputs.forEach(input => {
        input.addEventListener('input', () => clearError(input));
        input.addEventListener('change', () => clearError(input));
    });

    // --- VALIDAÇÃO E ENVIO ---
    form.addEventListener('submit', (e) => {
        e.preventDefault(); // Impede a página de recarregar

        let isValid = true;

        // Valida Nome
        const nome = document.getElementById('nome');
        if (nome.value.trim() === '') {
            setError(nome, 'Por favor, informe o nome da empresa.');
            isValid = false;
        }

        // Valida E-mail
        const email = document.getElementById('email');
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (email.value.trim() === '') {
            setError(email, 'Por favor, informe o e-mail.');
            isValid = false;
        } else if (!emailRegex.test(email.value.trim())) {
            setError(email, 'Informe um e-mail válido (ex: contato@empresa.com).');
            isValid = false;
        }

        // Valida Telefone (mínimo 10 dígitos)
        const telefone = document.getElementById('telefone');
        const telefoneNumeros = telefone.value.replace(/\D/g, '');
        if (telefoneNumeros.length < 10) {
            setError(telefone, 'Informe um telefone válido com DDD.');
            isValid = false;
        }

        // Valida Tipo
        const tipo = document.getElementById('tipo');
        if (tipo.value === '') {
            setError(tipo, 'Selecione o tipo de comércio.');
            isValid = false;
        }

        // Se tudo estiver correto, simula o envio
        if (isValid) {
            btnSubmit.disabled = true;
            btnSubmit.textContent = 'Enviando...';

            // Simula um tempo de resposta de 1.5 segundos (como se estivesse enviando)
            setTimeout(() => {
                form.reset(); // Limpa os campos
                btnSubmit.style.display = 'none'; // Esconde o botão
                successMsg.style.display = 'block'; // Mostra a mensagem de sucesso
                
                // Rola a tela até a mensagem
                successMsg.scrollIntoView({ behavior: 'smooth', block: 'center' });

            }, 1500); 
        }
    });
});