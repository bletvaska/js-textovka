import { Command } from "./commands/command.js";

import { lookAround } from "./commands/lookaround.js";
import { takeItemCmd } from "./commands/takeitem.js";
import { dropItemCmd } from "./commands/dropitem.js";
import { examineItem } from "./commands/examineitem.js";
import { inventory } from "./commands/inventory.js";
import { about } from "./commands/about.js";
import { useItem } from "./commands/useitem.js";

let Parser = function() {
    let commands = [
        lookAround,
        about,
        examineItem,
        takeItemCmd,
        dropItemCmd,
        inventory,
        useItem
    ];

    // prepare command PRIKAZY
    let listCommands = new Command(
        "PRIKAZY",
        "Zobrazi zoznam dostupnych prikazov."
    );
    listCommands.exec = function() {
        let main = $("main");
        main.append("Zoznam dostupných príkazov:</br>");
        let ul = $("<ul>");
        for (let cmd of commands) {
            ul.append(`<li>${cmd.name}</li>`);
        }
        main.append(ul);
    };
    commands.push(listCommands);

    // prepare command POMOC
    let help = new Command("POMOC", "Zobrazi pomoc k prikazu.");
    help.exec = function() {
        let main = $("main");
        for (let cmd of commands) {
            if (cmd.name === this.param) {
                main.append(`${this.param} - ${cmd.description}<br>`);
                return;
            }
        }
        main.append(`Prikaz ${this.param} nepoznam.`);
    };
    commands.push(help);

    this.parse = function(line) {
        let lineUpperCase = line.toUpperCase();

        // get proper command
        for (let command of commands) {
            if (lineUpperCase.startsWith(command.name)) {
                command.param = lineUpperCase.split(command.name)[1].trim();
                if (command.param.length === 0) {
                    command.param = null;
                }
                return command;
            }
        }
        return null;
    };
};

export { Parser };
