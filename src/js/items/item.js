export class Item {
    constructor(name, description, features = []) {
        this._name = name;
        this._description = description;
        this._features = features;
    }
    use(game) {
        $("main").append("Tento predmet sa nedá použiť.");
    }
}
