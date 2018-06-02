import { Command } from "./command.js";

let useItem = new Command("POUZI", "Pouzije zvoleny predmet.");

useItem.exec = function(game) {
    let main = $("main");
    let name = this.param;
    let room = game.world[game.currentRoom];
    let inventory = game.inventory;

    // if no name is provided
    if (typeof name === "undefined") {
        main.append("Neviem, aký predmet chceš použiť.</br>");
    } else {
        // search for an item in room items
        let item = room.items.find(function(item) {
            if (item.name.toUpperCase() === name) {
                return item;
            }
        });

        // if not found
        if (typeof item === "undefined") {
            main.append("Taký predmet tu nikde nevidím.</br>");
            return;
        }

        // if (!("use" in item))
        if (item.features.indexOf("usable") < 0) {
            main.append("Tento predmet sa nedá použiť.</br>");
            return;
        }

        // use item
        item.use(game);
    }
};

export { useItem };
