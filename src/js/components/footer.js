const footerContent = document.querySelector("#site-footer");
const todaysDate = new Date(Date.now());

export default function footer() {
    footerContent.innerHTML = `
    <hr/>
    <footer style="text-align:center">
    &copy; ${todaysDate.getFullYear()} LIT MINISTRIES!!!
    </footer>
    `;
}
