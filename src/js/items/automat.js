import { Item } from "./item.js";

let automat = new Item(
    "automat",
    "Automat na teplú kávu. A ďalšie fajnoty, ako je napríklad studená káva.",
    ["usable"]
);

automat.use = function(game) {
    let main = $("main");
    main.append("Miesas si kavu.</br>");
};

export { automat };
