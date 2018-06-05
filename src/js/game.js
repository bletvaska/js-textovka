import { Room } from "./room.js";

const game = {
    world: {
        bernolak: new Room(
            "bernolak",
            "Nachadzas sa v skoliacej miestnosti Anton Bernolak (bez Antona Bernolaka). Volne pohodene pocitace a svietiaci projektor nevestia nic dobre.",
            ["kuchynka"],
            [
                {
                    name: "salka",
                    description:
                        "Fialová šálka s nápisom NESS. Úplne ideálna na kávej."
                }
            ]
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
    },

    inventory: {
        capacity: 3,
        items: [
            {
                name: "telefen",
                description: "Mobilný telefón značky Samsung. Aj s podvozkom."
            }
        ]
    },

    currentRoom: "bernolak"
};

export { game };
