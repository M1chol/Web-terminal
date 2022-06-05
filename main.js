var history = document.getElementById("history");
var input = document.getElementById("input");
var path = document.getElementById("path");
var root = document.documentElement

var default_user_info = ['guest', undefined, 'dark'];
var user_info = ['guest', undefined, 'dark'];
var user_default = "m1-all\\guest> ";
var user = "m1-all\\guest> ";
var hijacked = false;
var hijacker_id = "none";
var used_commands = [];
var count = 0

title1 = [
    "&nbsp;&nbsp;&nbsp;__  ______    ___   __   __                  __",
    "&nbsp;&nbsp;/  |/  <  /___/ _ | / /  / /    ______ _  ___/ /",
    "&nbsp;/ /|_/ // /___/ __ |/ /__/ /__  / __/  ' \\/ _  /",
    "/_/  /_//_/   /_/ |_/____/____/  \\__/_/_/_/\\_,_/",
    'Welcome to m1-all terminal start by typing <span class="err">"help"</span> ',
    '<br>'
]

//startin look
path.innerHTML = user;
loopLines(title1, "other");

//handle inputs
input.addEventListener("keydown", function (event) {
    if (event.key == "Enter") {
        used_commands.unshift(input.value)
        if (hijacked) {
            execute(hijacker_id, input.value)
            addLine(input_history + ' ' + input.value, "no-anim", 0);
            resetLine();
        } else {
            addLine(user + input.value, "no-anim", 0);
            command(input.value);
        }
        count = 0

    //handle arrow up/down
    } else if (used_commands.length != 0) {
        if (event.keyCode == '38') {
            console.log("command up")
            if (count < used_commands.length) {
                count += 1;
                input.value = used_commands[count - 1];
            }
        } else if (event.keyCode == '40') {
            console.log("command down")
            if (count <= used_commands.length & count > 1) {
                count -= 1;
                input.value = used_commands[count - 1];
            } else if (count == 1) {
                count -= 1;
                input.value = ''
            }
        }
    }
});

//available commands
function command(cmd) {
    cmd_arr = input.value.split(" ");
    cmd_base = cmd_arr[0];

    if (cmd_arr.length == 1) {
        switch (cmd_base.toLowerCase()) {
            case '':
                break;
            case 'help':
                loopLines(help_prt)
                break;
            case 'clear':
                document.getElementById("history").innerHTML = '';
                break;
            case 'about':
                addLine('Website made by Michal Kozlowski as portfolio, check contact for more');
                break;
            case 'projects':
                loopLines(projects)
                break;
            case 'contact':
                addLine('Insta: www.instagram.com/kolega__michal/, Git: github.com/M1chol');
                break;
            case 'title':
                loopLines(title1, "other");
                break;
            case 'kill':
                window.location = "desktop.html"
                break;
            case 'syntax':
                inputLine("Input new syntax:", "syntax-change");
                break;
            case 'project-view':
                addLine('Type project number to inspect, 0 to abort');
                inputLine("Inspect project: ", "inspect-project");
                break;
            case 'style':
                addLine('Pick a style [dark, light, retro, willow, hacker]')
                inputLine("Style name:", "style-change")
                break;
            case 'ver':
                addLine('Version: 0.8');
                break;
            case 'login':
                inputLine("Username:", "login-stash")
                break;
            case 'logout':
                if (user_info[1] == default_user_info[1]) {
                    addLine("Can't logout from guest account", 'err');
                } else {
                    addLine('Logout successfull', 'other');
                    user_info = default_user_info;
                    updateSite();
                }
                break;
            case 'register':
                addLine('How to use: register myName myPassword myStyle')
                addLine('example: register <span class="other">John paswr retro</span>')
                addLine('will create account John with password "paswr" with default style retro')
                break;
            default:
                print_error(0)
                break;
        }
        console.log(cmd_base, "executed");

    //handle advanced commands
    } else if (cmd_arr.length == 2) {
        switch (cmd_base.toLowerCase()) {
            case '':
                break;
            case 'syntax':
                execute("syntax-change", cmd_arr[1])
                break;
            case 'project-view':
                execute("inspect-project",cmd_arr[1])
                break;
            case 'style':
                execute('style-change', cmd_arr[1])
                break;
            case 'login':
                execute('login-stash', cmd_arr[1])
                break;
            default:
                print_error(0)
        }
        console.log(cmd_base, "executed with value", cmd_arr[1])
    //handle super-duper advanced commands
    } else if (cmd_arr.length == 3) {
        switch (cmd_base.toLowerCase()) {
            case 'login':
                execute('login-stash', cmd_arr[1], cmd_arr[2]);
                break;
        }
        console.log(cmd_base, "executed with values", cmd_arr[1], cmd_arr[2])
    //hande super-duper-hyper commands
    } else if (cmd_arr.length == 4) {
        switch (cmd_base.toLowerCase()) {
            case 'register':
                register(cmd_arr[1], cmd_arr[2], cmd_arr[3])
                break;
        }
    } else {
        print_error(0);
    }
}

//executing input based commands
function execute(cmd, value, value2) {
    switch (cmd) {
        case 'syntax-change':
            if (value == '') {
                path.innerHTML = user_default;
                user = user_default;
            }
            else {
                path.innerHTML = value;
                user = value + ' ';
            }
            break;

        case 'inspect-project':
            if (parseInt(value) == 0) {
                break;
            }
            if (parseInt(value) < 0) {
                print_error(3)
                break;
            }
            if (parseInt(value) > project_more.length || isNaN(value)) {
                addLine("There in no such project", "err")
                break;
            }
            addLine(project_more[parseInt(value) - 1])
            break;

        case 'style-change':
            if (value == 'light') {
                changeStyle('light')
            } else if (value == 'dark') {
                changeStyle('dark')
            } else if (value == 'retro') {
                changeStyle('retro')
            } else if (value == 'willow') {
                changeStyle('willow')
            } else if (value == 'hacker') {
                changeStyle('hacker')
            } else {
                print_error(2)
            }
            break;

        case 'login-stash':
            login(value, value2)
            break;

        case 'login-execute':
            if (user_info[1] == value) {
                addLine("Successfully logged in " + user_info[0], 'other');
                console.log('login successfull', user_info[0])
                updateSite();
            } else {
                print_error(4)
            }
            break;
        default:
            addLine("Function could not find enything to execute",'err')
            break;
    }
}

//print one line
function addLine(text, style, time=200) {
    setTimeout(function () {
        var txt = document.createElement("p");
        txt.innerHTML = text;
        txt.className = style;
        document.getElementById('history').appendChild(txt);
        input.value = "";
        window.scrollTo(0, document.body.offsetHeight);
    },time)
}

//loop through lines and print them
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
    input_history = text;
    path.innerHTML = text;
    hijacker_id = variable;
    hijacked = true;
}

function resetLine() {
    hijacked = false;
    path.innerHTML = user;
}

function print_error(erron_nr) {
    addLine(error_list[erron_nr],'err')
}

function changeStyle(color) {
    const color_list = ['dark', 'light', 'retro', 'willow', 'hacker'];
    if (color_list.includes(color)) {
        root.style.setProperty('--bg_color', 'var(--' + color + '_bg)')
        root.style.setProperty('--error_color', 'var(--' + color + '_error)')
        root.style.setProperty('--other_color', 'var(--' + color + '_other)')
        root.style.setProperty('--text_color', 'var(--' + color + '_text)')
    } else {
        print_error(5);
    }
}

function login(name, pass) {
    const request_name = new XMLHttpRequest();
    request_name.onload = function () {
        user_info = this.responseText.split(' ')
        if (pass != undefined) {
            execute('login-execute', pass)
        } else {
            inputLine("Password:", "login-execute");
        }
    }
    request_name.open("GET", "test.php?q=" + name);
    request_name.send();
}
function register(name, pass, style) {
    const reg_xml = new XMLHttpRequest();
    reg_xml.onload = function () {
        console.log(this.responseText)
        addLine('Account created','other')
    }
    reg_xml.open("GET", "register.php?nm=" + name + '&ps=' + pass + '&st=' + style);
    reg_xml.send();
}

function updateSite() {
    changeStyle(user_info[2])
    if (user == user_default) {
        user_default = 'm1-all\\' + user_info[0] + '> '
        execute('syntax-change', '')
    } else {
        user_default = 'm1-all\\' + user_info[0] + '> '
    }
}