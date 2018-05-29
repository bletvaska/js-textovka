let main = $("main");
let input = $("input");

function showRoom(room) {
    main.html("<p>");
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

function describeItem(room, name) {
    // if no name is provided
    if (typeof name === "undefined") {
        main.append("Nerozumiem, čo chceš preskúmať.");
    } else {
        // search for an item in room items
        for (let item of room.items) {
            if (item.name.toUpperCase() === name) {
                main.append(item.description);
                return;
            }
        }

        // if not found
        main.append("Taký predmet tu nikde nevidím.");
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

showRoom(world[currentRoom]);

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
        } else if (command.startsWith("PRESKUMAJ")) {
            let param = command.split("PRESKUMAJ ")[1];
            describeItem(world[currentRoom], param);
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
