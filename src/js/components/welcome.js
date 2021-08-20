export function displayWelcome() {
    const accountAside = document.getElementById("account");

    accountAside.className = "welcome";

    accountAside.innerHTML =`
        <div class="welcome-message">
            <p>Welcome to Chip'n! You can learn more <a href="/about/">about the developers</a> or <a href="/games/">start playing</a> now. Please game responsibly.</p>
            <button id="welcome-enter">Enter Chip'n</button>
        </div>
    `;

    const enterButton=document.getElementById("welcome-enter");

    enterButton.addEventListener("click",function(){
        location.reload();
    });
}
