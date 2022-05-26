var history = document.getElementById("history");
var input = document.getElementById("input");
var path = document.getElementById("path");
var user_default = "m1-all\\guest> ";
var user = user_default;
var hijacked = false;
var hijacker_id = "none";

title1 = [
    "&nbsp;&nbsp;&nbsp;__  ______    ___   __   __                  __",
    "&nbsp;&nbsp;/  |/  <  /___/ _ | / /  / /    ______ _  ___/ /",
    "&nbsp;/ /|_/ // /___/ __ |/ /__/ /__  / __/  ' \\/ _  /",
    "/_/  /_//_/   /_/ |_/____/____/  \\__/_/_/_/\\_,_/",
    'Welcome to m1-all terminal start by checking "help" ',
    '<br>'
]

//startin look
path.innerHTML = user;
loopLines(title1, "orange");

//handle inputs
input.addEventListener("keypress", function (event) {
    if (event.key == "Enter") {
        console.log("Executing", input.value);
        addLine(user + input.value, "no-anim");
        if (hijacked) {
            execute(hijacker_id)
            resetLine();
        } else {
            command(input.value);
        }
        window.scrollTo(0, document.body.offsetHeight);
    }
});

//available commands
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
            addLine('Website made by Michal Kozlowski as portfolio, check contact for more');
            break;
        case 'projects':
            loopLines(projects)
            break;
        case 'contact':
            addLine('Insta: www.instagram.com/kolega__michal/, Git: github.com/M1chol')
            break;
        case 'title':
            loopLines(title1, "orange")
            break;
        case 'syntax':
            inputLine("Input new syntax:", "syntax-change")
            break;
        case 'project-view':
            addLine('Type project number to inspect, 0 to abort')
            inputLine("Inspect project: ", "inspect-project")
            break;
        default:
            addLine('Command not found, type "help" for list of commands', "red");

    }
    console.log(input.value, "executed")
    window.scrollTo(0, document.body.offsetHeight);
}

//executing input based commands
function execute(cmd) {
    switch (cmd) {
        case 'syntax-change':
            if (input.value == '') {
                path.innerHTML = user_default;
                user = user_default;
            }
            else {
                path.innerHTML = input.value;
                user = input.value + ' ';
            }
            break;

        case 'inspect-project':
            if (parseInt(input.value) == 0) {
                break;
            }
            if (parseInt(input.value) < 0) {
                addLine("Wow, you are accually testing for edge cases", "red")
                break;
            }
            if (parseInt(input.value) > project_more.length) {
                addLine("There in no such project", "red")
                break;
            }
            addLine(project_more[parseInt(input.value) - 1])
            break;

        default:
            addLine("Function could not find enything to execute")
            break;
    }
    resetLine
}

//print one line
function addLine(text, style) {
    setTimeout(function () {
        var txt = document.createElement("p");
        txt.innerHTML = text;
        txt.className = style;
        document.getElementById('history').appendChild(txt);
        input.value = "";
    },200)
}

//loop through lines and printing them
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

//print input line
function inputLine(text, variable) {
    path.innerHTML = text;
    hijacker_id = variable;
    hijacked = true;
}

function resetLine() {
    hijacked = false;
    path.innerHTML = user;
}