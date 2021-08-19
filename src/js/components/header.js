import {createAccountDiv, populateAccountDiv} from "./account";
import nav from "./nav";

const headerContent = document.querySelector("#site-header");

export default function header() {
    headerContent.appendChild(nav());
    headerContent.appendChild(createAccountDiv());
    populateAccountDiv();
    // ACCOUNT.displayAccountForms();
}
