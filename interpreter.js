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
        }else if(line[0]=="while"){

            matches = /while (.+)( is less than | is greater than | is equal to )(.+)/g.exec(x[i]);
            var expres=parseConditionalExpression(matches[1]+matches[2]+matches[3]);

            var temp = "while("+expres+"){";
            addLineToScript(temp);

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
    return expression;
}

function replaceAll(str, find, replace) {
    return str.replace(new RegExp(find, 'g'), replace);
}

function addLineToScript(newLine) {
    script += newLine + "\n";
}