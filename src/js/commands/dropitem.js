import { Command } from "./command.js";

let dropItemCmd = new Command("POLOZ", "Položí predmet z batohu do miestnosti");

dropItemCmd.exec = function(game) {
    let main = $("main");
    let name = this.param;
    let inventory = game.inventory;
    let room = game.world[game.currentRoom];

    // if no name is provided
    if (typeof name === "undefined") {
        main.append("Neviem, aký predmet chceš položiť.</br>");
    } else {
        // search for an item in inventory items
        let item = inventory.items.find(function(item) {
            if (item.name.toUpperCase() === name) {
                return item;
            }
        });

        // if not found
        if (typeof item === "undefined") {
            main.append("Taký predmet pri sebe nemáš.</br>");
            return;
        }

        // drop item
        inventory.items.splice(inventory.items.indexOf(item), 1);
        room.items.push(item);

        main.append(`Do miestnosti si položil predmet ${item.name}</br>`);
    }
};

export { dropItemCmd };
