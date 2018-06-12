import {
    cmdAbout,
    cmdInventory,
    cmdLookAround,
    cmdDescribe,
    cmdTakeItem,
    cmdDropItem,
    cmdUseItem
} from "./command.js";

function Parser() {
    this.commands = [
        cmdAbout,
        cmdInventory,
        cmdLookAround,
        cmdDescribe,
        cmdTakeItem,
        cmdDropItem,
        cmdUseItem
    ];
}

Parser.prototype.parse = function(line) {
    const inputLine = line.trim().toUpperCase();

    for (const cmd of this.commands) {
        if (inputLine.startsWith(cmd.name)) {
            cmd.param = inputLine.split(`${cmd.name} `)[1];
            return cmd;
        }
    }

    return null;
};

export { Parser };
