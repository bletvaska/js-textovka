import { game } from "./game.js";
import { Parser } from "./parser.js";

$(document).ready(function() {
    let main = $("main");
    let input = $("input");

    // function showInventory(inventory) {
    //     if (inventory.items.length === 0) {
    //         main.append("Batoh je prázdny.</br>");
    //     } else {
    //         main.append("V batohu máš:</br>");
    //         let ul = $("<ul>");
    //         for (let item of inventory.items) {
    //             ul.append(`<li>${item.name}</li>`);
    //         }
    //         main.append(ul);
    //     }
    // }

    function describeItem(room, name, inventory) {
        // if no name is provided
        if (typeof name === "undefined") {
            main.append("Nerozumiem, čo chceš preskúmať.");
        } else {
            // search for an item in room items
            for (let item of room.items.concat(inventory.items)) {
                if (item.name.toUpperCase() === name) {
                    main.append(item.description);
                    return;
                }
            }

            // if not found
            main.append("Taký predmet tu nikde nevidím.");
        }
    }

    function takeItem(room, name, inventory) {
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

            // if full game.inventory
            if (inventory.capacity <= inventory.items.length) {
                main.append("Batoh je plný.</br>");
                return;
            }

            // take item
            inventory.items.push(item);
            room.items.splice(room.items.indexOf(item), 1);

            main.append(`Do batohu si vlozil predmet ${item.name}</br>`);
        }
    }

    function dropItem(room, name, inventory) {
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
    }

    game.world[game.currentRoom].showRoom(false);
    const parser = new Parser();

    $("input").on("keyup", function(event) {
        if (event.keyCode === 13) {
            let command = input.val().trim();
            main.append(`<p>&gt; ${command}</p>`);

            let cmd = parser.parse(command);
            if (cmd === null) {
                main.append("Taky prikaz nepoznam.");
            } else {
                cmd.exec(game);
            }

            // command = command.toUpperCase();
            // if (command === "O HRE") {
            //     main.append(
            //         "<p>Tuto mocnu pecku vytvoril peckovy javastripter mire(c) z kosi(c) 2018.</p>"
            //     );
            // } else if (command === "ROZHLIADNI SA") {
            //     game.world[game.currentRoom].showRoom();
            // } else if (command === "INVENTAR") {
            //     showInventory(game.inventory);
            // } else if (command.startsWith("PRESKUMAJ")) {
            //     let param = command.split("PRESKUMAJ ")[1];
            //     describeItem(
            //         game.world[game.currentRoom],
            //         param,
            //         game.inventory
            //     );
            // } else if (command.startsWith("VEZMI")) {
            //     let param = command.split("VEZMI ")[1];
            //     takeItem(game.world[game.currentRoom], param, game.inventory);
            // } else if (command.startsWith("POLOZ")) {
            //     let param = command.split("POLOZ ")[1];
            //     dropItem(game.world[game.currentRoom], param, game.inventory);
            // } else {
            //     command = command.toLowerCase();
            //     if (game.world[game.currentRoom].exits.indexOf(command) > -1) {
            //         game.currentRoom = command;
            //         game.world[game.currentRoom].showRoom();
            //     } else {
            //         main.append("<p>Taký príkaz nepoznám.</p>");
            //     }
            // }

            input.val("");
        }
    });
});
