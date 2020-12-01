class Core{
    constructor(){

    }
    update(links,nodes){
        //console.log(links);
        //console.log(nodes.length);
        this.clearInTableInnerHtml();
        this.clearAdTableInnerHtml();
        this.createAdjacencyTable(this.createAdjacencyMtx());
        this.createIncidenceTable(this.createIncidenceMtx());
    }
    createIncidenceMtx(){
        let linksLength = links.length;
        let reflexiveCount = 0;
        let linkNames = [];
        for (let i = 0; i < nodes.length; i++){
            if (nodes[i].reflexive){
                reflexiveCount++;
            }
        }
        for (let i = 0; i < links.length; i++) {
            if (links[i].left && links[i].right) {
            reflexiveCount++;
            }
        }
        let matrix = this.zeros([nodes.length,links.length+reflexiveCount]);
        let j = 0;
        for (let i = 0; i < links.length; i++){
            console.log(links[i]);

            if (links[i].left && links[i].right){
                linkNames.push("E"+links[i].source.id+':'+links[i].target.id);
                linkNames.push("E"+links[i].target.id+':'+links[i].source.id);
                matrix[links[i].target.id][j] = -1;
                matrix[links[i].source.id][j] = 1;

                j++;
                matrix[links[i].target.id][j] = 1;
                matrix[links[i].source.id][j] = -1;

            } else if (links[i].left){
                linkNames.push("E"+links[i].target.id+':'+links[i].source.id);
                matrix[links[i].target.id][j] = 1;
                matrix[links[i].source.id][j] = -1;
            } else {
                linkNames.push("E"+links[i].source.id+':'+links[i].target.id);
                matrix[links[i].target.id][j] = -1;
                matrix[links[i].source.id][j] = 1;
            }
            j++;
        }

        for (let i = 0; i < nodes.length; i++){
            console.log(nodes[i]);
            if (nodes[i].reflexive){
                linkNames.push("E"+i+':'+i);
                matrix[i][linkNames.length-1] = 2;
            }
        }
        let s = "   ";
        for (let i = 0; i < linkNames.length; i++){
            s += linkNames[i] + " ";
        }
        console.log(s);

        this.logNormMatrix(matrix);
        return {matrix:matrix, linkNames:linkNames};
    }
    createAdjacencyMtx(){
        let matrix = this.zeros([nodes.length,nodes.length]);
        for (let i = 0; i < links.length; i++){
            console.log(links[i]);
            matrix[links[i].source.id][links[i].target.id] = 1;
            if (links[i].left){
                matrix[links[i].target.id][links[i].source.id] = 1;
            }
        }

        for (let i = 0; i < nodes.length; i++){
            console.log(nodes[i]);
            if (nodes[i].reflexive){
                matrix[i][i] = 1;
            }
        }
        this.logNormMatrix(matrix);
        return matrix;

    }
    createIncidenceTable(res){
        console.log(res.matrix,res.linkNames);
        res.linkNames.splice(0,0,"Incidence");
        this.generateInTableHead(res.linkNames);
        this.generateInTableBody(res.matrix);
    }
    createAdjacencyTable(matrix){
        let heads = ["Adjacency"];
        for (let i = 0; i < matrix.length; i++){
            heads.push("V"+i);
        }
        this.generateAdTableHead(heads);
        this.generateAdTableBody(matrix);
    }
    generateInTableHead(heads){

        let str = "<thead ><tr>";
        for (let i = 0; i < heads.length; i++){
            str += `<th class='text-info fstrow' style="text-align: center" scope="col">${heads[i]}</th>`;
        }

        str += "</tr></thead>";

        this.appendToInTable(str);
        return str;
    }
    generateInTableBody(data){
        let str = "<tbody>";

        for (let i = 0; i < data.length; i++){
            str += "<tr >";
            str += `<th scope="col" class="text-info fstrow" style="text-align: center; " >V${i}</th>`;
            for (let j = 0; j < data[i].length; j++){

                str += `<th scope="col" style="text-align: center" >${data[i][j]}</th>`;
            }
            str += "</tr>";
        }
        this.appendToInTable(str);
        return str;
    }
    generateAdTableHead(heads){

        let str = "<thead ><tr>";
        for (let i = 0; i < heads.length; i++){
            str += `<th class='text-info fstrow' style="text-align: center" scope="col">${heads[i]}</th>`;
        }

        str += "</tr></thead>";

        this.appendToAdTable(str);
        return str;
    }
    generateAdTableBody(data){
        let str = "<tbody>";

        for (let i = 0; i < data.length; i++){
            str += "<tr >";
            str += `<th scope="col" class="text-info fstrow" style="text-align: center; " >V${i}</th>`;
            for (let j = 0; j < data[i].length; j++){

                str += `<th scope="col" style="text-align: center" >${data[i][j]}</th>`;
            }
            str += "</tr>";
        }
        str += "<tr><th></th></th></tr>";
        this.appendToAdTable(str);
        return str;
    }
    clearAdTableInnerHtml(){
        document.getElementById("tableAd").innerHTML = "";
    }
    appendToAdTable(html){
        document.getElementById("tableAd").innerHTML += html;
    }
    clearInTableInnerHtml(){
        document.getElementById("tableAd").innerHTML = "";
    }
    appendToInTable(html){
        document.getElementById("tableAd").innerHTML += html;
    }
    logNormMatrix(matrix){
        let s = "   ";
        for (let i = 0; i < matrix.length; i++){
            s += i + " ";
        }
        console.log(s);
        s = "";
        for (let i = 0; i < matrix.length; i++){
            for (let j = 0; j < matrix[i].length; j++){
                s += matrix[i][j] + ' ';
            }
            console.log(i,s);
            s = "";
        }
    }
    zeros(dimensions) {
        var array = [];

        for (var i = 0; i < dimensions[0]; ++i) {
            array.push(dimensions.length == 1 ? 0 : this.zeros(dimensions.slice(1)));
        }

        return array;
    }
}


let CORE = new Core();