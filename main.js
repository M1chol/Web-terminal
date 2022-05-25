var history = document.getElementById("history");
var input = document.getElementById("input");

input.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        console.log("Executing", input.value);
        command(input.value);
        input.value = "";
    }
});


function command(cmd) {
    switch (cmd.toLowerCase()) {
        case 'help':
            addLine('Full list of commands: [help, clear, about, projects, contact]');
            break;
        case 'clear':
            document.getElementById('history').innerHTML = '';
            break;
        case 'about':
            addLine('Website made by Michal Kozlowski as portfolio, check contact for more');
            break;
        case 'projects':
            addLine('Full list of projects: [RC autonomus car, Spudgun, and more]');
            break;
        case 'contact':
            addLine('GitHub: https://github.com/M1chol')
            break;

        default:
            addLine('Command not found type "help" for list of commands');

    }
    console.log(input.value, "executed")
}

function addLine(text) {
    txt = document.createElement("p");
    textNode = document.createTextNode(text);
    txt.appendChild(textNode);
    document.getElementById('history').appendChild(txt);
    
}
