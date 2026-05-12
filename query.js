const textSearch = 'text, varchar, date, time,timestamp';
const specialCharacter = new RegExp("[.*+?^${}()|[\]\\]", "gi");
function splitColumns(row, headerMap, headers, delimeter=","){
    let cols = row.split('\t');
    for (let i = 0; i < cols.length; i++) {
        if(textSearch.toLowerCase().includes(headerMap.get(headers[i]).toLowerCase())){
            // if (cols[i].search(specialCharacter) > 0) {
            //     cols[i] = `"${cols[i]}"`;
            // } else {
                cols[i] = `'${cols[i]}'`;
            // }
        } else {
            cols[i] = cols[i];
        }
        if(cols[i] == ''){
            cols[i] = 'NULL';
        }
    }
    return cols.join(delimeter);
}

function headerDataTypes(header, dataTypes){
    let headerCols = header.split("\t");
    const headerMap = new Map();
    for(let i = 0; i < headerCols.length; i++){
        headerMap.set(headerCols[i], 'VARCHAR');
        dataTypes[i] = 'VARCHAR';
    }
    return [headerMap, headerCols];

}

function convertCsvData(data, isHeader = true) {
    let rows = data.split('\n');
    let header = "";
    const finalRows = [];
    let colsCnt = 0;
    let dataTypes = [];
    if (isHeader){
        header = rows[0];
        rows = rows.slice(1);
    }
    for(let i = 0; i < rows.length; i++){
        rows[i] = splitColumns(rows[i], headerMap, headers);
        if(colsCnt == 0){
            colsCnt = rows[i].length;
        }
    }
}