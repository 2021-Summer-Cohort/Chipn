import {displayLoginForm, setupLoginForm} from "./login";
import {displaySignupForm, setupSignupForm} from "./signup";
import {displayUpdateForm, setupUpdateForm} from "./update";
import * as API from "../utilities/api-actions";
import {getCookie, setCookie, deleteCookie} from "../utilities/cookie";
import {isNotEmpty} from "../utilities/conditional";

let accountId;

// export function createAccountDiv() {
//     let accountDiv = document.createElement("div");
//     accountDiv.id = "account";
//     accountDiv.innerText = " ";
//     return accountDiv;
// }

export function populateAccountAside() {
    accountId = getCookie("UserId");
    const accountAside = document.getElementById("account");

    if(isNotEmpty(accountId))
    {
        accountAside.className = "logged-in";

        let gameInstructions = document.createElement("div");
        gameInstructions.id = "game-instructions";
        gameInstructions.innerText = " ";
        accountAside.appendChild(gameInstructions);

        let userInfoContainer = document.createElement("div");
        userInfoContainer.id = "user-info-container";
        userInfoContainer.innerText = " ";
        accountAside.appendChild(userInfoContainer);

        const userInfoContainerDiv = document.getElementById("user-info-container");

        let userInfo = document.createElement("div");
        userInfo.id = "user-info";
        userInfo.innerText = " ";
        userInfoContainerDiv.appendChild(userInfo);

        const userInfoDiv = document.getElementById("user-info");

        userInfoDiv.innerHTML =`
            <div id="account-username-container">User: 
                <span id="account-username"> </span>
            </div>
            <div id="account-chips-container">Chips: 
                <span id="account-chips"> </span>
                <span id="chips-change"> </span>
            </div>
            <button id="add-chips">Add More Chips</button>
            <button id="account-logout" class="account-button">Logout</button>
            <button id="account-update" class="account-button">Update</button>
        `;

        const usernameSpan = document.getElementById("account-username");
        const chipsSpan = document.getElementById("account-chips");

        const addChipsButton = document.getElementById("add-chips");
        addChipsButton.style.display = "none";

        const logoutButton = document.getElementById("account-logout");
        const updateButton = document.getElementById("account-update");

        API.getAccount(accountId, data => {
            if(data.chipCount <= 5) {
                let addChipsMessage = data.chipCount <= 0 ? 'You are out of chips!' : data.chipCount + " (running low...)";
                usernameSpan.innerText = data.userName;
                chipsSpan.innerText = addChipsMessage;
                addChipsButton.style.display = "inline";

                // userInfoDiv.innerHTML =`
                //     <span id="account-username">${data.userName}</span>
                //     <span id="account-chips">${message}</span>
                //     <button id="add-chips">Add More Chips</button>
                //     <button id="account-logout" class="account-button">Logout</button>
                //     <button id="account-update" class="account-button">Update</button>
                // `;

                // const addChipsButton = document.getElementById("add-chips");
                // const logoutButton = document.getElementById("account-logout");
                // const updateButton = document.getElementById("account-update");

                addChipsButton.addEventListener("click", () => {
                    let chipsToAdd = 100;
                    API.modifyChipCount(chipsToAdd);
                    // userInfoDiv.innerHTML =`
                    //     <span id="account-username">${data.userName}</span>
                    //     <span id="account-chips">${data.chipCount + chipsToAdd}</span>
                    //     <button id="account-logout" class="account-button">Logout</button>
                    //     <button id="account-update" class="account-button">Update</button>
                    // `;

                    // document.getElementById("account-username").innerText = data.userName;
                    chipsSpan.innerText = data.chipCount + chipsToAdd;  // "data" AVAILABLE?
                    addChipsButton.style.display = "none";
                });
                logoutButton.addEventListener("click", () => {
                    deleteCookie("UserId");
                    location.reload();
                });
                updateButton.addEventListener("click", () => {
                    accountAside.innerHTML = displayUpdateForm();
                    setupUpdateForm();
                });
            } else {
                usernameSpan.innerText = data.userName;
                chipsSpan.innerText = data.chipCount;

                // userInfoDiv.innerHTML =`
                //     <span id="account-username">${data.userName}</span>
                //     <span id="account-chips">${data.chipCount}</span>
                //     <button id="account-logout" class="account-button">Logout</button>
                //     <button id="account-update" class="account-button">Update</button>
                // `;

                // const logoutButton = document.getElementById("account-logout");
                // const updateButton = document.getElementById("account-update");

                logoutButton.addEventListener("click", () => {
                    deleteCookie("UserId");
                    location.reload();
                });
                updateButton.addEventListener("click", () => {
                    accountAside.innerHTML = displayUpdateForm();
                    setupUpdateForm();
                });
            }

            setCookie("UserEmail", data.email, .1);
            setCookie("ChipCount", data.chipCount, .1);
        });
    } else
    {
        accountAside.className = "logged-out";

        accountAside.innerHTML = `
            <div class="signup-login">
                <h1>YOU MUST BE 21 OR OLDER TO PLAY!</h1>
                <p>Please sign up or log in to enter the casino.</p>
                <button id="account-signup">Sign Up</button>
                <button id="account-login">Log In</button>
            </div>
        `;

        const signupButton = document.getElementById("account-signup");
        const loginButton = document.getElementById("account-login");

        signupButton.addEventListener('click', () => {
            accountAside.innerHTML = displaySignupForm();
            setupSignupForm();
        });
        loginButton.addEventListener('click', () => {
            accountAside.innerHTML = displayLoginForm();
            setupLoginForm();
        });

    }
}
