export default function nav() {
    let navBar = document.createElement("nav");
    navBar.id = "site-nav";
    navBar.innerHTML = `
    <hr />
    <div id="navBox">

        <ul id="navStyle1">
            <li>
                <img id = "navImage" src="/images/navArt.png"/>
            </li>
        </ul>
        
        <ul id="navbar1">

            <li id="homeNav">
                <button onclick=" location.href='/index.html'" id="homeNavImage"> </button> 
            </li> 
            <li id="aboutNav">
                <button onclick=" location.href='/about/index.html'" id="aboutNavImage"> </button> 
            </li> 
            <li>
                <img id="navStyleImage" src="/images/navStyle2.png"/> 
            </li>
           
        </ul>
       
        <ul id="navbar2">
            <li>
                <img id = "logo" src="/images/navLogo.png" />
            </li>
            <li id="blackjackNav">
                <button onclick=" location.href='/games/blackjack/blackjack.html'" id="blackjackNavImage"> </button> 
            </li>
        </ul>
        
        <ul id="navbar3">
            <li id="crapsNav">
                <button onclick=" location.href='/games/craps/craps.html'" id="crapsNavImage"> </button> 
            </li>
            
            <li id="slotsNav">
                <button onclick=" location.href='/games/slots/slots.html'" id="slotsNavImage"> </button> 
            </li>
            <li>
                <img id="navStyleImage" src="/images/navStyle.png"/> 
            </li>
        </ul>
        <ul id="navStyle2">
            <li>
                <img id = "navImage" src="/images/navArt.png" />
            </li>
        </ul>
    </div>
    <hr />
    `;
    return navBar;
}