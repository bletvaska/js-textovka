import { Command } from "./command.js";

export class Restart extends Command {
    constructor() {
        super("RESTART", "Spustí hru znova.");
    }

    exec(game) {
        const main = $("main");
        game.initGame();
        game.currentRoom.showRoom();
        main.append("Hra bola úspešne reštartovaná.</br>");
    }
}
