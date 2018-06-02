import { Command } from "./command.js";

let examineItem = new Command("PRESKUMAJ", "Preskuma zvoleny predmet.");

examineItem.exec = function(game) {
    let main = $("main");
    let name = this.param;
    let room = game.world[game.currentRoom];

    // if no name is provided
    if (typeof name === "undefined") {
        main.append("Nerozumiem, čo chceš preskúmať.<br>");
    } else {
        // search for an item in room items
        for (let item of room.items.concat(game.inventory.items)) {
            if (item.name.toUpperCase() === name) {
                main.append(`${item.description}<br>`);
                return;
            }
        }

        // if not found
        main.append("Taký predmet tu nikde nevidím.<br>");
    }
};

export { examineItem };
