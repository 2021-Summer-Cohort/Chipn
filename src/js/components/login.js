import {loginURL} from "../utilities/api-actions";
import {setCookie} from "../utilities/cookie";
import {displayWelcome} from "./welcome";

export function displayLoginForm() {
    const loginForm = `
        <h1> YOU MUST BE 21 OR OLDER TO PLAY!</h1>
        <p class='text-danger' id='login-response'>Please log in to enter the casino.</p>
        <label for="LoginAccount_UserName">User Name: </label>
        <input type="text" id="LoginAccount_UserName" />
        <label for="LoginAccount_Password">Password: </label>
        <input type="password" id="LoginAccount_Password" />
        <button id="login-cancel">Cancel</button>
        <button id="login-submit">Submit</button>
    `;
    return loginForm;
}

export function setupLoginForm() {
    const LoginAccount_Submit=document.getElementById("login-submit");
    const LoginAccount_Cancel=document.getElementById("login-cancel");

    LoginAccount_Submit.addEventListener("click",function(){
        loginAccountSubmit();
    });
    LoginAccount_Cancel.addEventListener("click",function(){
        location.reload();
    });
}

export function loginAccountSubmit() {
    const LoginAccount_UserName = document.getElementById("LoginAccount_UserName");
    const LoginAccount_Password = document.getElementById("LoginAccount_Password");

    let RequestBody={
        UserName:LoginAccount_UserName.value,
        Password:LoginAccount_Password.value
    };
    fetch(loginURL,{
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify(RequestBody)
    }).then(response => response.json()).then(data => {
        if(data.status == "404"){
            document.getElementById("login-response").innerHTML = "Your user name or password does not match our records.";
        }else{
            setCookie("UserId", data.id, .1);
            displayWelcome();
        }
    });
}
