import header from "./components/header";
import footer from "./components/footer";
import exports from "./utilities/exports";
// import {getCookie} from "./utilities/cookie";
/*
const startBtn = document.getElementById("control");
startBtn.addEventListener("click", function() {
});
*/
export default () => {
    header();
    footer();
    exports();
    // get_cookie = getCookie;
    // console.log("Hello");
}
// console.log("This is: " + location);
// const audio = document.getElementById("myAudio")
// const clickLit = document.getElementById("litty");
// clickLit.addEventListener("click", function () {
//     audio.play();
// });
