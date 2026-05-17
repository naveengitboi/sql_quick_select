class SqlQueryGenerator {
  constructor() {
    // Elements
    this.queryEle = document.querySelector(".dataArea");
    this.generateQueryEle = document.querySelector(".generateQueryBtn");
    this.isHeaderEle = document.querySelector("#isHeader");
    this.addOrderEle = document.querySelector("#addOrder");
    this.delimeterEle = document.querySelector(".delimeter");
    this.headerContainer = document.querySelector(".headerContainer");

    // Highlighter
    this.outputEle = document.querySelector(".output");
    this.codeOverlayEle = document.querySelector(".codeOverlay");

    // Constants
    this.TYPES = ["VARCHAR", "NUMBER", "DATE", "TIMESTAMP"];
    this.textSearch = "text,varchar,date,time,timestamp";

    // State
    this.header = [];
    this.headerMap = new Map();
    this.delimeter = this.delimeterEle.value;
    this.addOrder = this.addOrderEle.checked;
    this.addOrderCol = 'col_order';

    this.init();
  }

  init() {
    this.generateQueryEle.addEventListener("click", () => {
      this.generateQueries();
    });
  }

  createEle({ ele, type = "class", typeList = "" } = {}) {
    const element = document.createElement(ele);

    if (typeList) {
      element.setAttribute(type, typeList);
    }

    return element;
  }

  splitColumns({ row } = {}) {
    let cols = row.split(this.delimeter);

    for (let i = 0; i < cols.length; i++) {
      let dtype = this.headerMap.get(this.header[i]);
      if (this.textSearch.toLowerCase().includes(dtype.toLowerCase())) {
        cols[i] = cols[i] === "" ? "NULL" : `'${cols[i]}'`;
      } else {
        if (cols[i] === "") {
          cols[i] = "NULL";
        }
      }
    }

    return cols.join(",");
  }

  writeCreateQuery() {
    let query = `CREATE OR REPLACE TABLE TABLE_NAME(\n`;

    for (let i = 0; i < this.header.length; i++) {
      const col = this.header[i];
      const dtype = this.headerMap.get(col);

      query += `  ${col.toUpperCase()} ${dtype}`;

      if (i !== this.header.length - 1) {
        query += ",";
      }

      query += "\n";
    }

    query += ");";

    return query;
  }

  writeInsertQuery({ rows } = {}) {
    let query = `INSERT INTO TABLE_NAME(${this.header.join(",")})\nVALUES\n`;

    for (let i = 0; i < rows.length; i++) {
      query += `(${rows[i]})`;

      if (i !== rows.length - 1) {
        query += ",\n";
      }
    }

    query += ";";

    return query;
  }

  headerDataTypes(){
    for (let col of this.header) {
      if(this.addOrder && col == this.addOrderCol){
        this.headerMap.set(col, this.TYPES[1]);
      }else{
        this.headerMap.set(col, this.TYPES[0]);
      }
    }
  }

  updateCols({ rows } = {}) {
    let newRows = [];
    let n = rows.length;
    for (let i = 0; i < n; i++) {
      newRows.push(
        this.splitColumns({
          row: rows[i],
        })
      );
    }
    return newRows;
  }

  updateMapping({ rows, col, newType } = {}) {
    this.headerMap.set(col, newType);
    let modRows = this.updateCols({ rows });
    return modRows;
  }

  clearHeaderMappingUI() {
    this.headerContainer.innerHTML = "";
  }

  insertMapping({ rows, isHeader } = {}) {
    this.clearHeaderMappingUI();

    for (let col of this.header) {
      const value = this.headerMap.get(col);
      const colContEle = this.createEle({
        ele: "div",
        type: "class",
        typeList: "headerColContainer",
      });
      const headerP = this.createEle({
        ele: "p",
        type: "class",
        typeList: "headerCol",
      });
      headerP.innerText = col;
      const selectCont = this.createEle({
        ele: "select",
        type: "class",
        typeList: "headerDType",
      });

      for (let t of this.TYPES) {
        const optionEle = this.createEle({
          ele: "option",
          type: "value",
          typeList: t,
        });
        optionEle.innerText = t;
        if (t === value) {
          optionEle.selected = true;
        }
        selectCont.append(optionEle);
      }

      selectCont.addEventListener("change", (e) => {
        let modRows = this.updateMapping({
          rows,
          col,
          newType: e.target.value,
        });
        this.outputEle.value = "";
        this.outputEle.value = this.executeQueries({
          rows: modRows,
          isHeader,
        });

        // optional syntax highlighter
        codeHiglighter({
          ele: this.outputEle,
          overlay: this.codeOverlayEle,
          lang: langSelectorEle.value,
        });
      });

      colContEle.append(headerP);
      colContEle.append(selectCont);

      this.headerContainer.append(colContEle);
    }
  }

  executeQueries({ rows, isHeader } = {}) {
    let output = "";
    if (isHeader) {
      output += this.writeCreateQuery();
      output += "\n\n";
    }
    output += this.writeInsertQuery({ rows });
    return output;
  }

  convertCsvData({ data, isHeader = true} = {}) {
    let rows = data.split("\n");
    if(isHeader){
      this.header = rows[0].split(this.delimeter);
      if(this.addOrder){
        this.header.push(this.addOrderCol);
      }
      this.headerDataTypes();
      rows = rows.slice(1);
    }else{
      this.header = rows[0].split(this.delimeter);
      this.headerDataTypes();
    }
    if(this.addOrder){
      for(let j = 0; j < rows.length; j++){
        rows[j] += `${this.delimeter}${j+1}`;
      }
    }
    let modRows = this.updateCols({ rows });
    this.insertMapping({
      rows,
      isHeader,
    });
    return this.executeQueries({
      rows: modRows,
      isHeader,
    });
  }

  generateQueries() {
    const DELI_TAB = "\t";

    let data = this.queryEle.value;
    const isHeader = this.isHeaderEle.checked;
    this.addOrder = this.addOrderEle.checked;
    this.delimeter = this.delimeterEle.value;

    if (this.delimeter.length === 0) {
      this.delimeter = DELI_TAB;
    }

    if (data.trim() === "") {
      showSnackBar({message:"Please paste data"})
      return;
    }

    this.outputEle.value = this.convertCsvData({
      data,
      isHeader
    });

    codeHiglighter({
      ele: this.outputEle,
      overlay: this.codeOverlayEle,
      lang: langSelectorEle.value,
    });
  }
}
