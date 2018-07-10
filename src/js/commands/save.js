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

        // localStorage - if such savepoint exists, then quit
        // if (this._param in localStorage) {
        //     main.append("Savepoint s týmto názvom už existuje.</br>");
        //     return;
        // }

        // localStorage - save
        // const history = JSON.stringify(game.history);
        // localStorage.setItem(this._param, history);
        // main.append("Hra bola úspešne uložená.</br>");

        // back4app - if such savepoint exists, then quit

        // back4app - save
        var settings = {
            async: true,
            crossDomain: true,
            url: "https://parseapi.back4app.com/classes/history",
            method: "POST",
            headers: {
                "X-Parse-Application-Id":
                    "B2eLnipNaHfcbzMVYIY5vK0plPRaTu6uOytfzhvQ",
                "X-Parse-REST-API-Key":
                    "lqQh5N21jgpiy9CzUsZqg5SzaJSnzSAkMTJr76fo",
                "Content-Type": "application/json"
            },
            data: JSON.stringify({
                save: this._param,
                history: JSON.stringify(game.history)
            })
        };

        $.ajax(settings)
            .done(function(response) {
                console.log("Hra bola uspesne ulozena aj na back4app.");
                main.append("Hra bola úspešne uložená.</br>");
            })
            .fail(function(response) {
                console.log(response.status);
                console.log(response.responseText);
                main.append("Hru sa nepodarilo uložiť.</br>");
            });
    }
}
