let main = $('main');
let input = $('input');

main.append('<p>Nachadzas sa v skoliacej miestnosti Anton Bernolak (bez Antona Bernolaka). Volne pohodene pocitace a svietiaci projektor nevestia nic dobre.</p>');

$('input').on('keyup', function(event){
    if(event.keyCode === 13){
        let command = input.val().trim();
        main.append('<p>&gt; ' + command + '</p>');

        switch (command.toUpperCase()) {
            case 'O HRE': {
                main.append('<p>Tuto mocnu pecku vytvoril peckovy javastripter mire(c) z kosi(c) 2018.</p>');
                break;
            }
        
            case 'KUCHYNKA': {
                main.append('<p>Vitaj v kuchynke neobmedzenych v mikrovlnke pripravovanych pochutin. Ti narocnejsi si mozu vybrat aj nieco z dnesnej ponuky chladnicky.</p>');
                break;
            }
        
            case 'BERNOLAK': {
                main.append('<p>Nachadzas sa v skoliacej miestnosti Anton Bernolak (bez Antona Bernolaka). Volne pohodene pocitace a svietiaci projektor nevestia nic dobre.</p>');
                break;
            }
        
            default: {
                main.append('<p>Tam sa neda ist.</p>');
            }
        }

        input.val('');
    }
});
