var script = "";
var hasErrored = false;

function addLineToScript(newLine) {
    script += newLine + "\n";
}

function replaceAll(str, find, replace) {
    return str.replace(new RegExp(find, "g"), replace);
}

function parseConditionalExpression(expression) {
    expression = replaceAll(expression, " is equal to ", " === ");
    expression = replaceAll(expression, " is not equal to ", " != ");
    expression = replaceAll(expression, " is greater than ", " > ");
    expression = replaceAll(expression, " is less than ", " < ");
    expression = replaceAll(expression, " and ", " && ");
    expression = replaceAll(expression, " or ", " || ");
    expression = expression.replace(/([a-zA-Z0-9]+) is inside of ([a-zA-Z0-9]+)/g, "$2.indexOf($1) > -1");
    return expression;
}

function showError(error, parseError) {
    document.getElementById("error").className = "alert alert-danger";
    document.getElementById("error-text").innerHTML += error + "<br>";

    if(parseError) {
        document.getElementById("error-title").innerHTML = "Oh no! There are errors in your code:<br>";
    } else {
        document.getElementById("error-title").innerHTML = "Oh no! There was an error while trying to run your code:<br>";
    }

    hasErrored = true;
}

function hideError() {
    document.getElementById("error").className = "hidden";
    document.getElementById("error-text").innerHTML = "";

    hasErrored = false;
}

function parseFunctionCalls(expression) {
    return expression.replace(/<(.+?) with (.+?)>/g, function(x,y,z) {
        return intoFunctionName(y) + "(" + z + ")";
    });
}

function removeIndent(expression) {
    return expression.replace(/^ +/, "");
}

function intoFunctionName(expression) {
    return replaceAll(expression, " ", "_");
}

function checkForError(matches, lineNumber) {
    if (matches == null) {
        showError("We can&apos;t understand line " + (lineNumber + 1), true);
        return false;
    }
    return true;
}

function execute() {
    var x = document.getElementById("text").value.split("\n");
    script = "";
    hideError();
    for (var i = 0; i < x.length; i++) {
        x[i] = parseFunctionCalls(x[i]);
        x[i] = removeIndent(x[i]);

        var line = x[i].split(" ");
        var matches = "";
        if (line[0] === "") {

            // Do nothing

        } else if (line[0] === "Set") {

            matches = /Set (.+) to (.+)./g.exec(x[i]);

            if(checkForError(matches, i)) {
                addLineToScript("var " + matches[1] + " = " + matches[2]);
            }

        } else if (line[0] === "Show") {

            matches = /Show (.+)./g.exec(x[i]);

            if(checkForError(matches, i)) {
                addLineToScript("alert(" + matches[1] + ")");
            }

        } else if (line[0] === "Ask") {

            matches = /Ask (".+") for (.+)./g.exec(x[i]);

            if(checkForError(matches, i)) {
                addLineToScript("var " + matches[2] + " = prompt(" + matches[1] + ")");
            }

        } else if (line[0] === "If") {

            matches = /If (.+), then do:/g.exec(x[i]);

            if(checkForError(matches, i)) {
                addLineToScript("if(" + parseConditionalExpression(matches[1]) + ") {");
            }

        } else if (line[0] === "End.") {

            addLineToScript("}");

        } else if (line[0] === "Or") {

            if(line[1] == "else") {
                addLineToScript("} else {");
            } else {
                matches = /Or if (.+), then do:/g.exec(x[i]);

                if(checkForError(matches, i)) {
                    addLineToScript("} else if(" + parseConditionalExpression(matches[1]) + ") {");
                }
            }

        } else if (line[0] === "While") {

            matches = /While (.+) do:/g.exec(x[i]);

            if(checkForError(matches, i)) {
                addLineToScript("while(" + parseConditionalExpression(matches[1]) + ") {");
            }


        } else if (line[0] === "Count") {

            matches = /Count until (.+) reaches (-?\d+):/g.exec(x[i]);

            if(checkForError(matches, i)) {
                var incrementor = "--";
                if (parseInt(matches[2]) > 0) {
                    incrementor = "++";
                }
                addLineToScript("for(" + matches[1] + " = 0; " + matches[1] + " != " + matches[2] + "; " + matches[1] + incrementor + ") {");
            }

        } else if (x[i].charAt(0) === "(" && x[i].charAt(x[i].length - 1) === ")") {

            matches = /\((.+)\)/g.exec(x[i]);
            if(checkForError(matches, i)) {
                addLineToScript("// " + matches[1]);
            }

        } else if (line[0] === "Insert") {

            matches = /Insert (.+) into (.+)./g.exec(x[i]);
            if(checkForError(matches, i)) {
                addLineToScript(matches[2] + ".push(" + matches[1] + ");");
            }

        } else if (line[0] === "Remove") {

            matches = /Remove (.+) from (.+)./g.exec(x[i]);
            if(checkForError(matches, i)) {
                addLineToScript(matches[2] + ".splice((" + matches[2] + ".indexOf(" + matches[1] + ")), 1)");
            }

        } else if (line[0] === "For") {

            matches = /For every (.+) in (.+) do:/g.exec(x[i]);
            if(checkForError(matches, i)) {
                addLineToScript("for (var ___ = 0; ___ < " + matches[2] + ".length; ___++) {");
                addLineToScript("var " + matches[1] + " = " + matches[2] + "[___];");
            }

        } else if (line[0] === "Define") {

            matches = /Define (.+) with (.+):/g.exec(x[i]);
            if(checkForError(matches, i)) {
                matches[1] = intoFunctionName(matches[1]);
                addLineToScript("function " + matches[1] + "(" + matches[2] + ") {");
            }

        } else if (x[i].slice(-2) === ").") {

            matches = /^([^ ]+?\(.+?\))./g.exec(x[i]);
            if(checkForError(matches, i)) {
                addLineToScript(matches[1]);
            }

        } else if (line[0] === "Return") {

            matches = /Return (.+)./g.exec(x[i]);
            if(checkForError(matches, i)) {
                addLineToScript("return " + matches[1]);
            }

        } else {

            showError("We can&apos;t understand line " + (i + 1), true);
            return

        }

    }

    if(!hasErrored) {
        hideError();
        console.log(script);

        try {
            new Function(script)();
        } catch(err) {
            showError(err, false);
        }
    }

}