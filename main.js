// Seleciona os inputs do formulário (página de cadastro)
const form = document.querySelector('form');
const inputName = document.querySelector('input[name="name"]');
const inputEmail = document.querySelector('input[name="email"]');
const inputCpf = document.querySelector('input[name="cpf"]');
const inputBirthDate = document.querySelector('input[name="birthdate"]');
const inputPhone = document.querySelector('input[name="phone"]');
const inputId = document.getElementById('usuario');
const inputSenha = document.getElementById('senha');

let isValidForm = false;

const resetInput = (elem) => {
    elem.classList.remove('invalid');
    elem.nextElementSibling?.classList.add('error-hidden');
};

const validateInput = () => {
    isValidForm = true;

    if (!inputName?.value) {
        inputName.classList.add('invalid');
        inputName.nextElementSibling?.classList.remove('error-hidden');
        isValidForm = false;
    }

    if (!isValidEmail(inputEmail?.value)) {
        inputEmail.classList.add('invalid');
        inputEmail.nextElementSibling?.classList.remove('error-hidden');
        isValidForm = false;
    }

    if (!isValidCpf(inputCpf?.value)) {
        inputCpf.classList.add('invalid');
        inputCpf.nextElementSibling?.classList.remove('error-hidden');
        isValidForm = false;
    }

    if (!isValidBirthDate(inputBirthDate?.value, 12)) {
        inputBirthDate.classList.add('invalid');
        inputBirthDate.nextElementSibling?.classList.remove('error-hidden');
        isValidForm = false;
    }

    if (!isValidPhone(inputPhone?.value)) {
        inputPhone.classList.add('invalid');
        inputPhone.nextElementSibling?.classList.remove('error-hidden');
        isValidForm = false;
    }
};

const isValidEmail = (email) => {
    const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regex.test(String(email).toLowerCase());
};

const isValidCpf = (cpf) => {
    if (!cpf) return false;

    cpf = cpf.replace(/[^\d]+/g, '');
    if (cpf.length !== 11 || /^(\d)\1+$/.test(cpf)) return false;

    let sum = 0;
    for (let i = 0; i < 9; i++) sum += parseInt(cpf.charAt(i)) * (10 - i);
    let firstDigit = (sum * 10) % 11;
    if (firstDigit === 10 || firstDigit === 11) firstDigit = 0;
    if (firstDigit !== parseInt(cpf.charAt(9))) return false;

    sum = 0;
    for (let i = 0; i < 10; i++) sum += parseInt(cpf.charAt(i)) * (11 - i);
    let secondDigit = (sum * 10) % 11;
    if (secondDigit === 10 || secondDigit === 11) secondDigit = 0;

    return secondDigit === parseInt(cpf.charAt(10));
};

const isValidBirthDate = (dateString, minAge = 12) => {
    const today = new Date();
    const birthDate = new Date(dateString);

    if (isNaN(birthDate.getTime())) return false;

    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }

    return age >= minAge;
};

const isValidPhone = (phone) => {
    if (!phone) return false;
    const cleaned = phone.replace(/\D/g, '');
    return /^(\d{10}|\d{11})$/.test(cleaned);
};

// Evento de SUBMIT (cadastro)
if (form && inputId && inputSenha) {
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        validateInput();

        if (isValidForm) {
            const id = inputId.value;
            const senha = inputSenha.value;

            if (id && senha) {
                localStorage.setItem('idUsuario', id);
                localStorage.setItem('senhaUsuario', senha);

                // Redireciona para a tela de login
                window.location.href = "index.html";
                alert("Inscrição realizada com sucesso!");
            } else {
                alert("Preencha o ID e a senha.");
            }
        }
    });
}

// Listeners para remover erro ao digitar
if (inputName) {
    inputName.addEventListener('input', () => resetInput(inputName));
}
if (inputEmail) {
    inputEmail.addEventListener('input', () => resetInput(inputEmail));
}
if (inputCpf) {
    inputCpf.addEventListener('input', () => resetInput(inputCpf));
}
if (inputBirthDate) {
    inputBirthDate.addEventListener('input', () => resetInput(inputBirthDate));
}
if (inputPhone) {
    inputPhone.addEventListener('input', () => resetInput(inputPhone));
}

// Login
const botaoLogin = document.querySelector('.btn-login');
if (botaoLogin) {
    botaoLogin.addEventListener('click', () => {
        const idDigitado = document.querySelector('input[name="usuario"]')?.value;
        const senhaDigitada = document.querySelector('input[name="senha"]')?.value;

        const idSalvo = localStorage.getItem('idUsuario');
        const senhaSalva = localStorage.getItem('senhaUsuario');

        if (idDigitado === idSalvo && senhaDigitada === senhaSalva) {
            window.location.href = "pagInicial.html";
        } else {
            alert("ID ou senha incorretos!");
        }
    });
}