import { Command } from "./command.js";

let about = new Command("O HRE", "Zobrazi informacie o hre.");

about.exec = function() {
    let main = $("main");
    main.append(
        "Tuto mocnu pecku vytvoril peckovy javastripter mire(c) z kosi(c) 2018.</br>"
    );
};

export { about };
