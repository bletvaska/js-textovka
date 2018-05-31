let main = $("main");
let input = $("input");

function showInventory(backpack) {
    if (backpack.items.length === 0) {
        main.append("Batoh je prázdny.</br>");
    } else {
        main.append("V batohu máš:</br>");
        let ul = $("<ul>");
        for (let item of backpack.items) {
            ul.append(`<li>${item.name}</li>`);
        }
        main.append(ul);
    }
}

function showRoom(room, clear = true) {
    if (clear === true) {
        main.html("");
    }

    main.append("<p>");
    main.append(`${room.description}</br>`);

    main.append("Možné východy:");
    let ul = $("<ul>");
    for (let exit of room.exits) {
        ul.append(`<li>${exit}</li>`);
    }
    main.append(ul);

    if (room.items.length === 0) {
        main.append("Nevidíš tu nič zvláštne.");
    } else {
        main.append("Vidíš:");
        let ul = $("<ul>");
        room.items.forEach(function(item) {
            ul.append(`<li>${item.name}</li>`);
        });
        main.append(ul);
    }

    main.append("</p>");
}

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

let world = {
    bernolak: {
        name: "bernolak",
        description:
            "Nachadzas sa v skoliacej miestnosti Anton Bernolak (bez Antona Bernolaka). Volne pohodene pocitace a svietiaci projektor nevestia nic dobre.",
        exits: ["kuchynka"],
        items: [
            {
                name: "salka",
                description:
                    "Fialová šálka s nápisom NESS. Úplne ideálna na kávej."
            }
        ]
    },

    kuchynka: {
        name: "kuchynka",
        description:
            "Vitaj v kuchynke neobmedzenych v mikrovlnke pripravovanych pochutin. Ti narocnejsi si mozu vybrat aj nieco z dnesnej ponuky chladnicky.",
        exits: ["bernolak", "toalety"],
        items: []
    },

    toalety: {
        name: "toalety",
        description:
            'Vošiel si do pánskych toaliet. Do nosa ti vrazila opojná vôňa osivežujúceho prostriedku. "Už nikdy inde", pomyslel si si.',
        exits: ["kuchynka"],
        items: []
    }
};

let currentRoom = "bernolak";

let Backpack = {};
Backpack.capacity = 3;
Backpack.items = [
    {
        name: "telefen",
        description: "Mobilný telefón značky Samsung. Aj s podvozkom."
    }
];

showRoom(world[currentRoom], false);

$("input").on("keyup", function(event) {
    if (event.keyCode === 13) {
        let command = input.val().trim();
        main.append(`<p>&gt; ${command}</p>`);

        command = command.toUpperCase();
        if (command === "O HRE") {
            main.append(
                "<p>Tuto mocnu pecku vytvoril peckovy javastripter mire(c) z kosi(c) 2018.</p>"
            );
        } else if (command === "ROZHLIADNI SA") {
            showRoom(world[currentRoom]);
        } else if (command === "INVENTAR") {
            showInventory(Backpack);
        } else if (command.startsWith("PRESKUMAJ")) {
            let param = command.split("PRESKUMAJ ")[1];
            describeItem(world[currentRoom], param, Backpack);
        } else if (command.startsWith("VEZMI")) {
            let param = command.split("VEZMI ")[1];
            takeItem(world[currentRoom], param, Backpack);
        } else if (command.startsWith("POLOZ")) {
            let param = command.split("POLOZ ")[1];
            dropItem(world[currentRoom], param, Backpack);
        } else {
            command = command.toLowerCase();
            if (world[currentRoom].exits.indexOf(command) > -1) {
                currentRoom = command;
                showRoom(world[currentRoom]);
            } else {
                main.append("<p>Taký príkaz nepoznám.</p>");
            }
        }

        input.val("");
    }
});
