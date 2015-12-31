script = "";

function execute() {
    var x = document.getElementById('text').value.split('\n');
    script = "";
    for (var i = 0; i < x.length; i++) {
        line = x[i].split(" ");
        var matches = "";
        if(line[0] == "Set") {
            matches = /Set (.+) as (.+)/g.exec(x[i]);
            addLineToScript("var " + matches[1] + " = " + matches[2]);
        }
        else if(line[0] == "Show") {
            matches = /Show (.+)/g.exec(x[i]);
            addLineToScript("alert(" + matches[1] + ")")
        }
        else if(line[0] == "Add") {
            matches = /Add (.+) to (.+)/g.exec(x[i]);
            addLineToScript(matches[2] + " = parseInt(" + matches[1] + ") + parseInt(" + matches[2] + ")")
        }
        else if(line[0] == "Subtract") {
            matches = /Subtract (.+) from (.+)/g.exec(x[i]);
            addLineToScript(matches[2] + "  = parseInt(" + matches[1] + ") - parseInt(" + matches[2] + ")")
        }
        else if(line[0] == "Ask") {
            matches = /Ask (".+") for (.+)/g.exec(x[i]);
            addLineToScript("var " + matches[2] + " = prompt(" + matches[1] + ")")
        }
    }

    new Function(script)();
}

function addLineToScript(newLine) {
    script += newLine + "\n";
}