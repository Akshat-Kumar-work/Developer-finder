//Variables
const searchbar = document.querySelector(".searchbar-container");
const profilecontainer = document.querySelector(".profile-container");
const root = document.documentElement.style; //global variables ko fetch kar rhe hai
const get = (elements) => document.getElementById(elements);
const url = "https://api.github.com/users/";
const noresults = get("no-results");
const btnmode = get("btn-mode");
const modetext = get("mode-text");
const modeicon = get("mode-icon");
const btnsubmit = get("submit");
const input = get("input");
const avatar = get("avatar");
const userName = get("name");
const user = get("user");   
const date = get("date");
const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const bio = get("bio");
const repos = get("repos");
const followers = get("followers");
const following = get("following");
const user_location = get("location");
const page = get("page");
const twitter = get("twitter");
const company = get("company");
let darkMode = false;

// Event Listeners

//search vale button par click karne par function call karo agar input empty nahi hai 
btnsubmit.addEventListener("click", function () {
  if (input.value !== "") {
    getUserData(url + input.value);
  }
});


//input par keydown event listener lagaya hai agaar key jo press kari hai enter key  hai toh function call kardo
input.addEventListener(
  "keydown",
  function (e) {
    if (e.key == "Enter") {
      if (input.value !== "") {
        getUserData(url + input.value);
      }
    }
  },
  false
);

//y event no search vale element ko hide karta hai
input.addEventListener("input", function () {
  noresults.style.display = "none";
});


//y click hone par mode ko change karta hai
btnmode.addEventListener("click", function () {
  if (darkMode == false) {
    darkModeProperties();
  } else {
    lightModeProperties();
  }
});

// Functions
    
//API CALL
async function getUserData(gitUrl) { //in this gitUrl parameter contain the url + input string

try{
    const response = await fetch(gitUrl);
    const data = await response.json();
    updateProfile(data);
    console.log(data)
}

catch(err){
throw err;
}
    

}


//RENDER user interface m render krwata hai data ko 
function updateProfile(data) {
  
//agar data milgya hai not found nahi hai 
  if (data.message !== "Not Found") { 
    noresults.style.display = "none"; //hide krdo no result vale element ko 

    function checkNull(param1, param2) { 
      if (param1 === "" || param1 === null) { //agar object k andar jo data hai vo khali hai ya null hai 
        param2.style.opacity = 0.5;  //toh data jis element m show hoga usko hide krdo
        param2.previousElementSibling.style.opacity = 0.5;  
        return false; 
      }
      //jab data available hoga toh true return krega aur jab true return hoga tab element m data dalega
       else {
        return true;
      }
    }

    avatar.src = data.avatar_url;
    userName.innerText =   data?.name //data.name === null ? data.login : data.name;
    user.innerText = `@${data.login}`;
    user.href = `${data.html_url}`;
    datesegments = data.created_at.split("T").shift().split("-");
    date.innerText = `Joined ${datesegments[2]} ${months[datesegments[1] - 1]} ${datesegments[0]}`;
    bio.innerText = data.bio == null ? "This profile has no bio" : `${data.bio}`;
    repos.innerText = `${data.public_repos}`;
    followers.innerText = `${data.followers}`;
    following.innerText = `${data.following}`;
    user_location.innerText = checkNull(data.location, user_location) ? data.location : "Not Available";
    page.innerText = checkNull(data.blog, page) ? data.blog : "Not Available";
    page.href = checkNull(data.blog, page) ? data.blog : "#";
    twitter.innerText = checkNull(data.twitter_username, twitter) ? data.twitter_username : "Not Available";
    twitter.href = checkNull(data.twitter_username, twitter) ? `https://twitter.com/${data.twitter_username}` : "#";
    company.innerText = checkNull(data.company, company) ? data.company : "Not Available";
    searchbar.classList.toggle("active");
    profilecontainer.classList.toggle("active");
  }

   else {
    noresults.style.display = "block";
  }
}



//SWITCH TO DARK MODE - activateDarkMode()
function darkModeProperties() {
  //chaning global variables values 
  root.setProperty("--lm-bg", "#141D2F");
  root.setProperty("--lm-bg-content", "#1E2A47");
  root.setProperty("--lm-text", "white");
  root.setProperty("--lm-text-alt", "white");
  root.setProperty("--lm-shadow-xl", "rgba(70,88,109,0.15)");
  modetext.innerText = "LIGHT";
  modeicon.src = "./assets/images/sun-icon.svg";
  root.setProperty("--lm-icon-bg", "brightness(1000%)");
  darkMode = true;
  console.log("darkmode changed to " + darkMode);
  localStorage.setItem("dark-mode", true);  console.log("setting dark mode to false");

  console.log("setting dark mode to true");

}

//SWITCH TO LIGHT MODE - activateLightMode()
function lightModeProperties() {
    //chaning global variables values 
  root.setProperty("--lm-bg", "#F6F8FF");
  root.setProperty("--lm-bg-content", "#FEFEFE");
  root.setProperty("--lm-text", "#4B6A9B");
  root.setProperty("--lm-text-alt", "#2B3442");
  root.setProperty("--lm-shadow-xl", "rgba(70, 88, 109, 0.25)");
  modetext.innerText = "DARK";
  modeicon.src = "./assets/images/moon-icon.svg";
  root.setProperty("--lm-icon-bg", "brightness(100%)");
  darkMode = false;
  console.log("darkmode changed to " + darkMode);

  localStorage.setItem("dark-mode", false);
  console.log("setting dark mode to false");
}


//INITIALISE UI , starting m y function chalana hai
function init() {
  //initialise dark-mode variable to false;
  //darkMode = true -> dark mode enable karna h 
  //darMode = false -> light mode enable karna h 
  darkMode = false;

  //HW
// const prefersDarkMode = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;

//check karo hmari local storage m dark-mode naam ki koi chiz hai
  const value = localStorage.getItem("dark-mode");

  //agar dark mode naam ki koi chiz nahi hait toh light mode ko chlne do
  if(value === null) {
    console.log("null k andar");
    localStorage.setItem("dark-mode", darkMode);
    lightModeProperties();
  }
  else if(value == "true") {
    console.log("truer k andar");
    darkModeProperties();
  }
  else if(value == "false") {
    console.log("false k andar");
    lightModeProperties();
  }


  //by default, pranaygupta ki info show krre h UI pr
  getUserData(url + "akshat-kumar-work");
}

init();