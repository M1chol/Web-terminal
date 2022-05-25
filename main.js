var history = document.getElementById("history");
var input = document.getElementById("input");
var path = document.getElementById("path");
var user = "m1-all\\guest> ";
var used = [];
title1 = [
    "&nbsp;&nbsp;&nbsp;__  ______    ___   __   __                  __",
    "&nbsp;&nbsp;/  |/  <  /___/ _ | / /  / /    ______ _  ___/ /",
    "&nbsp;/ /|_/ // /___/ __ |/ /__/ /__  / __/  ' \\/ _  /",
    "/_/  /_//_/   /_/ |_/____/____/  \\__/_/_/_/\\_,_/",
    'Welcome to m1-all terminal start by checking "help" ',
    '<br>'
    ]

path.innerHTML = user;
loopLines(title1,"orange")

input.addEventListener("keypress", function (event) {
    if (event.key == "Enter") {
        console.log("Executing", input.value);
        addLine(user + input.value, "no-anim");
        command(input.value);
        input.value = "";
    }
});


function command(cmd) {
    switch (cmd.toLowerCase()) {
        case '':
            break;
        case 'help':
            loopLines(help_prt)
            break;
        case 'clear':
            document.getElementById('history').innerHTML = '';
            break;
        case 'about':
            addLine('Website made by Michał Kozłowski as portfolio, check contact for more', "txtcmd");
            break;
        case 'projects':
            addLine('Full list of projects: [RC autonomus car, Spudgun, and more]', "txtcmd");
            break;
        case 'contact':
            addLine('Insta: www.instagram.com/kolega__michal/, Git: github.com/M1chol')
            break;
        case 'title':
            loopLines(title1, "orange")
            break;

        default:
            addLine('<span class=\"red">Command not found, type "help" for list of commands</span>', "txtcmd");

    }
    console.log(input.value, "executed")
}

function addLine(text, style) {
    var txt = document.createElement("p");
    txt.innerHTML = text;
    txt.className = style;
    document.getElementById('history').appendChild(txt);
    
}
function loopLines(text, style) {
    text.forEach(function (item) {
        var t = "";
        for (let i = 0; i < item.length; i++) {
            if (item.charAt(i) == " " && item.charAt(i + 1) == " ") {
                t += "&nbsp;&nbsp;";
                i++;
            } else {
                t += item.charAt(i);
            }
        }
        addLine(t, style);
    });
}
