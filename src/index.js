import { createLayout } from "./layout";
import { checkState } from "./responsive";

createLayout();
// document.getElementById("current-location-button").click();
checkState(window.matchMedia("(max-width: 1250px)"));