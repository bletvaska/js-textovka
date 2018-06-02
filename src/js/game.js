import { Room } from "./room.js";
import { automat } from "./items/automat.js";
import { cup } from "./items/cup.js";
import { telefen } from "./items/telefen.js";

// game object, which defines the game itself
let Game = function() {
    this.currentRoom = "bernolak";
    this.inventory = {
        capacity: 3,
        items: [telefen]
    };
};

Game.prototype.world = {
    bernolak: new Room(
        "bernolak",
        "Nachadzas sa v skoliacej miestnosti Anton Bernolak (bez Antona Bernolaka). Volne pohodene pocitace a svietiaci projektor nevestia nic dobre.",
        ["kuchynka"],
        [cup, automat]
    ),
    kuchynka: new Room(
        "kuchynka",
        "Vitaj v kuchynke neobmedzenych v mikrovlnke pripravovanych pochutin. Ti narocnejsi si mozu vybrat aj nieco z dnesnej ponuky chladnicky.",
        ["bernolak", "toalety"]
    ),
    toalety: new Room(
        "toalety",
        'Vošiel si do pánskych toaliet. Do nosa ti vrazila opojná vôňa osivežujúceho prostriedku. "Už nikdy inde", pomyslel si si.',
        ["kuchynka"]
    )
};

export { Game };
