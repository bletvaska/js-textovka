import { Game } from "./game.js";
import { Parser } from "./parser.js";

$(document).ready(function() {
    let main = $("main");
    let input = $("input");

    const game = new Game();
    game.currentRoom.showRoom(false);
    const parser = new Parser();

    $("input").on("keyup", function(event) {
        if (event.keyCode === 13) {
            let command = input.val().trim();
            main.append(`<p>&gt; ${command}</p>`);

            let cmd = parser.parse(command);
            if (cmd === null) {
                command = command.toLowerCase();
                if (game.currentRoom._exits.indexOf(command) > -1) {
                    // save to history first
                    game.history.push(command);

                    // move
                    game.currentRoom = game.world[command];
                    game.currentRoom.showRoom();
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
