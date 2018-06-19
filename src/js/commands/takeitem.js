import { Command } from "./command.js";

export class TakeItem extends Command {
    constructor() {
        super("VEZMI", "Vezme predmet z miestnosti a vloží ho do batohu.");
    }

    exec(game) {
        const main = $("main");

        // if no name is provided
        if (typeof this._param === "undefined") {
            main.append("Neviem, aký predmet chceš vziať.</br>");
        } else {
            const room = game.currentRoom;

            // search for an item in room items
            let name = this._param;
            let item = room._items.find(function(item) {
                if (item._name.toUpperCase() === name) {
                    return item;
                }
            });

            // if not found
            if (typeof item === "undefined") {
                main.append("Taký predmet tu nikde nevidím.</br>");
                return;
            }

            // if full game.inventory
            if (game.inventory.capacity <= game.inventory.items.length) {
                main.append("Batoh je plný.</br>");
                return;
            }

            // take item
            game.inventory.items.push(item);
            room._items.splice(room._items.indexOf(item), 1);

            main.append(`Do batohu si vlozil predmet ${item._name}</br>`);
        }
    }
}
