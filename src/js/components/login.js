import {loginURL} from "../api/actions";
import {setCookie} from "../utilities/cookie";

export function displayLoginForm(){
    const loginForm = `
    <div id="not-signed-in">
    <h1> MUST BE 21+ TO PLAY!</h1>
        <p class='text-danger' id='loginResponse'></p>
        <label for="login-username">Username: </label>
        <input type="text" id="LoginAccount_UserName" />
        <label for="login-password">Password: </label>
        <input type="password" id="LoginAccount_Password" />
        <button id="login-cancel">Cancel</button>
        <button id="login-submit">Submit</button>
    </div>
    `;
    return loginForm;
}

export function loginAccount_Submit()
{
    let RequestBody={
        UserName:LoginAccount_UserName.value,
        Password:LoginAccount_Password.value
    };

    console.log(RequestBody);
    console.log(LoginAccount_UserName.value);
    console.log(LoginAccount_Password.value);

    fetch(loginURL,{
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify(RequestBody)
    }).then(response => response.json()).then(data => {
        console.log("returned data: " + data);
        console.dir(data);
        if(data.status == "404"){
            document.getElementById("loginResponse").innerHTML = "Your username or password does not match our records.";
        }else{
            //do something with Cookies
            //setCookie("UserName", data.userName, .1);
            setCookie("UserId", data.id, .1);
            location.reload();
        }
    });
}