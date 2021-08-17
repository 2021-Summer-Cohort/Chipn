import {accountURL} from "../utilities/api-actions";
import {setCookie} from "../utilities/cookie";
import {displayWelcome} from "./welcome";

export function displaySignupForm() {
    const signupForm = `
        <h1> YOU MUST BE 21 OR OLDER TO PLAY!</h1>
        <p class='text-danger' id='login-response'>Please sign up to enter the casino.</p>
        <label for="SignupAccount_UserName">User Name: </label>
        <input type="text" id="SignupAccount_UserName" />
        <label for="SignupAccount_Email">Email: </label>
        <input type="email" id="SignupAccount_Email" />
        <label for="SignupAccount_Age">Age: </label>
        <input type="number" id="SignupAccount_Age" />
        <label for="SignupAccount_Password">Password: </label>
        <input type="password" id="SignupAccount_Password" />

        <input type="hidden" id="SignupAccount_ChipCount" value="0">

        <button id="signup-cancel">Cancel</button>
        <button id="signup-submit">Submit</button>
        </div>
    `;
    return signupForm;
}

export function setupSignupForm() {
    const SignupAccount_Submit=document.getElementById("signup-submit");
    const SignupAccount_Cancel=document.getElementById("signup-cancel");

    SignupAccount_Submit.addEventListener("click",function(){
        signupAccountSubmit();
    });
    SignupAccount_Cancel.addEventListener("click",function(){
        location.reload();
    });
}

export function signupAccountSubmit() {
    
    const SignupAccount_UserName=document.getElementById("SignupAccount_UserName");
    const SignupAccount_Email=document.getElementById("SignupAccount_Email");
    const SignupAccount_Age=document.getElementById("SignupAccount_Age");
    const SignupAccount_Password=document.getElementById("SignupAccount_Password");
    const SignupAccount_ChipCount=document.getElementById("SignupAccount_ChipCount");

    if(SignupAccount_Age.value < 21) {
        document.getElementById("login-response").innerHTML = "Sorry, but you must be 21 or old to play.";
        return;
    }

    let RequestBody = {
        UserName: SignupAccount_UserName.value,
        Email: SignupAccount_Email.value,
        Age: SignupAccount_Age.value,
        Password: SignupAccount_Password.value,
        ChipCount: SignupAccount_ChipCount.value
    };
    fetch(accountURL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(RequestBody)
    }).then(response => response.json()).then(data => {
        if(data.status == "422") {
            document.getElementById("login-response").innerHTML = "Your user name is not available. Please try a different one.";
        } else {
            setCookie("UserId", data.id, .1);
            displayWelcome();
        }
    });
}
