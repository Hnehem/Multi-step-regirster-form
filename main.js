const container = document.getElementById("container");
const form = document.getElementById("form");
const userName = document.getElementById("name");
const email = document.getElementById("email");
const button = document.querySelector(".button");
const interests = document.querySelector("section");
const preview = document.querySelector(".last");

let userData = {
  Name: "",
  Email: "",
  interests: [],
};

let counter = 1;
let infoName = false;
let infoEmail = false;

userName.addEventListener("input", handleNameInput); 
email.addEventListener("input", handleEmailInput);
form.addEventListener("submit", handleFormSubmit);
container.addEventListener("click", handleInterestsClick); //handleInterest on line 56...

function handleNameInput(event) {
  infoName = event.target.value || false;
}

function handleEmailInput(event) {
  let validEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  let isValid = validEmail.test(event.target.value);
  
  infoEmail = isValid ? event.target.value : false;
}

function handleFormSubmit(event) {
  event.preventDefault();
  
  if (infoName && infoEmail) {
    userData["Name"] = infoName;
    userData["Email"] = infoEmail;
    
    button.type = "button";
    button.removeAttribute("form");
    button.addEventListener("click", buttonClick); //buttonClick on line 66...
    buttonClick();
  } else {
    addWarning(infoName, infoEmail);
  }
}

let selected = false; /**used in error message dealing at line 143 and in 
the buttonClick function*/
function handleInterestsClick(event) {
  let target = event.target.closest(".option");
  if (!target) return;

  target.id = "selected";

  userData.interests.push(target.textContent);
  selected = true;
}

function buttonClick() {
  if (counter == 0) return;
  if (counter == 1) {
    form.style.display = "none";
    interests.classList.toggle("section");
    counter++;
    stepper();
  } else if (counter == 2) {
    if (!selected) {
      addWarning(undefined, undefined, selected);
      return;
    }
    button.textContent = "Confirm";

    displayUserData(userData); //line 91...
    counter++;
    stepper();
  } else if (counter == 3) {
    alert("✅ Success");
    // counter == 0;
    location.reload()
  }
}

const user = document.querySelector(".user");
const userInterests = document.querySelector(".topics");
const warning = document.querySelector(".warning");

function displayUserData(data) {
  interests.classList.toggle("section");
  preview.classList.toggle("section");

  for (let key in data) {
    if (typeof data[key] !== "object") {
      let userInfo = document.createElement("p");
      let info = document.createElement("span");

      userInfo.textContent = key + ": ";
      info.textContent = data[key];

      userInfo.append(info);
      user.append(userInfo);
    } else {
      let list = document.createElement("ul");

      for (let elem of data[key]) {
        let item = document.createElement("li");
        item.textContent = elem;
        list.append(item);
        userInterests.append(list);
      }
    }
  }
}
//this ones are controllers for secondary tasks...

//stepper code
const stepperCounter = document.querySelector(".counter");
stepperCounter.textContent = counter;

let icons = document.querySelectorAll(".step-icon");
let step = icons[0];
let currentStep = document.createElement("div");

step.classList.add("selected-icon");
currentStep.classList.add("icon");
step.append(currentStep);

function stepper() {
  stepperCounter.textContent = counter;
  currentStep.remove();

  step = icons[counter - 1];
  step.classList.add("selected-icon");
  step.append(currentStep);
}

//Error message dealing...
let timeOut;
function addWarning(name, email, selected) {
  if (name == false && email == false) {
    warning.textContent = "Add a valid name and email.";
  } else if (name == false) {
    warning.textContent = "You must enter a name";
  } else if (email == false) {
    warning.textContent = "Use a valid email. Ex: example@gmail.com";
  } else if (selected == false) {
    warning.textContent = "You must select at least one option";
  }
  clearTimeout(timeOut);
  timeOut = setTimeout(() => {
    warning.textContent = "";
  }, 3000);
}


