import { Parser } from "./parser.js";
import { Game } from "./game.js";

// get ready!
$(document).ready(function() {
    let main = $("main");
    let input = $("input");

    let game = new Game();
    let parser = new Parser();

    // when command was entered
    $("input").on("keyup", function(event) {
        // on Enter was pressed
        if (event.keyCode === 13) {
            // read line
            let line = input.val().trim();
            main.append(`&gt; ${line}</br>`);

            // parse command
            let cmd = parser.parse(line);
            if (cmd != null) {
                cmd.exec(game);
            } else {
                line = line.toLowerCase();
                if (line in game.world) {
                    game.currentRoom = line;
                    parser.parse("rozhliadni sa").exec(game);
                } else {
                    main.append("Taký príkaz nepoznám.</br>");
                }
            }

            input.val("");
        }
    });

    // look around button
    $("button:nth-child(6)").on("click", function(event) {
        parser.parse("rozhliadni sa").exec(game);
    });

    // inventory button
    $("button:nth-child(7)").on("click", function(event) {
        main.append(`&gt; inventar</br>`);
        parser.parse("inventar").exec(game);
    });

    // show current room
    parser.parse("rozhliadni sa").exec(game, false);
});
