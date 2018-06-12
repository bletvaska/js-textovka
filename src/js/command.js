function Command(name, description) {
    this.name = name;
    this.description = description;
    this.param = null;
}

export const cmdAbout = new Command("O HRE", "Vypise informacie o hre.");
cmdAbout.exec = function() {
    let main = $("main");
    main.append(
        "<p>Tuto mocnu pecku vytvoril peckovy javastripter mire(c) z kosi(c) 2018.</p>"
    );
};

export const cmdLookAround = new Command(
    "ROZHLIADNI SA",
    "Vypise informacie o miestnosti."
);
cmdLookAround.exec = function(game) {
    game.world[game.currentRoom].showRoom();
};

export const cmdDescribe = new Command("PRESKUMAJ", "Opíše zvolený predmet.");
cmdDescribe.exec = function(game) {
    const main = $("main");

    if (typeof this.param === "undefined") {
        main.append("Nerozumiem, čo chceš preskúmať.");
    } else {
        let room = game.world[game.currentRoom];

        // search for an item in room items
        for (let item of room.items.concat(game.inventory.items)) {
            if (item.name.toUpperCase() === this.param) {
                main.append(item.description);
                return;
            }
        }

        // if not found
        main.append("Taký predmet tu nikde nevidím.");
    }
};

export const cmdInventory = new Command(
    "INVENTAR",
    "Zobrazi obsah hracovho batohu."
);
cmdInventory.exec = function(game) {
    let main = $("main");
    if (game.inventory.items.length === 0) {
        main.append("Batoh je prázdny.</br>");
    } else {
        main.append("V batohu máš:</br>");
        let ul = $("<ul>");
        for (let item of game.inventory.items) {
            ul.append(`<li>${item.name}</li>`);
        }
        main.append(ul);
    }
};

export const cmdTakeItem = new Command(
    "VEZMI",
    "Vezme predmet z miestnosti a vloží ho do batohu."
);
cmdTakeItem.exec = function(game) {
    const main = $("main");

    // if no name is provided
    if (typeof this.param === "undefined") {
        main.append("Neviem, aký predmet chceš vziať.</br>");
    } else {
        const room = game.world[game.currentRoom];

        // search for an item in room items
        let name = this.param;
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
        if (game.inventory.capacity <= game.inventory.items.length) {
            main.append("Batoh je plný.</br>");
            return;
        }

        // take item
        game.inventory.items.push(item);
        room.items.splice(room.items.indexOf(item), 1);

        main.append(`Do batohu si vlozil predmet ${item.name}</br>`);
    }
};

export const cmdDropItem = new Command(
    "POLOZ",
    "Vyberie predmet z batohu a položí ho do miestnosti."
);
cmdDropItem.exec = function(game) {
    const main = $("main");

    // if no name is provided
    if (typeof this.param === "undefined") {
        main.append("Neviem, aký predmet chceš položiť.</br>");
    } else {
        const room = game.world[game.currentRoom];

        // search for an item in inventory items
        const name = this.param;
        let item = game.inventory.items.find(function(item) {
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
        game.inventory.items.splice(game.inventory.items.indexOf(item), 1);
        room.items.push(item);

        main.append(`Do miestnosti si položil predmet ${item.name}</br>`);
    }
};

// export { cmdAbout, cmdLookAround, cmdInventory, cmdDescribe };
