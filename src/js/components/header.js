import * as ACCOUNT from "./account";
import nav from "./nav";

const headerContent = document.querySelector("#site-header");

export default function header() {
    headerContent.appendChild(nav());
    headerContent.appendChild(ACCOUNT.createAccountDiv());
    ACCOUNT.populateAccountDiv();
    // ACCOUNT.displayAccountForms();
}
