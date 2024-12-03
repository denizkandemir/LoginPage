let users = JSON.parse(localStorage.getItem("users")) || [];
let checkKeepLogin = JSON.parse(localStorage.getItem("keepLogin")) || false;
const card = document.getElementById("card-container");

const handleKeepLogin = () => {
  checkKeepLogin = JSON.parse(localStorage.getItem("keepLogin")) || false;

  if (checkKeepLogin) {
    window.location.assign("homepage.html");
  }
};

const signNewMember = async () => {
  const newUser = await signInErrorHandling();

  if (newUser !== false) {
    users = JSON.parse(localStorage.getItem("users")) || [];
    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));
    alert("Successfully registered.Please log in.");
    const inputs = document.querySelectorAll(".card-input");
    inputs.forEach((input) => {
      input.value = "";
    });
    const backContainer = document.getElementById("back-container");
    backContainer.style.height = "500px";
    rotateAnimation("front");
  }
};

const checkInfo = (mail, userName) => {
  users = JSON.parse(localStorage.getItem("users")) || [];
  const isUser = users.find((user) => user.username === userName);
  const isMail = users.find((user) => user.email === mail);

  if (!isUser && !isMail) {
    return true;
  } else {
    if (isMail) {
      alert("This email is already exist");
      return false;
    } else {
      alert("This username already exist. Please try another one");
      return false;
    }
  }
};

async function signInErrorHandling() {
  const nameValue = document.getElementById("name-input").value;
  const userNameValue = document.getElementById("username-input").value;
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
  } else if (userNameValue === "") {
    alert("Please enter your user name");
    return false;
  } else {
    const checkUser = checkInfo(emailValue, userNameValue);

    if (checkUser) {
      const userId = users.length !== 0 ? users.length + 1 : 1;
      const userAnimal = await handleRememberAnimals();
      const userNumber = await handleRememberNumbers();
      const user = {
        name: nameValue,
        email: emailValue,
        username: userNameValue,
        password: passwordValue,
        id: userId,
        selectedAnimal: userAnimal,
        selectedNumber: userNumber,
      };
      return user;
    } else {
      return false;
    }
  }
}

const handleLogin = () => {
  const passwordValue = document.getElementById("login-password-input").value;
  const usernameValue = document.getElementById("login-username-input").value;
  const loginCheckbox = document.getElementById("login-checkbox");
  users = JSON.parse(localStorage.getItem("users")) || [];

  const loginUser = users.find((user) => user.username === usernameValue);

  if (loginUser) {
    const chekPassword = loginUser.password === passwordValue;
    if (chekPassword) {
      alert("Login Succesfull");
      const keepLogin = loginCheckbox.checked;
      localStorage.setItem("keepLogin", JSON.stringify(keepLogin));
      window.location.assign("homepage.html");
    } else {
      alert("Wrong Password");
    }
  } else {
    alert("Username does not exist");
  }
};

const rotateAnimation = (side) => {
  card.classList.toggle("change-face");

  if (side === "back") {
    card.style.height = "500px";
  } else {
    card.style.height = "415px";
  }
};

const rememberAnimals = [
  {
    id: 1,
    img: "imgs/loginAnimal1.png",
    name: "Dog",
  },

  {
    id: 2,
    img: "imgs/loginAnimal2.png",
    name: "Cat",
  },

  {
    id: 3,
    img: "imgs/loginAnimal3.png",
    name: "rabbit",
  },

  {
    id: 4,
    img: "imgs/loginAnimal4.png",
    name: "seal",
  },

  {
    id: 5,
    img: "imgs/loginAnimal5.png",
    name: "dolphin",
  },

  {
    id: 6,
    img: "imgs/loginAnimal6.png",
    name: "horse",
  },
];

const handleRememberAnimals = () => {
  return new Promise((resolve, reject) => {
    const signUpContainer = document.getElementById("sign-up-container");
    const backContainer = document.getElementById("back-container");
    backContainer.style.height = "450px";
    signUpContainer.style.display = "none";

    const rememberAllContainer = document.getElementById(
      "remember-button-container"
    );
    rememberAllContainer.style.display = "block";
    rememberAllContainer.innerHTML = `<div class="sign-in-remember-container" id="remember-container"></div>`;

    const rememberContainer = document.getElementById("remember-container");
    let selectedAnimals = [];
    let randomIndexs = [];

    while (selectedAnimals.length < 4) {
      const randomIndex = Math.floor(Math.random() * rememberAnimals.length);
      if (!randomIndexs.includes(randomIndex)) {
        randomIndexs.push(randomIndex);
        selectedAnimals.push(rememberAnimals[randomIndex]);
      }
    }
    let content = "";
    rememberContainer.innerHTML = "";
    selectedAnimals.map((animal) => {
      content += `
     <div class="remember-animal-container"> 
       <img src=${animal.img} class="animal-img" alt=${animal.name}/>
       <input type="radio" id="animal-${animal.id}" name="animal-choose" class="remember-radio">
     </div> 
    `;
    });
    rememberContainer.innerHTML += `
    ${content} 
    <button class="remember-button" id="remember-animal-button"> Confrim </button>
    `;

    const titleP = document.createElement("p");
    const textP = document.createElement("p");
    titleP.textContent = "Choose an Animal";
    titleP.classList.add("remember-title-p");
    textP.textContent = "Remember your choice to renew your password";
    textP.classList.add("remember-text-p");
    rememberAllContainer.prepend(titleP, textP);
    const animalButton = document.getElementById("remember-animal-button");

    animalButton.addEventListener("click", () => {
      const radio = document.querySelector(
        'input[name="animal-choose"]:checked'
      );

      if (radio) {
        const selectedAnimal = selectedAnimals.find(
          (animal) => animal.id === parseInt(radio.id.split("-")[1])
        );
        resolve(selectedAnimal);
      } else {
        alert("No Animals selected");
      }
    });
  });
};

const handleRememberNumbers = () => {
  return new Promise((resolve, reject) => {
    const rememberAllContainer = document.getElementById(
      "remember-button-container"
    );
    rememberAllContainer.innerHTML = ` <div class="all-numbers-container sign-in-remember-container" id="remember-container"></div>`;
    const rememberContainer = document.getElementById("remember-container");
    const signUpContainer = document.getElementById("sign-up-container");
    rememberContainer.innerHTML = "";

    let randomNumbers = [];
    let uniqueRandomNumbers = [];

    while (uniqueRandomNumbers.length < 4) {
      const randomNumber = Math.floor(Math.random() * (99 - 10 + 1)) + 10;
      if (!randomNumbers.includes(randomNumber)) {
        uniqueRandomNumbers.push(randomNumber);
        randomNumbers.push(randomNumber);
      }
    }
   
    let content = "";
    randomNumbers.map((number) => {
      content += `
     <div class="remember-number-container"> 
       <p class="select-number"> ${number} </p>
       <input type="radio" id="number-${number}" name="number-choose" class="remember-radio">
     </div> 
    `;
    });
    rememberContainer.innerHTML += `
     ${content}
     <button class="remember-button" id="remember-number-button"> Confrim </button>
  `;
    const titleP = document.createElement("p");
    const textP = document.createElement("p");
    titleP.textContent = "Choose a Number";
    titleP.classList.add("remember-title-p");
    textP.textContent = "Remember your choice to renew your password";
    textP.classList.add("remember-text-p");
    rememberAllContainer.prepend(titleP, textP);

    const numberButton = document.getElementById("remember-number-button");

    numberButton.addEventListener("click", () => {
      const radio = document.querySelector(
        'input[name="number-choose"]:checked'
      );
      if (radio) {
        const selectedNumber = randomNumbers.find(
          (number) => number === parseInt(radio.id.split("-")[1])
        );
        rememberAllContainer.style.display = "none";
        signUpContainer.style.display = "block";
        resolve(selectedNumber);
      } else {
        alert("No numbers selected");
      }
    });
  });
};

const handleForget = () => {
  card.style.height = "350px";
  const loginContainer = document.getElementById("login-container");
  const passwordContainer = document.getElementById("forget-password");
  loginContainer.style.display = "none";
  passwordContainer.style.display = "block";

  passwordContainer.innerHTML = `
     <h1 class="card-title"> Renew Your Password </h1>
   <div class="inputs-container">
    <div class="input-p-container">
      <p class="input-p"> Username </p>
      <input type="text" id="forget-username-input" class="card-input">
    </div>
    <div class="input-p-container">
      <p class="input-p"> Email </p>
      <input type="text" id="forget-email-input" class="card-input">
   </div>
    <div class="login-button-p-container">
        <button onclick="checkForgetMail()" class="login-button"> Confrim </button>
     </div>
  </div> 
  `;
};

const checkForgetMail = async () => {
  users = JSON.parse(localStorage.getItem("users")) || [];

  const userNameValue = document.getElementById(
    "forget-username-input"
  ).value;
  const mailValue = document.getElementById("forget-email-input").value;
  const userInfo = users.find((user) => userNameValue === user.username);
  const passwordContainer = document.getElementById("forget-password");

  if (userInfo && userInfo.email === mailValue) {
    passwordContainer.innerHTML = `
    <h3 class="forget-title" id="forget-title"> Choose an Animal </h3>
    <p class="forget-p" id="forget-p"> Select the same animal you had selected before for sign up </p>
    <div class="forget-ask-container" id="forget-ask-container"></div>
  `;

    const selectedAnimal = await askAnimal(userInfo);
    const selectedNumber = await askNumber(userInfo);

    if (selectedAnimal === userInfo.selectedAnimal && selectedNumber === userInfo.selectedNumber) {
      card.style.height = "240px";
      passwordContainer.innerHTML = `
     <h3 class="new-password-title"> Your New Password </h3>
     <p class="forget-p" id="forget-p"> Determine a new pasasword </p>
     <p class="forget-input-litte-p"> Password  </p>
     <input type="text" id="new-password-input" class="new-password-input card-input"/>
     <div class="remember-button-container">
       <button class="remember-button" id="new-password-button"> Confrim </button>
      </div> 
    `
    const newPasswordButton = document.getElementById("new-password-button");

    newPasswordButton.addEventListener(("click"),() => {
      const newPassword = document.getElementById("new-password-input").value;
      if (newPassword !== "") {
        userInfo.password = newPassword;
        localStorage.setItem("users", JSON.stringify(users));
        alert("Password changed succesfully");
        const loginContainer = document.getElementById("login-container");
        const passwordContainer = document.getElementById("forget-password");
        loginContainer.style.display = "block";
        passwordContainer.style.display = "none";
        card.style.height = "415px";
      } else {
        alert("Please enter a valid password")
      }
    });
    } else {
      alert("User Informations are not right")
      window.location.reload();
    }
  } else {
    alert("Can't Find The User");
  }
}


const askAnimal = (userInfo) => {
  return new Promise((resolve, reject) => {
    card.style.height = "450px";
    const animalContainer = document.getElementById("forget-ask-container");
    const userAnimal = userInfo.selectedAnimal;
    console.log(userAnimal)
    let selectedAnimals = [];
    let randomIndexs = [];

    while (selectedAnimals.length < 3) {
      const randomIndex = Math.floor(Math.random() * rememberAnimals.length);
      if (!randomIndexs.includes(randomIndex) && rememberAnimals[randomIndex].id !== userAnimal.id) {
        randomIndexs.push(randomIndex);
        selectedAnimals.push(rememberAnimals[randomIndex]);
      }
    }

    const randomIndex = Math.floor(Math.random() * (selectedAnimals.length + 1));
    selectedAnimals.splice(randomIndex, 0, userAnimal);

    let content = "";
    selectedAnimals.map((animal) => {
      content += `
        <div class="remember-animal-container"> 
          <img src=${animal.img} class="animal-img" alt=${animal.name}/>
          <input type="radio" id="animal-${animal.id}" name="forget-animal-choose" class="remember-radio">
        </div> 
      `;
    });
    animalContainer.innerHTML = `<div class="forget-animals-container"> ${content} </div> `;
    animalContainer.innerHTML += `<div class="remember-button-container"><button class="remember-button"  id="forget-animal-button"> Confrim </button></div>`;

    const forgetAnimalButton = document.getElementById("forget-animal-button");

    forgetAnimalButton.addEventListener(("click"), () => {
      const radio = document.querySelector(
        'input[name="forget-animal-choose"]:checked'
      );

      if (radio) {
        const selectedAnimal = selectedAnimals.find(
          (animal) => animal.id === parseInt(radio.id.split("-")[1])
        );
        resolve(selectedAnimal);
      } else {
        alert("No Animals selected");
      }
    });
  });
};

const askNumber = (userInfo) => {
  return new Promise((resolve, reject) => {
    const numberContainer = document.getElementById("forget-ask-container");
    const forgetTitle = document.getElementById("forget-title");
    const forgetP = document.getElementById("forget-p");
    card.style.height = "415px";
    const userNumber = userInfo.selectedNumber;
    let selectedNumbers = []; 
    let uniqueRandomNumbers = [];

    while (selectedNumbers.length < 3) {
      const randomNumber = Math.floor(Math.random() * (100 - 10 + 1)) + 10;
      if (!uniqueRandomNumbers.includes(randomNumber) && randomNumber !== userNumber) {
        uniqueRandomNumbers.push(randomNumber);
        selectedNumbers.push(randomNumber);
      }
    }

    const randomIndex = Math.floor(Math.random() * (selectedNumbers.length + 1));
    selectedNumbers.splice(randomIndex, 0, userNumber);

    forgetTitle.textContent = "Choose a Number";
    forgetP.textContent = "Select the same number you had selected before for sign up";

    let content = "";
    selectedNumbers.map((number) => {
      content += `
     <div class="remember-number-container"> 
       <p class="select-number"> ${number} </p>
       <input type="radio" id="number-${number}" name="forget-number-choose" class="remember-radio">
     </div> 
    `;
    });
    numberContainer.innerHTML = `<div class="forget-numbers-container"> ${content} </div>`
    numberContainer.innerHTML += `<div class="remember-button-container"> <button class="remember-button"  id="forget-number-button"> Confrim </button> </div>`;
    const forgetNumberButton = document.getElementById("forget-number-button");

    forgetNumberButton.addEventListener(("click"), () => {
      const radio = document.querySelector(
        'input[name="forget-number-choose"]:checked'
      );

      if (radio) {
        const selectedNumber = selectedNumbers.find(
          (number) => number === parseInt(radio.id.split("-")[1])
        );
        resolve(selectedNumber);
      } else {
        alert("No Numbers Selected");
      }
    });

  });
}

handleKeepLogin();
