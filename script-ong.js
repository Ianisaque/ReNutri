document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('ong-form');
    const btnSubmit = document.getElementById('btn-submit-ong');
    const successMsg = document.getElementById('form-success-ong');

    // Máscara de Telefone
    const inputTelefone = document.getElementById('telefone-ong');
    inputTelefone.addEventListener('input', (e) => {
        let value = e.target.value.replace(/\D/g, '');
        if (value.length > 11) value = value.slice(0, 11);
        if (value.length > 6) value = `(${value.slice(0, 2)}) ${value.slice(2, 7)}-${value.slice(7)}`;
        else if (value.length > 2) value = `(${value.slice(0, 2)}) ${value.slice(2)}`;
        else if (value.length > 0) value = `(${value}`;
        e.target.value = value;
    });

    // Máscara de CNPJ (simplificada)
    const inputCnpj = document.getElementById('cnpj');
    inputCnpj.addEventListener('input', (e) => {
        let value = e.target.value.replace(/\D/g, '');
        if (value.length > 14) value = value.slice(0, 14);
        value = value.replace(/^(\d{2})(\d)/, '$1.$2');
        value = value.replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3');
        value = value.replace(/\.(\d{3})(\d)/, '.$1/$2');
        value = value.replace(/(\d{4})(\d)/, '$1-$2');
        e.target.value = value;
    });

    // Funções de Erro
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

    const inputs = form.querySelectorAll('input');
    inputs.forEach(input => {
        input.addEventListener('input', () => clearError(input));
    });

    // Validação e Envio
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        let isValid = true;

        const nome = document.getElementById('nome-ong');
        if (nome.value.trim() === '') {
            setError(nome, 'Por favor, informe o nome da ONG.');
            isValid = false;
        }

        const cnpj = document.getElementById('cnpj');
        if (cnpj.value.replace(/\D/g, '').length !== 14) {
            setError(cnpj, 'Informe um CNPJ válido.');
            isValid = false;
        }

        const email = document.getElementById('email-ong');
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (email.value.trim() === '' || !emailRegex.test(email.value.trim())) {
            setError(email, 'Informe um e-mail válido.');
            isValid = false;
        }

        const telefone = document.getElementById('telefone-ong');
        if (telefone.value.replace(/\D/g, '').length < 10) {
            setError(telefone, 'Informe um telefone válido com DDD.');
            isValid = false;
        }

        if (isValid) {
            btnSubmit.disabled = true;
            btnSubmit.textContent = 'Enviando...';

            setTimeout(() => {
                form.reset();
                btnSubmit.style.display = 'none';
                successMsg.style.display = 'block';
                successMsg.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }, 1500);
        }
    });
});