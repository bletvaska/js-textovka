import { Command } from "./command.js";

let lookAround = new Command("ROZHLIADNI SA", "Vypise opis miestnosti.");

lookAround.exec = function(game, clear = true) {
    let room = game.world[game.currentRoom];
    room.showRoom(clear);
};

export { lookAround };
