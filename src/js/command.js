function Command(name, description) {
    this.name = name;
    this.description = description;
    this.param = null;
}

const cmdAbout = new Command("O HRE", "Vypise informacie o hre.");
cmdAbout.exec = function() {
    let main = $("main");
    main.append(
        "<p>Tuto mocnu pecku vytvoril peckovy javastripter mire(c) z kosi(c) 2018.</p>"
    );
};

const cmdLookAround = new Command(
    "ROZHLIADNI SA",
    "Vypise informacie o miestnosti."
);
cmdLookAround.exec = function(game) {
    game.world[game.currentRoom].showRoom();
};

const cmdInventory = new Command("INVENTAR", "Zobrazi obsah hracovho batohu.");
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

export { cmdAbout, cmdLookAround, cmdInventory };
