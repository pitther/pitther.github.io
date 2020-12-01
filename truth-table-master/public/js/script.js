let UI, CORE;

String.prototype.replaceAll = function(search, replacement) {
    var target = this;
    return target.split(search).join(replacement);
};

String.prototype.splice = function(start, delCount, newSubStr) {
    return this.slice(0, start) + newSubStr + this.slice(start + Math.abs(delCount));
};

class UserInterface{
    constructor() {
        this.castomization = false;
        this.inputExpressionElement = document.getElementById("inputExpression");
        this.inputTipElement = document.getElementById("tipInput");
    }
    onMakeTable(){
        let val = this.inputExpressionElement.value.toUpperCase();
        this.inputExpressionElement.value = val;
        CORE.proceedExpression(val);
    }

    inputError(reason){
        this.removeClass(this.inputExpressionElement,"is-valid");
        this.addClass(this.inputExpressionElement,"is-invalid");
        document.getElementById("invalidReasonDiv").innerHTML = reason;
    }
    inputSuccess(){
        this.removeClass(this.inputExpressionElement,"is-invalid");
        this.addClass(this.inputExpressionElement,"is-valid");
    }
    removeClass(ele,cls) {
            while(ele.className.indexOf(cls) > -1){
                ele.className = ele.className.replace(cls,"");
            }
    }
    onDetailed(){
        CORE.detailedOperations = !CORE.detailedOperations;
        this.onMakeTable();
        if (!CORE.detailedOperations){
            document.getElementById("detailedOperationsButton").innerHTML = "Detailed";
        } else {
            document.getElementById("detailedOperationsButton").innerHTML = "Simple";
        }
    }
    onColorizeOperations(){
        CORE.colorizeSteps = !CORE.colorizeSteps;
        this.onMakeTable();
        if (!CORE.colorizeSteps){
            document.getElementById("colorizeOperationsButton").innerHTML = "Colorize";
            document.getElementById("colorizeOperationsButton").style.color = "#dc3545";
        } else {
            document.getElementById("colorizeOperationsButton").innerHTML = "Decolorize";
            document.getElementById("colorizeOperationsButton").style.color = "#ffc107";
        }
    }
    onCustomization(){
        this.castomization = !this.castomization;
        if (this.castomization){

            document.getElementById("settingsNav").style.display = "block";
            document.getElementById("settingsNav").style.webkitAnimationName = "open";
            document.getElementById("settingsNav").style.webkitAnimationPlayState = "running";

            document.getElementById("stepsButton").style.display = "";
            document.getElementById("replaceOperationsButton").style.display = "";
            document.getElementById("colorizeOperationsButton").style.display = "";
        } else {
            document.getElementById("settingsNav").style.webkitAnimationName = "close";
            document.getElementById("settingsNav").style.webkitAnimationPlayState = "running";

            setTimeout(function () {
                document.getElementById("settingsNav").style.display = "none";
            },200);
        }
    }
    onInput(input){
        let inpExpEl = document.getElementById("inputExpression");
        let curpos = inpExpEl.selectionStart;
        this.onMakeTable();
        setCaretPosition("inputExpression",curpos);
    }
    clickOperations(operationEL){
        let inpExpEl = document.getElementById("inputExpression"),
            innerHTML = operationEL.innerHTML;
        if (innerHTML == "CLR"){
            inpExpEl.value = "";
            return;
        }
        let operation;
        if (innerHTML == "(" || innerHTML == ")"){
            operation = innerHTML;
        } else {
            operation = CORE.varDict[innerHTML][0];
        }
        inpExpEl.focus();
        let curpos = inpExpEl.selectionStart;
        let res = inpExpEl.value.splice(curpos,0,operation);
        inpExpEl.value = res; //
        setCaretPosition("inputExpression",curpos+operation.length);
        this.onMakeTable();
    }
    onReplaceOperations(){
        CORE.replaceOperations = !CORE.replaceOperations;
        this.onMakeTable();
        if (CORE.replaceOperations){
            document.getElementById("replaceOperationsButton").innerHTML = "Symbols";
        } else {
            document.getElementById("replaceOperationsButton").innerHTML = "Namings";
        }
    }
    onViewSteps(){
        CORE.showSteps = !CORE.showSteps;
        this.onMakeTable();
        if (CORE.showSteps){
            document.getElementById("stepsButton").innerHTML = "Hide steps";
            document.getElementById("detailedOperationsButton").style.display = "";
        } else {
            document.getElementById("stepsButton").innerHTML = "Show steps";
            document.getElementById("detailedOperationsButton").style.display = "none";
        }
    }
    onChangeTheme(){
        let navEl = document.getElementById("nav");
        let setEl = document.getElementById("settingsNav");
        let tableEl = document.getElementById("table");
        if ( navEl.className.indexOf("dark") > -1) {

            this.removeClass(setEl,"navbar-dark");
            this.removeClass(setEl,"bg-dark");
            this.addClass(setEl,"navbar-light bg-light");

            this.removeClass(navEl,"navbar-dark");
            this.removeClass(navEl,"bg-dark");
            this.addClass(navEl,"navbar-light bg-light");

            document.getElementById("inputExpression").style.color = "#343a40";
            document.getElementById("themeButton").innerHTML = "Dark theme";
            document.body.style.backgroundColor = "white";
        } else {
            this.removeClass(setEl,"navbar-light");
            this.removeClass(setEl,"bg-light");
            this.addClass(setEl,"navbar-dark bg-dark");

            this.removeClass(navEl,"navbar-light");
            this.removeClass(navEl,"bg-light");
            this.addClass(navEl,"navbar-dark bg-dark");
            document.getElementById("inputExpression").style.color = "#f8f9fa";
            document.getElementById("themeButton").innerHTML = "Light theme";
            document.body.style.backgroundColor = "#212529";
        }

        if ( tableEl.className.indexOf("dark") > -1) {
            this.removeClass(tableEl,"table-dark");
            this.addClass(tableEl,"table-light");
        } else {
            this.removeClass(tableEl,"table-light");
            this.addClass(tableEl,"table-dark");
        }
    }
    onHint(){
        if ( this.inputTipElement.className.indexOf("is-valid") > -1){
            this.removeClass(this.inputTipElement,"is-valid");
        } else {
            this.addClass(this.inputTipElement,"is-valid");
            let tip = "<b>List of operations:</b>";

            tip += "<br><b>"+CORE.varDict["NOT"].join(", ")+"</b> - Negation (NOT) ";
            tip += "<br><b>"+CORE.varDict["AND"].join(", ")+"</b> - Conjunction (AND) ";
            tip += "<br><b>"+CORE.varDict["OR"].join(", ")+"</b> - Disjunction (OR) ";
            tip += "<br><b>"+CORE.varDict["IMP"].join(", ")+"</b> - Implication (IMPLY) ";
            tip += "<br><b>"+CORE.varDict["EQ"].join(", ")+"</b> - Equality (EQ,XNOR) ";
            tip += "<br><b>"+CORE.varDict["XOR"].join(", ")+"</b> - Exclusive or (XOR) ";
            tip += "<br><b>"+CORE.varDict["NAND"].join(", ")+"</b> - Sheffer stroke (NAND) ";
            tip += "<br><b>"+CORE.varDict["NOR"].join(", ")+"</b> - Logical NOR (NOR) ";

            tip+= "<br><br><b>Use round brackers to set priority!</b>";

            tip += "<br><br><b>Available characters:</b><br>"+CORE.alphabet;
            tip += `<br><br><i>Example: (${CORE.varDict["NOT"][0]}A ${CORE.varDict["AND"][0]} B) ${CORE.varDict["IMP"][0]} (A ${CORE.varDict["AND"][0]} C) </i>`


            document.getElementById("tipDiv").innerHTML = tip;


        }

    }

    parseInput(str){
        return str;
    }
    addClass(ele,cls){
            ele.className += " "+ cls;
    }
    clearTableInnerHtml(){
        document.getElementById("table").innerHTML = "";
    }
    appendToTable(html){
        document.getElementById("table").innerHTML += html;
    }
    generateTableHead(heads){
        let str = "<thead ><tr>"
        for (let i = 0; i < heads.length; i++){
            str += `<th class='text-info' style="text-align: center" scope="col">${heads[i]}</th>`;
        }
        str += "</tr></thead>";
        this.appendToTable(str);
        return str;
    }
    generateTableBody(data){
        let str = "<tbody>";
        for (let i = 0; i < data.length; i++){
            str += "<tr >";
            for (let j = 0; j < data[i].length; j++){
                str += `<th scope="col" style="text-align: center" >${data[i][j]}</th>`;
            }
            str += "</tr>";
        }
        this.appendToTable(str);
        return str;
    }
}

class Core{
    constructor(){
        this.detailedOperations = false;
        this.colorizeSteps = true;
        this.showSteps = false;
        this.replaceOperations = false;
        this.letterAlphabet = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P",
            "Q", "R", "S", "T", "U", "W", "X", "Y", "Z",
        "Й","Ц","У","К",,"Е","Н","Г","Ш","Щ","З","Х","Ф","Ы","В","А","П","Р","О","Л","Д","Ж","Э","Я","Ч","С",
            "М","И","Т","Б","Ю","І","Є"];
        this.alphabet = ["(",")"];
        this.dict = { // safe symbols
            "NOT": "_1",
            "NOR": "_8",
            "XOR":"_6",
            "OR": "_2",
            "AND": "_3",
            "IMP": "_4",
            "EQ": "_5",
            "NAND" : "_7",
        };
        this.varDict = {
            "EQ": ["<->","<>","EQ"],
            "IMP": ["->",">>","IMP"],
            "NOT": ["-","!","NOT"],
            "XOR": ["0","XOR"],
            "NOR": ["NOR"],
            "OR": ["V","||","+","OR"],
            "AND": ["^","&&","*","AND"],
            "NAND": ["|","NAND"]
        };

        for (let operation in this.varDict){
            this.alphabet = this.alphabet.concat(this.varDict[operation]);
        }

        //this.alphabet.push(this.dict["OR"],this.dict["AND"],this.dict["EQ"],this.dict["IMP"],this.dict["NOT"]);
        this.alphabet = this.alphabet.concat(this.letterAlphabet);
    }
    parseInput(str){
        str = str.toUpperCase();
        for(var operation in this.varDict){
            for (let i = 0; i < this.varDict[operation].length; i++){
                str = str.replaceAll(this.varDict[operation][i], `${this.dict[operation]}`);
            }
        }

        return str;
    }
    proceedExpression(exp){

        exp = exp.replace(/\s/g,'');
        if (this.checkExpression(exp).length > 0){return;}
        exp = this.parseInput(exp);
        let parsed = parse(exp,{brackets: ['()'],
            escape: '\\',
            flat: true});
        let variables = this.getVariables(exp);
        UI.clearTableInnerHtml();
        let inputCombosArr = this.binaryCombos(variables.length);

        this.proceedParsed(parsed, variables, inputCombosArr)
    }
    proceedParsed(parsed, variables, inputCombosArr){
        let headers = variables,
            body = inputCombosArr;

        function parsedIterate(i){
            if (headers.indexOf(CORE.replaceLinks(parsed,i)) > -1){
                return 0;
            } else {
                headers.push("<span class='headers'>"+CORE.replaceOperationsStr(CORE.replaceLinks(parsed,i),CORE.replaceOperations)+"</span>");
            }

            for (let j = 0; j < inputCombosArr.length; j++){
                let res = CORE.proceedLogicOperation(inputCombosArr[j],CORE.replaceLinks(parsed,i),variables);
                if (res === -1){
                    return -1;
                }
                body[j].push(res);
            }
        }
        for (let i = 1; i < parsed.length; i++){
            let res = parsedIterate(i);
            if(res === -1){return;};
        }
        let res = parsedIterate(0);
        if(res === -1){return;};

        UI.generateTableHead(headers);
        UI.generateTableBody(body);
    }
    proceedLogicOperation(input,str,variables) {

        for (let i = 0; i < str.length; i++) {
            for (let j = 0; j < variables.length; j++) {
                if (str[i] == variables[j]) {
                    str = str.replace(variables[j], input[j]);
                    break;
                }
            }
        }

        let step_str = str,
            rep_step = str;
        let LogicArr = [
            [this.dict["NOT"]+"1", 0], [this.dict["NOT"]+"0", 1],
            ["1"+this.dict["AND"]+"1", 1], ["1"+this.dict["AND"]+"0", 0], ["0"+this.dict["AND"]+"1", 0], ["0"+this.dict["AND"]+"0", 0],
            ["1"+this.dict["OR"]+"1", 1], ["1"+this.dict["OR"]+"0", 1], ["0"+this.dict["OR"]+"1", 1], ["0"+this.dict["OR"]+"0", 0],
            ["1"+this.dict["IMP"]+"1", 1], ["1"+this.dict["IMP"]+"0", 0], ["0"+this.dict["IMP"]+"1", 1], ["0"+this.dict["IMP"]+"0", 1],
            ["1"+this.dict["EQ"]+"1", 1], ["1"+this.dict["EQ"]+"0", 0], ["0"+this.dict["EQ"]+"1", 0], ["0"+this.dict["EQ"]+"0", 1],
            ["1"+this.dict["XOR"]+"1", 0], ["1"+this.dict["XOR"]+"0",1], ["0"+this.dict["XOR"]+"1", 1], ["0"+this.dict["XOR"]+"0", 0],
            ["1"+this.dict["NAND"]+"1", 0], ["1"+this.dict["NAND"]+"0",1], ["0"+this.dict["NAND"]+"1", 1], ["0"+this.dict["NAND"]+"0", 1],
            ["1"+this.dict["NOR"]+"1", 0], ["1"+this.dict["NOR"]+"0",0], ["0"+this.dict["NOR"]+"1", 0], ["0"+this.dict["NOR"]+"0", 1]
        ];

        let DEPTH = 20;
        for (let j = 0; j < DEPTH; j++) {
            let buff = "";
            for (let i = 0; i < LogicArr.length; i++) {
                buff = str.replaceAll(LogicArr[i][0], LogicArr[i][1]);
                if (buff != str){
                    str = buff;
                    step_str += "<br>"+str;
                }
                buff = str.replaceAll('(' + LogicArr[i][0] + ')', LogicArr[i][1]);
                if (buff != str){
                    str = buff;
                    step_str += "<br>"+str;
                }
                buff = str.replaceAll('(1)', '1');
                if (buff != str){
                    str = buff;
                }
                buff = str.replaceAll('(0)', '0');
                if (buff != str){
                    str = buff;
                }
            }

        }

        if (!this.detailedOperations){
            step_str = rep_step;
        }
        if (str == "1"){
            if (this.showSteps){
                if (this.detailedOperations){
                    return this.replaceOperationsStr(step_str,this.replaceOperations);
                } else {
                    return this.replaceOperationsStr(step_str,this.replaceOperations) + " = "+1;
                }

            } else {
                return 1;
            }

        } else if (str == "0"){
            if (this.showSteps){
                if (this.detailedOperations){
                    return this.replaceOperationsStr(step_str,this.replaceOperations);
                } else {
                    return this.replaceOperationsStr(step_str,this.replaceOperations) + " = "+0;
                }
            } else {
                return 0;
            }
        } else {
            if (str.length <= 0){
                UI.inputError("Enter expression firstly");
            } else {
                let reason = "Invalid expression format";
                reason += "<br><br><b style='cursor: pointer' onclick='UI.onHint()'>Click here to see proper formating</b>";
                UI.inputError(reason);
            }
            return -1;

        }

    }
    replaceOperationsStr(str, t_){
        let class_ = "";
        if (this.colorizeSteps){class_ = "text-danger"}
        if (t_) {
            for (let operation in this.dict){
                if (operation == "NOT"){
                    str = str.replaceAll(this.dict[operation], " <span class="+class_+">"+operation+"</span>");
                } else {
                    str = str.replaceAll(this.dict[operation], " <span class="+class_+">"+operation+"</span> ");
                }

            }

        } else {
            for (let operation in this.dict){
                if (operation == "NOT"){
                    str = str.replaceAll(this.dict[operation], "<span class="+class_+">"+` ${this.varDict[operation][0]}`+"</span>");
                } else {
                    str = str.replaceAll(this.dict[operation], "<span class="+class_+">"+` ${this.varDict[operation][0]} `+"</span> ");
                }
            }
        }

        return str;
    }
    replaceLinks(parsed,i){
        let str = parsed[i],
            replaced = false;
        while (!replaced) {
            let replaced_ = false;
            for (let i = 0; i < parsed.length; i++) {
                if (str.indexOf('\\' + i) > -1) {
                    replaced_ = true;
                    str = str.replace('\\' + i, ''+parsed[i]+'');
                }
            }
            if (!replaced_){
                replaced = true;
                break;
            }
        }

        return str;
    }
    binaryCombos(n){
        var result = [];
        for(let y=0; y<Math.pow(2,n); y++){
            var combo = [];
            for(let x=0; x<n; x++){
                if((y >> x) & 1)
                    combo.push(1);
                else
                    combo.push(0);
            }
            result.push(combo);
        }
        return result;
    }
    getVariables(exp){
        let res = [];
        for (let i = 0; i < exp.length; i++){
            if (this.letterAlphabet.indexOf(exp[i]) > -1 && res.indexOf(exp[i]) < 0){
                res.push(exp[i]);
            }
        }
        return res;
    }
    checkExpression(exp){
        for (let i = 0; i < this.alphabet.length; i++){
            while (exp.indexOf(this.alphabet[i]) > -1){
                exp = exp.replace(this.alphabet[i],"");
            }
        }
        if (exp.length > 0){
            let chars = exp;
            chars = chars.split("");
            let reason = "Unexpected characters: "+chars;
            reason += "<br>Acceptable characters: "+CORE.alphabet;
            reason += "<br><br><b style='cursor: pointer' onclick='UI.onHint()'>Click here to see proper formating</b>";
            UI.inputError(reason);
            return exp;
        } else {
            UI.inputSuccess();
            return exp;
        }
    }
}

window.onload = function () {
    UI = new UserInterface();
    CORE = new Core();
};

function setCaretPosition(elemId, caretPos) {
    var elem = document.getElementById(elemId);

    if(elem != null) {
        if(elem.createTextRange) {
            var range = elem.createTextRange();
            range.move('character', caretPos);
            range.select();
        }
        else {
            if(elem.selectionStart) {
                elem.focus();
                elem.setSelectionRange(caretPos, caretPos);
            }
            else
                elem.focus();
        }
    }
}

