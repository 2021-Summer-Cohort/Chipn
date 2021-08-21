export function displayWelcome() {
    const accountAside = document.getElementById("account");

    accountAside.className = "welcome";

    accountAside.innerHTML =`
        <div class="welcome-message">
            <img src="/images/welcomeBlink.gif" alt="Welcome" style="width: 30vw; margin: auto;" />
            <p>Please game responsibly.</p>
            <button id="welcome-enter">Enter Chip'n</button>
        </div>
    `;

    const enterButton=document.getElementById("welcome-enter");

    enterButton.addEventListener("click",function(){
        location.reload();
    });
}
