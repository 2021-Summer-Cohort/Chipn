export function displayWelcome() {
    const accountDiv = document.getElementById("account");

    accountDiv.innerHTML =`
        <div class="welcome-message">
        <p id="welcome-message">Welcome to Chip'n! You can learn more <a href="/about/">about the developers</a> or <a href="/games/">start playing</a> now. Please game responsibly.</p>
        <button id="enter" class="account-button">Enter Chip'n</button>
        </div>
    `;
    accountDiv.className = "welcome";

    const enterButton=document.getElementById("enter");

    enterButton.addEventListener("click",function(){
        location.reload();
    });
}
