import { About } from "./commands/about.js";
import { LookAround } from "./commands/lookaround.js";
import { Inventory } from "./commands/inventory.js";
import { Describe } from "./commands/describe.js";
import { TakeItem } from "./commands/takeitem.js";
import { DropItem } from "./commands/dropitem.js";
import { UseItem } from "./commands/useitem.js";

class Parser {
    constructor() {
        this.commands = [
            new About(),
            new Inventory(),
            new LookAround(),
            new Describe(),
            new TakeItem(),
            new DropItem(),
            new UseItem()
        ];
    }
    parse(line) {
        const inputLine = line.trim().toUpperCase();

        for (const cmd of this.commands) {
            if (inputLine.startsWith(cmd._name)) {
                cmd._param = inputLine.split(`${cmd._name} `)[1];
                return cmd;
            }
        }
        return null;
    }
}

export { Parser };
