import { cmdAbout, cmdInventory, cmdLookAround } from "./command.js";

function Parser() {
    this.commands = [cmdAbout, cmdInventory, cmdLookAround];
}

Parser.prototype.parse = function(line) {
    const inputLine = line.trim().toUpperCase();

    for (const cmd of this.commands) {
        if (inputLine.startsWith(cmd.name)) {
            return cmd;
        }
    }

    return null;
};

export { Parser };
