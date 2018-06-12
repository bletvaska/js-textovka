function Item(name, description, features = []) {
    this.name = name;
    this.description = description;
    this.features = features;
}

Item.prototype.use = function(game) {
    $("main").append("Tento predmet sa nedá použiť.");
};

export const itemCup = new Item(
    "salka",
    "Fialová šálka s nápisom NESS. Úplne ideálna na kávej.",
    ["movable"]
);

export const itemPhone = new Item(
    "telefen",
    "Mobilný telefón značky Samsung. Aj s podvozkom.",
    ["movable", "usable"]
);

export const itemCoffeMachine = new Item(
    "automat na kavu",
    "Veľký automat na kávu. Malé a veľké espresso je zdarma, ostatné musíš zacvakať. Vyzerá, že by ešte mohol fungovať.",
    ["usable"]
);

itemCoffeMachine.use = function(game) {
    $("main").append("automat sa zapol a zacal chrcat.");
};
