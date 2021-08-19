const footerContent = document.querySelector("#site-footer");
const todaysDate = new Date(Date.now());

export default function footer() {
    footerContent.innerHTML = `
    <hr />
    <p id="copyright-statement">
        &copy; ${todaysDate.getFullYear()} 
        <img src="/images/lit.png" alt="LIT" id="litty" width="35px" /> 
        MINISTRIES! All rights reserved, revoked, restored, and resolved. 
        No part of this website may be copied, reproduced, replicated, imitated, mimicked, aped, borrowed, stolen, heisted, purloined, cribbed, pilfered, filched, appropriated, misappropriated, or otherwise infringed upon without the express written and verbal consent of the developers. 
        For entertainment (and demonstration) purposes only. Please play responsibly.
    </p>
    <audio id="its-lit">
        <source src='/sounds/lit.mp3' type="audio/mp3" />
    </audio>
    `;
    const itsLitAudio = document.getElementById("its-lit")
    const littyImg = document.getElementById("litty");
    littyImg.addEventListener("click", function () {
        itsLitAudio.play();
    });
}
