import { Command } from "./command.js";

export class Inventory extends Command {
    constructor() {
        super("INVENTAR", "Zobrazi obsah hracovho batohu.");
    }

    exec(game) {
        let main = $("main");
        if (game.inventory.items.length === 0) {
            main.append("Batoh je prázdny.</br>");
        } else {
            main.append("V batohu máš:</br>");
            let ul = $("<ul>");
            for (let item of game.inventory.items) {
                ul.append(`<li>${item._name}</li>`);
            }
            main.append(ul);
        }
    }
}
