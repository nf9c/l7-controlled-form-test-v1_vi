import axios from "axios";

const validateName = (name) => /^[a-zA-Z]+$/.test(name);
const validateEmail = (email) => /^\S+@\S+$/.test(email);

const state = {
 validateName: null,
 validateEmail: null,
}

const addClass = (input) => {
    input.classList.add(`is-valid`);
    input.classList.remove(`is-invalid`);
};

const removeClass = (input) => {
    input.classList.remove(`is-valid`);
    input.classList.add(`is-invalid`);
}

export default () => {
    const container = document.querySelector('.form-container');
    const registrationForm = `<form id="registrationForm">
    <div class="form-group">
        <label for="inputName">Name</label>
        <input type="text" class="form-control" id="inputName" placeholder="Введите ваше имя" name="name" required>
    </div>
    <div class="form-group">
        <label for="inputEmail">Email</label>
        <input type="text" class="form-control" id="inputEmail" placeholder="Введите email" name="email" required>
    </div>
    <input type="submit" value="Submit" class="btn btn-primary">
    </form>`;

    container.innerHTML = registrationForm;
    const submit = document.querySelector('.btn');

    submit.addEventListener('click', async (e) => {
        e.preventDefault();
        const response = await axios.post('/users', {name:'' , email:''});
        document.body.innerHTML = `<p>${response.data.message}</p>`;
    })

    const inputName = document.querySelector('#inputName');
    const inputEmail = document.querySelector('#inputEmail');

    inputName.addEventListener('input', (e) => {
        const name = e.target.value.trim();
        console.log(state)
        if (state.validateEmail && state.validateName){
            submit.disabled = false;
        } else {
            submit.disabled = true;
        }

        if (validateName(name)) {
            state.validateName = true;
            addClass(inputName);
        } else {
            state.validateName = false;
            removeClass(inputName);
        }
    });

    inputEmail.addEventListener('input', (e) => {
        const email = e.target.value.trim();
        console.log(state)
        if (state.validateEmail && state.validateName){
            submit.disabled = false;
        } else {
            submit.disabled = true;
        }

        if (validateEmail(email)) {
            state.validateEmail = true;
            inputEmail.classList.add(`is-valid`);
            inputEmail.classList.remove(`is-invalid`);
        } else {
            state.validateEmail = false;
            inputEmail.classList.remove(`is-valid`);
            inputEmail.classList.add(`is-invalid`);
        }
    });

}
