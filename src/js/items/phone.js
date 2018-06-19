import { Item } from "./item.js";

export class Phone extends Item {
    constructor() {
        super("telefen", "Mobilný telefón značky Samsung. Aj s podvozkom.", [
            "movable",
            "usable"
        ]);
    }
}
