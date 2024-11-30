let users = JSON.parse(localStorage.getItem("users")) || [];
let checkKeepLogin = JSON.parse(localStorage.getItem("keepLogin")) || false;

const handleKeepLogin = () => {
  checkKeepLogin = JSON.parse(localStorage.getItem("keepLogin")) || false;

  if (checkKeepLogin) {
    window.location.assign("homepage.html");
  }
};

const signNewMember = async() => {
  const newUser = await signInErrorHandling();
  console.log(newUser);

  if (newUser !== false) {
    checkUser(newUser);
    rotateAnimation("front");
    const inputs = document.querySelectorAll(".card-input");
    inputs.forEach((input) => {
      input.value = "";
    });
  }
};

const checkUser = (newUser) => {
  users = JSON.parse(localStorage.getItem("users")) || [];
  const isUser = users.find((user) => user.username === newUser.username);
  const isMail = users.find((user) => user.email === newUser.email);

  if (!isUser && !isMail) {
    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));
    alert("Successfully registered.Please log in.");
  } else {
    if (isMail) {
      alert("This email is already exist");
      console.log(isMail)
    } else {
      alert("This username already exist. Please try another one");
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
    const userId = users.length !== 0 ? users.length + 1 : 1;
    console.log(userId)
    const userAnimal = await handleRememberAnimals();
    console.log(userAnimal)
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

    for (let i = 0; i < 4; i++) {
      const randomIndex = Math.floor(Math.random() * rememberAnimals.length);
      selectedAnimals.push(rememberAnimals[randomIndex]);
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

    rememberAllContainer.innerHTML += `
   <button class="remember-button" id="remember-animal-button"> Confrim </button>
  `;
    const animalButton = document.getElementById("remember-animal-button");
    let selectedAnimal;
    console.log(animalButton)

    animalButton.addEventListener("click", () => {
      const radio = document.querySelector(
        'input[name="animal-choose"]:checked'
      );
     
      if (radio) {
        console.log("anan")
        selectedAnimal = rememberAnimals.find((animal) => animal.id === parseInt(radio.id.split("-")[1]));
        resolve(selectedAnimal);
      } else {
        reject("No animals selected");
      }
    });
  });
};

const handleRememberNumbers = () => {
  return new Promise((resolve, reject) => {
    const rememberAllContainer = document.getElementById(
      "remember-button-container"
    );
    rememberAllContainer.innerHTML = ` <div class="sign-in-remember-container" id="remember-container"></div>`;
    const rememberContainer = document.getElementById("remember-container");
    const signUpContainer = document.getElementById("sign-up-container");
    rememberContainer.innerHTML = "";

    let randomNumbers = [];

    for (let i = 0; i < 4; i++) {
      randomNumbers.push(Math.floor(Math.random() * 100) + 1);
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
    const numberButton = document.getElementById("remember-number-button");
    let selectedNumber;

    numberButton.addEventListener("click", () => {
      const radio = document.querySelector(
        'input[name="number-choose"]:checked'
      ); 
      if (radio) {
        selectedNumber = randomNumbers.find((number) => number === parseInt(radio.id.split("-")[1]));
        rememberAllContainer.style.display = "none";
        signUpContainer.style.display = "block";
        resolve(selectedNumber);
      } else {
        reject("No numbers selected");
      }
    });
  });
};

handleKeepLogin();
