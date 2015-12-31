function execute() {
    var x = document.getElementById('text').value.split('\n');
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
            addLineToScript(matches[2] + " += " + matches[1])
        }
        else if(line[0] == "Subtract") {
            matches = /Subtract (.+) from (.+)/g.exec(x[i]);
            addLineToScript(matches[2] + " -= " + matches[1])
        }
    }

}

function addLineToScript(newLine) {
    document.getElementById('result').value += newLine + "\n";
}