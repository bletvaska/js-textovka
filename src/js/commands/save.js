import { Command } from "./command.js";

export class Save extends Command {
    constructor() {
        super("ULOZ", "Ulozi aktualny stav hry.");
    }

    exec(game) {
        let main = $("main");

        // if no save name is provided
        if (typeof this._param === "undefined") {
            main.append("Neviem, do akého savepointu chceš hru uložiť.</br>");
            return;
        }

        // if such savepoint exists, then quit
        if (this._param in localStorage) {
            main.append("Savepoint s týmto názvom už existuje.</br>");
            return;
        }

        // save
        const history = JSON.stringify(game.history);
        localStorage.setItem(this._param, history);

        main.append("Hra bola úspešne uložená.</br>");
    }
}
