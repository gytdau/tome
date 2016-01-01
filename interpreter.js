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
        else if(line[0] == "If") {
            matches = /If (.+):/g.exec(x[i]);
            addLineToScript("if(" + parseConditionalExpression(matches[1]) + ") {")
        }
        else if(line[0] == "End") {
            addLineToScript('}')
        }
        else if(line[1] == "else:") {
            addLineToScript('} else {')
        }
        else if(line[1] == "if") {
            matches = /Or if (.+):/g.exec(x[i]);
            addLineToScript("} else if(" + parseConditionalExpression(matches[1]) + ") {")
        }
        else if(line[0]=="While"){
            matches = /While (.+) do:/g.exec(x[i]);
            addLineToScript("while("+parseConditionalExpression(matches[1])+") {");

        }
        else if(line[0] == "Count") {
            matches = /Count until (.+) reaches (-?\d+):/g.exec(x[i]);
            if(parseInt(matches[2]) > 0) {
                incrementor = "++";
            } else {
                incrementor = "--";
            }
            addLineToScript("for(" + matches[1] + " = 0; " + matches[1] + " != " + matches[2] + "; " + matches[1] + incrementor + ") {")
        }
    }
    console.log(script);
    new Function(script)();
}

function parseConditionalExpression(expression) {
    expression = replaceAll(expression, " is equal to ", " == ");
    expression = replaceAll(expression, " is not equal to ", " != ");
    expression = replaceAll(expression, " is greater than ", " > ");
    expression = replaceAll(expression, " is less than ", " < ");
    expression = replaceAll(expression, " and ", " && ");
    expression = replaceAll(expression, " or ", " || ");
    expression = expression.replace(/([a-zA-Z0-9]+) is inside of ([a-zA-Z0-9]+)/g, "$2.indexOf($1) > -1");
    return expression;
}

function replaceAll(str, find, replace) {
    return str.replace(new RegExp(find, 'g'), replace);
}

function addLineToScript(newLine) {
    script += newLine + "\n";
}
