import { accountURL } from "../api/actions";
import { setCookie } from "../utilities/cookie";
import {UpdateStuff} from "../api/actions";

export function displayUpdateForm() {
    // const signupForm = document.createElement("form");
    // signupForm.id = "signup-form";
    // signupForm.style.display = "absolute";
    // signupForm.innerHTML 
    const updateForm = `
    <div id="account-update">
        <label for="update-email">Email: </label>
        <input type="email" id="UpdateAccount_Email" />
        <label for="update-password">Password: </label>
        <input type="password" id="UpdateAccount_Password" />
        <button id="update-cancel">Cancel</button>
        <button id="update-submit">Submit</button>
        </div>
    `;
    return updateForm;
}
 export function setupUpdateForm(){
    const UpdateAccount_Email=document.getElementById("UpdateAccount_Email");
    const UpdateAccount_Password=document.getElementById("UpdateAccount_Password");
    const UpdateAccount_Cancel=document.getElementById("update-cancel");
    const UpdateAccount_Submit=document.getElementById("update-submit");

    UpdateAccount_Cancel.addEventListener("click", function(){
 location.reload();
    });
    UpdateAccount_Submit.addEventListener("click", function(){
        updateAccount_Submit();
        location.reload();

    });
 }
export function updateAccount_Submit(){


    let RequestBody = {
        Email: UpdateAccount_Email.value,
        Password: UpdateAccount_Password.value,
    };
     UpdateStuff(RequestBody);
}