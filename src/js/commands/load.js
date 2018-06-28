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

        // if no such savepoint, then quit
        if (this._param in localStorage == false) {
            main.append("Savepoint s týmto názvom neexistuje.</br>");
            return;
        }

        // load
        const value = localStorage.getItem(this._param);
        const history = JSON.parse(value);

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
    }
}
