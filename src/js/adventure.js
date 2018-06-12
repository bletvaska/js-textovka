import { game } from "./game.js";
import { Parser } from "./parser.js";

$(document).ready(function() {
    let main = $("main");
    let input = $("input");

    game.world[game.currentRoom].showRoom(false);
    const parser = new Parser();

    $("input").on("keyup", function(event) {
        if (event.keyCode === 13) {
            let command = input.val().trim();
            main.append(`<p>&gt; ${command}</p>`);

            let cmd = parser.parse(command);
            if (cmd === null) {
                command = command.toLowerCase();
                if (game.world[game.currentRoom].exits.indexOf(command) > -1) {
                    game.currentRoom = command;
                    game.world[game.currentRoom].showRoom();
                } else {
                    main.append("<p>Taký príkaz nepoznám.</p>");
                }
            } else {
                cmd.exec(game);
            }

            input.val("");
        }
    });
});
