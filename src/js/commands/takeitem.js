import { Command } from "./command.js";

let takeItemCmd = new Command("VEZMI", "Vezme predmet z miestnosti do batohu");
takeItemCmd.exec = function(game) {
    let main = $("main");
    let name = this.param;
    let room = game.world[game.currentRoom];
    let inventory = game.inventory;

    // if no name is provided
    if (typeof name === "undefined") {
        main.append("Neviem, aký predmet chceš vziať.</br>");
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

        // if not movable
        if (item.features.indexOf("movable") < 0) {
            main.append("Tento predmet sa nedá vziať.</br>");
            return;
        }

        // if full backpack
        if (inventory.capacity <= inventory.items.length) {
            main.append("Batoh je plný.</br>");
            return;
        }

        // take item
        inventory.items.push(item);
        room.items.splice(room.items.indexOf(item), 1);

        main.append(`Do batohu si vlozil predmet ${item.name}</br>`);
    }
};

export { takeItemCmd };
