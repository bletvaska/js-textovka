import { Command } from "./command.js";

export class Describe extends Command {
    constructor() {
        super("PRESKUMAJ", "Opíše zvolený predmet.");
    }

    exec(game) {
        const main = $("main");

        if (typeof this._param === "undefined") {
            main.append("Nerozumiem, čo chceš preskúmať.");
        } else {
            let room = game.currentRoom;

            // search for an item in room items
            for (let item of room._items.concat(game.inventory.items)) {
                if (item._name.toUpperCase() === this._param) {
                    main.append(item._description);
                    return;
                }
            }

            // if not found
            main.append("Taký predmet tu nikde nevidím.");
        }
    }
}
