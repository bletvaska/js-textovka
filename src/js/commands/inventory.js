import { Command } from "./command.js";

let inventory = new Command("INVENTAR", "Vypíše obsah hráčovho batohu.");
inventory.exec = function(game) {
    let main = $("main");

    if (game.inventory.items.length === 0) {
        main.append("Batoh je prázdny.</br>");
    } else {
        main.append("V batohu máš:</br>");
        let ul = $("<ul>");
        for (let item of game.inventory.items) {
            ul.append(`<li>${item.name}</li>`);
        }
        main.append(ul);
    }
};

export { inventory };
