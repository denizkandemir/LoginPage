let users = JSON.parse(localStorage.getItem("users")) || [];
let checkKeepLogin = JSON.parse(localStorage.getItem("keepLogin")) || false;

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
  const card = document.getElementById("card-container");
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
    signUpContainer.style.display = "none";

    const rememberContainer = document.getElementById("remember-container");
    const rememberAllContainer = document.getElementById(
      "remember-button-container"
    );
    let selectedAnimals = [];
    let randomIndexs = [];

    while (selectedAnimals.length < 4) {
      const randomIndex = Math.floor(Math.random() * rememberAnimals.length);
      if (!randomIndexs.includes(randomIndex)) {
        randomIndexs.push(randomIndex);
        selectedAnimals.push(rememberAnimals[randomIndex]);
      }
    }

    rememberContainer.innerHTML = "";
    selectedAnimals.map((animal) => {
      rememberContainer.innerHTML += `
     <div class="remember-animal-container"> 
       <img src=${animal.img} class="animal-img"/>
       <p class="animal-p"> ${animal.name} </p>
       <input type="radio" id="animal-${animal.id}" name="animal-choose" class="remember-radio">
     </div> 
    `;
    });

    rememberAllContainer.innerHTML += `<button class="remember-button" id="remember-animal-button"> Confrim </button>`;
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
        const selectedAnimal = rememberAnimals.find(
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
      const randomNumber = Math.floor(Math.random() * (100 - 10 + 1)) + 10;
      if (!randomNumbers.includes(randomNumber)) {
        uniqueRandomNumbers.push(randomNumber);
        randomNumbers.push(randomNumber);
      }
    }

    randomNumbers.map((number) => {
      rememberContainer.innerHTML += `
     <div class="remember-number-container"> 
       <p class="select-number"> ${number} </p>
       <input type="radio" id="number-${number}" name="number-choose" class="remember-radio">
     </div> 
    `;
    });
    rememberAllContainer.innerHTML += `
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
        console.log(signUpContainer);
        resolve(selectedNumber);
      } else {
        alert("No numbers selected");
      }
    });
  });
};

const handleForget = () => {
  const card = document.getElementById("card-container");
  const loginContainer = document.getElementById("login-container");
  const passwordContainer = document.getElementById("forget-password");
  loginContainer.style.display = "none";
  passwordContainer.style.display = "block";
  card.style.height = "500px";

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


const checkForgetMail = async() => {
  users = JSON.parse(localStorage.getItem("users")) || [];

  const userNameValue = document.getElementById(
    "forget-username-input"
  ).value;
  const mailValue = document.getElementById("forget-email-input").value;
  const userInfo = users.find((user) => userNameValue === user.userName);
  const passwordContainer = document.getElementById("forget-password");
  
  if (userInfo && userInfo.email === mailValue) {
    passwordContainer.innerHTML = `
    <h3 class="forget-title"> Choose an Animal </h3>
    <p class="forget-p"> Select the same animal you had selected before for sign up </p>
    <div class="forget-ask-container" id="forget-ask-container"></div>
    <button class="remember-button"  id="forget-animal-button"> Confrim </button>
  `;
 
  const selectedAnimal = await askAnimal();

  }else {
    alert("Can't Find The User");
  }
}


const askAnimal = () => {
  return new Promise((resolve, reject) => {
      const animalContainer = document.getElementById("forget-ask-container");
      const userAnimal = userInfo.selectedAnimal;
      let selectedAnimals = [];
      let randomIndexs = [];
  
      while (selectedAnimals.length < 3) {
        const randomIndex = Math.floor(Math.random() * rememberAnimals.length);
        if (!randomIndexs.includes(randomIndex)) {
          randomIndexs.push(randomIndex);
          selectedAnimals.push(rememberAnimals[randomIndex]);
        }
      }

      const randomIndex = Math.floor(Math.random() * (selectedAnimals.length + 1));
      selectedAnimals.splice(randomIndex, 0, userAnimal);

      let content = "";
      selectedAnimals.map((animal) => {
        content = `
        <div class="remember-animal-container"> 
          <img src=${animal.img} class="animal-img"/>
          <p class="animal-p"> ${animal.name} </p>
          <input type="radio" id="animal-${animal.id}" name="forget-animal-choose" class="remember-radio">
        </div> 
      `;
      });
      animalContainer.innerHTML = content;

      const forgetAnimalButton = document.getElementById("forget-animal-id");

      forgetAnimalButton.addEventListener(("click") , () => {
        const radio = document.querySelector(
          'input[name="animal-choose"]:checked'
        );
  
        if (radio) {
          const selectedAnimal = rememberAnimals.find(
            (animal) => animal.id === parseInt(radio.id.split("-")[1])
          );
          resolve(selectedAnimal);
        } else {
          alert("No Animals selected");
        }
      });
  
  });
};

handleKeepLogin();
