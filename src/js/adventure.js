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
                main.append("Taky prikaz nepoznam.");
            } else {
                cmd.exec(game);
            }

            input.val("");
        }
    });
});
