import { Command } from "./command.js";
import { Parser } from "../parser.js";

export class Load extends Command {
    constructor() {
        super("NAHRAJ", "Načíta uložený stav hry na základe názvu savepointu.");
    }

    exec(game) {
        let main = $("main");

        // if no savepoint is provided
        if (typeof this._param === "undefined") {
            main.append("Neviem, z akého savepointu chceš hru nahrať.</br>");
            return;
        }

        const savepoint = this._param;

        // if no such savepoint, then quit
        // if (this._param in localStorage == false) {
        //     main.append("Savepoint s týmto názvom neexistuje.</br>");
        //     return;
        // }

        // load
        // const value = localStorage.getItem(this._param);
        // const history = JSON.parse(value);

        // load from back4app
        var settings = {
            async: true,
            crossDomain: true,
            url: `https://parseapi.back4app.com/classes/history?where={"save":"${savepoint}"}`,
            method: "GET",
            headers: {
                "X-Parse-Application-Id":
                    "B2eLnipNaHfcbzMVYIY5vK0plPRaTu6uOytfzhvQ",
                "X-Parse-REST-API-Key":
                    "lqQh5N21jgpiy9CzUsZqg5SzaJSnzSAkMTJr76fo"
            }
        };

        $.ajax(settings)
            .done(function(response) {
                const results = response["results"];

                if (results["length"] == 0) {
                    main.append("Taký savepoint neexistuje.</br>");
                    return;
                }

                // parse history
                const history = JSON.parse(response["results"][0]["history"]);

                // reset
                game.initGame();
                const parser = new Parser();

                // process
                for (let line of history) {
                    const cmd = parser.parse(line);

                    if (cmd === null) {
                        line = line.toLowerCase();
                        // save to history first
                        game.history.push(line);

                        // move
                        game.currentRoom = game.world[line];
                    } else {
                        cmd.exec(game);
                    }
                }

                game.currentRoom.showRoom();
                main.append("Hra bola úspešne načítaná.</br>");
            })
            .fail(function(response) {
                console.log(response.status);
                console.log(response.responseText);
                main.append("Hru sa nepodarilo načítať.</br>");
            });
    }
}
