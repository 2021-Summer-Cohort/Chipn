import {populateAccountAside} from "./account";
import nav from "./nav";

const headerContent = document.querySelector("#site-header");
// const accountContent = document.querySelector("#account");

function createPageTitleDiv() {
    let pageTitleDiv = document.createElement("div");
    pageTitleDiv.id = "page-title";
    pageTitleDiv.innerText = " ";
    return pageTitleDiv;
}

export default function header() {
    headerContent.appendChild(nav());
    headerContent.appendChild(createPageTitleDiv());
    populateAccountAside();
    // ACCOUNT.displayAccountForms();
}
