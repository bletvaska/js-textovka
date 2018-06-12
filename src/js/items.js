function Item(name, description) {
    this.name = name;
    this.description = description;
    this.features = [];
}

export const itemCup = new Item(
    "salka",
    "Fialová šálka s nápisom NESS. Úplne ideálna na kávej."
);

export const itemPhone = new Item(
    "telefen",
    "Mobilný telefón značky Samsung. Aj s podvozkom."
);

export const itemCoffeMachine = new Item(
    "automat na kavu",
    "Veľký automat na kávu. Malé a veľké espresso je zdarma, ostatné musíš zacvakať. Vyzerá, že by ešte mohol fungovať."
);
