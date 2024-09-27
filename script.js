'use strict'

let submitButton = document.getElementById("submit-button").textContent=document.getElementById("submit-button").textContent.toUpperCase();

document.getElementById("form-container").addEventListener('submit', function(e) {
    e.preventDefault();
    let errors = [];

    let firstName = document.getElementById("fname").value;
    let lastName = document.getElementById("lname").value;
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;

    let data = {
        userName: firstName + " " + lastName,
        email: email,
        password: password
    }
    console.log(data);

    if (firstName.length < 2) {
        errors.push("Enter a valid name");
    }

    if (lastName.length < 2) {
        errors.push("Enter a valid name");
    }

    if (firstName ===  "") {
        errors.push("First Name cannot be empty");
    }

    if (lastName.length ==  "") {
        errors.push("Last Name cannot be empty");
    }

    let emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (!emailPattern.test(email)) {
        errors.push("Looks like this is not an email");
    }

    if (email.length === "") {
        errors.push("Email cannot be empty");
    }

    if (password.length < 6) {
        errors.push("Password must be at least 6 characters long");
    }

    if (errors.length > 0) {
        document.getElementById("error").innerHTML = errors.join("<br>");
        } else {
            document.getElementById("error").innerHTML = "";
            alert("Thank you for your message, " + firstName + "! We will get back to you as soon as possible.");
            document.getElementById("form-container").reset();

            fetch('/submit', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })
            .then(response => response.json())
            .then(data => {
                console.log('Success:', data);
            })
            .catch((error) => {
                console.error('Error:', error);
            
            })
        }
    
})
