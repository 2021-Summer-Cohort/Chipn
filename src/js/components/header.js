import * as ACCOUNT from "./account";
import nav from "./nav";

const headerContent = document.querySelector("#site-header");

export default function header() {
    headerContent.appendChild(ACCOUNT.createAccountDiv());
    headerContent.appendChild(nav());
    headerContent.appendChild(document.createElement("hr"));
    ACCOUNT.populateAccountDiv();
    // ACCOUNT.displayAccountForms();
}