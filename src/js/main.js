import header from "./components/header";
import footer from "./components/footer";
/*
const startBtn = document.getElementById("control");
startBtn.addEventListener("click", function() {
});
*/
export default () => {
    footer();
    header();
}
const audio = document.getElementById("myAudio")
const clickLit = document.getElementById("litty");
clickLit.addEventListener("click", function () {
    audio.play();
});
