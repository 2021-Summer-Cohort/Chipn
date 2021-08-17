export function displayWelcome() {
    const accountDiv = document.getElementById("account");

    accountDiv.innerHTML =`
        <p>Welcome to chip'n</p>
        <button id="enter" class="account-button">Enter Chip'n</button>
    `;
    accountDiv.className = "welcome";

    const enterButton=document.getElementById("enter");

    enterButton.addEventListener("click",function(){
        location.reload();
    });
}
