import { Command } from "./command.js";

export class UseItem extends Command {
    constructor() {
        super("POUZI", "Vyberie predmet z batohu a položí ho do miestnosti.");
    }

    exec(game) {
        const main = $("main");

        // if no name is provided
        if (typeof this._param === "undefined") {
            main.append("Neviem, aký predmet chceš použiť.</br>");
        } else {
            const room = game.currentRoom;

            // search for an item in inventory and room
            const name = this._param;
            const items = game.inventory.items.concat(room._items);
            let item = items.find(function(item) {
                if (item._name.toUpperCase() === name) {
                    return item;
                }
            });

            // if not found
            if (typeof item === "undefined") {
                main.append("Taký predmet tu nikde nevidím.</br>");
                return;
            }

            // save to history first
            game.history.push(`${this._name} ${this._param}`);

            // use item
            item.use(game);
        }
    }
}
