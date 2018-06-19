import { Item } from "./item.js";

export class Cup extends Item {
    constructor() {
        super(
            "salka",
            "Fialová šálka s nápisom NESS. Úplne ideálna na kávej.",
            ["movable"]
        );
    }

    use(game) {
        const main = $("main");

        if (this.isFull === true) {
            main.append("Káva? Fuuuuuuj.");
            return;
        }

        // find coffe machine in the room/inventory
        const items = game.currentRoom._items.concat(game.inventory.items);

        // find coffe machine
        const item = items.find(function(item) {
            if (item._name == "automat na kavu") {
                return item;
            }
        });

        // if no coffe machine is in the room
        if (typeof item === "undefined") {
            main.append(
                "Priložil si si šálku k ústam a zhlboka si do seba sŕkol dávku vzduchu, ktorý sa v šálke nachádza. Je prázdna."
            );
            return;
        }

        // use coffe machine
        main.append(
            "Šálku si vložil do automatu na kávu, postláčal si niekoľko gombíkov a povzbudzujúco si tresol automat po chrbte. Po tom, ako si ustúpil krok vzad, začal automat plniť šálku horúcou kávou. Tesne predtým, ako začala káva cez šálku pretekať, sa automat pokazil."
        );

        // update salka
        this.name = "salka s kavou";
        this.description =
            "Šálka po okraj naplnená horúcou kávou. Už len z tej vône je ti divne...";
        this.isFull = true;

        // update coffe machine
        item.isBroken = true;
        item._name = "pokazeny kavomat";
        item._description =
            "Automat na kávu. Bliká na ňom červená dióda s nálepkou - POKAZENÉ.";
    }
}
