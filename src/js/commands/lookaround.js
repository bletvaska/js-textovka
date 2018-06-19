import { Command } from "./command.js";

export class LookAround extends Command {
    constructor() {
        super("ROZHLIADNI SA", "Vypise informacie o miestnosti.");
    }

    exec(game) {
        game.currentRoom.showRoom();
    }
}
