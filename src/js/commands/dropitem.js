import { Command } from "./command.js";

export class DropItem extends Command {
    constructor() {
        super("POLOZ", "Vyberie predmet z batohu a položí ho do miestnosti.");
    }

    exec(game) {
        const main = $("main");

        // if no name is provided
        if (typeof this._param === "undefined") {
            main.append("Neviem, aký predmet chceš položiť.</br>");
        } else {
            const room = game.currentRoom;

            // search for an item in inventory items
            const name = this._param;
            let item = game.inventory.items.find(function(item) {
                if (item._name.toUpperCase() === name) {
                    return item;
                }
            });

            // if not found
            if (typeof item === "undefined") {
                main.append("Taký predmet pri sebe nemáš.</br>");
                return;
            }

            // drop item
            game.inventory.items.splice(game.inventory.items.indexOf(item), 1);
            room._items.push(item);

            main.append(`Do miestnosti si položil predmet ${item._name}</br>`);
        }
    }
}
