var _getAccount; // getAccount(accountId, callback)
var _setChipCount; // SetChipCount(700);  Overwrites
var _modifyChipCount; // ModifyChipCount(-30);  Adds
var _updateStuff; // UpdateStuff({Email:"email@email",ChipCount:30});

var _getCookie; // getCookie(name)
var _setCookie; // setCookie(name, value, days)
var _deleteCookie; // deleteCookie(name)

function addPageTitle(image) {
    const pageTitleDiv = document.getElementById("page-title");
    pageTitleDiv.innerHTML = `
        <div id="titleBox">
            <img class="titleStyle" src="/images/titleStyle.png" />
            <img id="titleImage" src="/images/${image}" />
            <img class="titleStyle" src="/images/titleStyle.png" />
        </div>
        <hr class="title-line" />
    `;
}

function addInstructions(content) {
    const gameInstructionsDiv = document.getElementById("game-instructions");

    gameInstructionsDiv.innerHTML = content;
}