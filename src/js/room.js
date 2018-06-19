export class Room {
    constructor(name, description, exits = [], items = []) {
        this._name = name;
        this._description = description;
        this._items = items;
        this._exits = exits;
    }

    showRoom(clear = true) {
        let main = $("main");

        if (clear === true) {
            main.html("");
        }

        main.append("<p>");
        main.append(`${this._description}</br>`);
        main.append("Možné východy:");

        let ul = $("<ul>");
        for (let exit of this._exits) {
            ul.append(`<li>${exit}</li>`);
        }
        main.append(ul);
        if (this._items.length === 0) {
            main.append("Nevidíš tu nič zvláštne.");
        } else {
            main.append("Vidíš:");
            let ul = $("<ul>");
            this._items.forEach(function(item) {
                ul.append(`<li>${item._name}</li>`);
            });
            main.append(ul);
        }
        main.append("</p>");
    }
}
