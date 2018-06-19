export class Command {
    constructor(name, description) {
        this._name = name;
        this._description = description;
        this._param = null;
    }

    exec(game) {
        throw "Not yet implemented.";
    }
}
