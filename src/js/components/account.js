import * as FETCH from "../api/actions";
import {displayLoginForm,loginAccount_Submit} from "./login";
import {displaySignupForm,createAccount_Submit} from "./signup";
import {getCookie, setCookie, deleteCookie} from "../utilities/cookie";

import {GetChipCount,SetChipCount,ModifyChipCount,UpdateStuff} from "../api/actions";

let accountId;

export function createAccountDiv() {
    let accountDiv = document.createElement("div");
    accountDiv.id = "account";
    accountDiv.style.float = "right";
    accountDiv.innerHTML = " ";
    return accountDiv;
    
}

export function populateAccountDiv() {
    accountId = getCookie("UserId");
    const accountDiv = document.getElementById("account");

    if(accountId == null || accountId == undefined || accountId == "")
    {
        accountDiv.innerHTML = `
            <button id="account-login">Log In</button>
            <button id="account-signup">Sign Up</button>
        `;
    }
    else
    {
        FETCH.getAccount(accountId, data => {
            accountDiv.innerHTML =`
            Name: ${data.userName}<br />
            Chip Count: ${data.chipCount}<br />
            <button id="logout">Logout</button>
            `;
            const logoutButton = document.getElementById("logout");
            logoutButton.addEventListener("click", () => {
                deleteCookie("UserId");
                location.reload();
            });
        });
    }
}

export function displayAccountForms(){
    const accountDiv = document.getElementById("account");

    const loginButton = document.getElementById("account-login");
    const signupButton = document.getElementById("account-signup");

    if(signupButton && loginButton)
    {
        signupButton.addEventListener('click', () => {
            accountDiv.innerHTML = displaySignupForm();
            setupAccountForms();
        });

        loginButton.addEventListener('click', () => {
            accountDiv.innerHTML = displayLoginForm();
            setupLoginForms();
        });
    }
}
export function setupAccountForms()
{
    const CreateAccount_UserName=document.getElementById("CreateAccount_UserName");
    const CreateAccount_Email=document.getElementById("CreateAccount_Email");
    const CreateAccount_Age=document.getElementById("CreateAccount_Age");
    const CreateAccount_Password=document.getElementById("CreateAccount_Password");
    const CreateAccount_ChipCount=document.getElementById("CreateAccount_ChipCount");

    const CreateAccount_Submit=document.getElementById("signup-submit");
    CreateAccount_Submit.addEventListener("click",function(){
        createAccount_Submit();
    });
}
export function setupLoginForms()
{
    const LoginAccount_UserName=document.getElementById("LoginAccount_UserName");
    const LoginAccount_Password=document.getElementById("LoginAccount_Password");

    const LoginAccount_Submit=document.getElementById("login-submit");
    LoginAccount_Submit.addEventListener("click",function(){
        loginAccount_Submit();
    });
}
