let id = (id) => document.getElementById(id);
let classes = (classes) => document.getElementsByClassName(classes);

let username = id("username"),
  email = id("email"),
  password = id("password"),
  form = id("registerForm"),
  errorMsg = classes("error"),
  successIcon = classes("success-icon"),
  failureIcon = classes("failure-icon");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  // Validate form fields
  let isUsernameValid = validateField(username, 0, "Username cannot be blank");
  let isEmailValid = validateField(email, 1, "Email cannot be blank");
  let isPasswordValid = validateField(password, 2, "Password cannot be blank");

  // If all fields are valid, proceed with form submission
  if (isUsernameValid && isEmailValid && isPasswordValid) {
    try {
      const formData = {
        username: username.value.trim(),
        email: email.value.trim(),
        password: password.value.trim()
      };

      const response = await fetch('http://localhost:3000/submit-form', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        // Clear form fields and success icons
        username.value = '';
        email.value = '';
        password.value = '';
        for (let i = 0; i < errorMsg.length; i++) {
          errorMsg[i].innerHTML = '';
          successIcon[i].style.opacity = '0';
        }
        alert('User registered successfully!');
      } else {
        alert('Error registering user');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error registering user');
    }
  }
});

let validateField = (field, serial, message) => {
  if (field.value.trim() === "") {
    errorMsg[serial].innerHTML = message;
    failureIcon[serial].style.opacity = "1";
    successIcon[serial].style.opacity = "0";
    return false;
  } else {
    errorMsg[serial].innerHTML = "";
    failureIcon[serial].style.opacity = "0";
    successIcon[serial].style.opacity = "1";
    return true;
  }
};
