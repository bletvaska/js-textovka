let main = $('main');
let input = $('input');

function showRoom(room){
    main.append('<p>');
    main.append(room.description + '</br>');
    main.append('Možné východy:');
    main.append('<ul>');
    for(let i = 0; i < room.exits.length; i++){
        main.append('<li>' + room.exits[i] + '</li>');
    }
    main.append('</ul></p>');
}

let world = {
    bernolak: {
        name: 'bernolak',
        description: 'Nachadzas sa v skoliacej miestnosti Anton Bernolak (bez Antona Bernolaka). Volne pohodene pocitace a svietiaci projektor nevestia nic dobre.',
        exits: ['kuchynka']
    },

    kuchynka: {
        name: 'kuchynka',
        description: 'Vitaj v kuchynke neobmedzenych v mikrovlnke pripravovanych pochutin. Ti narocnejsi si mozu vybrat aj nieco z dnesnej ponuky chladnicky.',
        exits: ['bernolak', 'toalety']
    },

    toalety: {
        name: 'toalety',
        description: 'Vošiel si do pánskych toaliet. Do nosa ti vrazila opojná vôňa osivežujúceho prostriedku. "Už nikdy inde", pomyslel si si.',
        exits: ['kuchynka']
    }
}

let currentRoom = 'bernolak';

showRoom(world[currentRoom]);

$('input').on('keyup', function (event) {
    if (event.keyCode === 13) {
        let command = input.val().trim();
        main.append('<p>&gt; ' + command + '</p>');

        switch (command.toUpperCase()) {
            case 'O HRE': {
                main.append('<p>Tuto mocnu pecku vytvoril peckovy javastripter mire(c) z kosi(c) 2018.</p>');
                break;
            }

            case 'ROZHLIADNI SA': {
                showRoom(world[currentRoom]);
                break;
            }

            default: {
                command = command.toLowerCase();
                if(world[currentRoom].exits.indexOf(command) > -1){
                    currentRoom = command;
                    showRoom(world[currentRoom]);
                }else{
                    main.append('<p>Taký príkaz nepoznám.</p>');
                }
            }
        }

        input.val('');
    }
});
