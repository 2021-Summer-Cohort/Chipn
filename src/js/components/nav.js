export default function nav() {
    let navBar = document.createElement("nav");
    navBar.id = "site-nav";
    navBar.innerHTML = `
    <hr />
    <div id="navBox">

        <div class="navArtContainer">
            <img class="navArt" src="/images/nav/navArt.png" />
        </div>
        
        <ul id="navColumn1">
            <li id="homeNav">
                <button onclick="location.href='/'" id="homeNavImage"> </button>
            </li> 
            <li id="aboutNav">
                <button onclick="location.href='/about/'" id="aboutNavImage"> </button>
            </li> 
            <li>
                <img class="navArrows" src="/images/nav/navArrows1.png"/> 
            </li>
        </ul>
       
        <ul id="navColumn2">
            <li>
                <img id="nav-logo" src="/images/nav/navLogo.png" />
            </li>
            <li id="blackjackNav">
                <button onclick="location.href='/games/blackjack/blackjack.html'" id="blackjackNavImage"> </button> 
            </li>
        </ul>

        <ul id="navColumn3">
            <li id="crapsNav">
                <button onclick="location.href='/games/craps/craps.html'" id="crapsNavImage"> </button> 
            </li>
            <li id="slotsNav">
                <button onclick="location.href='/games/slots/slots.html'" id="slotsNavImage"> </button> 
            </li>
            <li>
                <img class="navArrows" src="/images/nav/navArrows2.png"/> 
            </li>
        </ul>

        <div class="navArtContainer">
            <img class="navArt" src="/images/nav/navArt.png" />
        </div>

    </div>
    <hr />
    `;
    return navBar;
}
