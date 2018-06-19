import {Item} from "./item.js";

export class CoffeMachine extends Item {
    constructor() {
        super(
            "automat na kavu",
            "Veľký automat na kávu. Malé a veľké espresso je zdarma, ostatné musíš zacvakať. Vyzerá, že by ešte mohol fungovať.",
            ["usable"]
        );
    }

    use(game) {
        const main = $("main");

        // check if coffe machine is not broken
        if (this.isBroken === true) {
            main.append("Automat je pokazený.");
            return;
        } else {
            main.append(
                "Stlačil si niekoľko tlačidiel, povzbudzujúco si kávomat tresol po chrbte a urobil si krok vzad. Ten zachrčal a začal vypúšťať horúcu kávu. Škoda, že ju nemáš do čoho natankovať, pomyslel si si."
            );
        }
    }
}
