export function Room(name, description, exits = [], items = []) {
    this.name = name;
    this.description = description;
    this.items = items;
    this.exits = exits;
}

Room.prototype.showRoom = function(clear = true) {
    let main = $("main");

    if (clear === true) {
        main.html("");
    }

    main.append("<p>");
    main.append(`${this.description}</br>`);

    main.append("Možné východy:");
    let ul = $("<ul>");
    for (let exit of this.exits) {
        ul.append(`<li>${exit}</li>`);
    }
    main.append(ul);

    if (this.items.length === 0) {
        main.append("Nevidíš tu nič zvláštne.");
    } else {
        main.append("Vidíš:");
        let ul = $("<ul>");
        this.items.forEach(function(item) {
            ul.append(`<li>${item.name}</li>`);
        });
        main.append(ul);
    }

    main.append("</p>");
};

// export { Room };
