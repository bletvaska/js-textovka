function Room(name, description, exits, items = []) {
    this.name = name;
    this.description = description;
    this.exits = exits;
    this.items = items;
}

Room.prototype.showRoom = function(clear = true) {
    let main = $("main");

    if (clear === true) {
        main.html("");
    }

    main.append("<p>");

    // show description
    main.append(`${this.description}</br>`);

    // show exits
    main.append("Možné východy:");
    let ul = $("<ul>");
    for (let exit of this.exits) {
        ul.append(`<li>${exit}</li>`);
    }
    main.append(ul);

    // show items
    if (this.items.length === 0) {
        main.append("Nevidíš tu nič zvláštne.");
    } else {
        let menu = $("#examine-menu");
        main.append("Vidíš:");
        let ul = $("<ul>");
        this.items.forEach(function(item) {
            ul.append(`<li>${item.name}</li>`);

            // update examine-menu
            let button = $('<button class="dropdown-item" type="button">');
            button.html(item.name);
            button.on("click", function() {
                let input = $("input").val(`preskumaj ${$(this).text()}`);

                // fire event
                let event = $.Event("keyup");
                event.keyCode = 13;
                input.trigger(event);
            });
            menu.append(button);
        });
        main.append(ul);
    }

    main.append("</p>");
};

export { Room };
