import { Command } from "./command.js";

export class About extends Command {
    constructor() {
        super("O HRE", "Vypise informacie o hre.");
    }

    exec(game) {
        let main = $("main");
        main.append(
            "<p>Tuto mocnu pecku vytvoril peckovy javastripter mire(c) z kosi(c) 2018.</p>"
        );
    }
}
