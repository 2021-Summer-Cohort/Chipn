import { getCookie } from "../utilities/cookie";
import {updateStuff} from "../utilities/api-actions";

export function displayUpdateForm() {
    let userEmail = getCookie("UserEmail")
    const updateForm = `
        <p class='text-danger' id='login-response'>Update your information below. You may enter your current password or chose a new one.</p>
        <label for="UpdateAccount_Email">Email: </label>
        <input type="email" id="UpdateAccount_Email" value=${userEmail} />
        <label for="UpdateAccount_Password">Password: </label>
        <input type="password" id="UpdateAccount_Password" />
        <button id="update-cancel">Cancel</button>
        <button id="update-submit">Submit</button>
    `;
    return updateForm;
}

export function setupUpdateForm() {
    const UpdateAccount_Submit=document.getElementById("update-submit");
    const UpdateAccount_Cancel=document.getElementById("update-cancel");

    UpdateAccount_Submit.addEventListener("click", function(){
        updateAccount_Submit();
        location.reload();
    });
    UpdateAccount_Cancel.addEventListener("click", function(){
        location.reload();
    });
 }

export function updateAccount_Submit() {
    const UpdateAccount_Email=document.getElementById("UpdateAccount_Email");
    const UpdateAccount_Password=document.getElementById("UpdateAccount_Password");

    let RequestBody = {
        Email: UpdateAccount_Email.value,
        Password: UpdateAccount_Password.value,
    };
    updateStuff(RequestBody);
}
