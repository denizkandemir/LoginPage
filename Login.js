const users = JSON.parse(localStorage.getItem("users")) || [];

const signNewMember = () => {
  const newUser = signInErrorHandling();

  if (newUser !== false) {  
    checkUser(newUser); 
    rotateAnimation('front');
    const inputs  = document.querySelectorAll(".card-input");
    inputs.forEach((input) => {
        input.value = "";
    });
  } 
};

const checkUser = (newUser) => {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const isUser = users.find((user) => user.username === newUser.username); 
    const isMail = users.find((user) => user.email === newUser.email); 

    if (!isUser && !isMail) {
        users.push(newUser);
        localStorage.setItem("users", JSON.stringify(users));
        alert("Successfully registered.Please log in.");
    } else {
        if (isMail) {
          alert("This email is already exist");
        }
        else{
          alert("This username already exist. Please try another one");
        }
    }

   
}

const signInErrorHandling = () => {
  const nameValue = document.getElementById("name-input").value;
  const userNameValue = document.getElementById("username-input").value
  const emailValue = document.getElementById("email-input").value;
  const passwordValue = document.getElementById("password-input").value;

  if (nameValue === "") {
    alert("Please enter your name");
    return false;
  } else if (emailValue === "") {
    alert("Please enter your email");
    return false;
  } else if (passwordValue === "") {
    alert("Please enter a password");
    return false;
  } else if(emailValue === "") {
    alert("Please enter an email address");
    return false;
  }else if (userNameValue === "") {
    alert("Please enter your user name");
    return false;
  }
  else {
   const userId = users.length !== 0 ? users.length + 1 : 1;
   const user = {
        name: nameValue,
        email:emailValue,
        username:userNameValue,
        password: passwordValue,
        id: userId,
    }
    return user;
  } 
}

const handleLogin = () => {
  const passwordValue = document.getElementById("login-password-input").value;
  const usernameValue = document.getElementById("login-username-input").value;
  const users = JSON.parse(localStorage.getItem("users")) || [];
   
  const loginUser = users.find((user) => user.username === usernameValue);

  if (loginUser) {
    const chekPassword = loginUser.password === passwordValue;
    if (chekPassword) {
       alert("Login Succesfull"); 
       window.location.assign("homepage.html")
    } else {
        alert("Wrong Password");
    }
  } else {
    alert("Username does not exist")
  }
}

const rotateAnimation = (side) => {
  const card = document.getElementById("card-container");
  card.classList.toggle("change-face");

  if (side === "back") {
    card.style.height = "500px";
  } else {
    card.style.height = "415px";
  }
};
