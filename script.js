'use strict'

let submitButton = document.getElementById("submit-button").textContent=document.getElementById("submit-button").textContent.toUpperCase();

const form = document.getElementById("form-container")
const firstName = document.getElementById("fname");
const lastName = document.getElementById("lname");
const email = document.getElementById("email");
const password = document.getElementById("password");

form.addEventListener('keyUp', function(e) {
    e.preventDefault();
    
    checkInputs();
});

let data = {
    userName: firstName.value + " " + lastName.value,
    email: email.value,
    password: password.value
}

console.log(data);


const checkInputs = () => {
    const firstNameValue = firstName.value.trim();
    const lastNameValue = lastName.value.trim();
    const emailValue = email.value.trim();
    const passwordValue = password.value.trim();

    if(firstNameValue === '') {
        setErrorFor(firstName, 'First Name cannot be empty');
    } else {
        setSuccessFor(firstName);
    }

    if(lastNameValue === '') {
        setErrorFor(lastName, 'Last Name cannot be empty');
    } else {
        setSuccessFor(lastName);
    }

    if(emailValue === '') {
        setErrorFor(email, 'Email cannot be empty');
    } else if(!emailPattern.test(emailValue)){
        setErrorFor(email, 'Email format should be (e.g name@host.ltd)');
    } else {
        setSuccessFor(email);
    }

    if(passwordValue === '') {
        setErrorFor(password, 'Password cannot be empty');
    } else {
        setSuccessFor(password);
    }
}

const  setErrorFor = (input, message) => {
    const formControl = input.parentElement;
    const small = formControl.querySelector('small');

    small.innerText = message;

    formControl.className = 'form-control error';
}

const setSuccessFor = input => {
    const formControl = input.parentElement;
    formControl.className = 'form-control success';
}

const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

const passwordPattern = /^(?=.[0-9])(?=.[!@#$%^&])[a-zA-Z0-9!@#$%^&]{6,}$/;

fetch('/submit', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
})
.then(response => response.json(data))
.then(data => {
    console.log('Success:', data);
})
.catch((error) => {
    console.error('Error:', error);

})
