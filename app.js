const notebook = document.querySelector(".notebook");


// tabs
const tabs = document.querySelectorAll('.tabs');
const inputsSection = document.querySelector('.inputsSection');
// console.log(inputsSection);

const langSelectorEle = document.querySelector('.langSelector');

const tabsHandler = (currentTab) => {
  Array.from(inputsSection.children).forEach((child) => {
    if (child["dataset"]["tab"] == currentTab["dataset"]["tab"]) {
      child.classList.remove("inActiveTab");
      child.classList.add("activeTab");
    } else {
      child.classList.remove("activeTab");
      child.classList.add("inActiveTab");
    }
  })
}

tabs.forEach((tab) => {
  tab.addEventListener('click', () => tabsHandler(tab));
})


// form
const inputEle = document.querySelectorAll(".input");
const generateBtn = document.querySelector(".generateBtn");
const operations = document.querySelectorAll(".operations");
const output = document.querySelector(".output");
const codeOverLayEle = document.querySelector(".codeOverlay");
const preEle = document.querySelector("pre");

codeHiglighter({overlay:codeOverLayEle, ele:output});

langSelectorEle.addEventListener('change', (e) => {
  codeHiglighter({overlay:codeOverLayEle, lang:e.target.value, ele:output});
})


//replace ele
const replaceInput = document.querySelector(".replaceWith");
const searchInput = document.querySelector(".replaceSource");
const flagsEle = document.querySelector(".flags");
const replaceTxtArea = document.querySelector(".replaceTxt");
const replaceBtn = document.querySelector(".replaceBtn");
const listBtn = document.querySelector(".listBtn");
const matchCount = document.querySelector('.matchCount');
const highlightLayer = document.querySelector('.highlightLayer');

// outputactions btn
const copyBtns = document.querySelectorAll(".copyBtn");
const cutBtns = document.querySelectorAll(".cutBtn");


// diff checkers
const compInputs = document.querySelectorAll('.compareInputs');
const compareBtn = document.querySelector('.compareBtn');

const compareHandler = () => {
  compInputs.forEach((ipt) => {
    const ipts = ipt.value.split("\n");
    console.log("diff ipts ", ipts);
    let content = "";
    for(let item of ipts){
      content += `<div> ${item} </div>`
    }
    ipt.value = content;
  })

}

compareBtn.addEventListener('click', compareHandler);


//copy functionality

copyBtns.forEach((copyBtn) => {
  copyBtn.addEventListener("click", (e) => {
    const parent = copyBtn.dataset.parent;
    const parentEle = document.querySelector(`.${parent}`);
    handleCopyQuery({ele:parentEle});
  });
});

cutBtns.forEach((cutBtn) => {
  cutBtn.addEventListener("click", (e) => {
    const parent = cutBtn.dataset.parent;
    const parentEle = document.querySelector(`.${parent}`);
    handleCopyQuery({ele:parentEle, type:CUT});
  });
});


// replace actions

document.addEventListener('DOMContentLoaded', () => {
  const rep = new RegexHighlightTool({textarea:replaceTxtArea,replaceBtn, searchInput, replaceInput, highlightLayer, matchCount, output, flags:flagsEle, getListBtn:listBtn});
})


// sql
const data = {};

const executeQuery = (data) => {
  let query = "";
  let table = "";
  let seperator = "\n";
  if (data["db"]) {
    table += data["db"] + ".";
  }
  if (data["schema"]) {
    table += data["schema"] + ".";
  }
  if (data["table"]) {
    table += data["table"];
  }

  if (data["seperator"] != "") {
    const sep = new RegExp(data["seperator"]);
    seperator = sep;
    console.log(seperator);
  }
  let insertInto = data["insert"];
  let cols = data["columnsList"].trim().split(seperator);
  let vals = data["values"].trim().split(seperator);
  let colsList = "";
  let valuesList = "";
  let newLine = data["newLine"];
  for (let i = 0; i < cols.length; i++) {
    let col = "";
    let j = 0;
    for (let j = 0; j < cols[i].length; j++) {
      if (cols[i][j] != ",") {
        col += cols[i][j];
      }
    }
    colsList += col + " " + (insertInto ? "" : data["dataType"]);
    if (i != cols.length - 1) {
      colsList += ",";
      if (newLine) colsList += "\n";
    }
  }
  for (let i = 0; i < vals.length; i++) {
    valuesList += vals[i];
    if (i != vals.length - 1) {
      valuesList += ",";
    }
  }
  if (data["insert"]) {
    query += `INSERT INTO ${table} (${colsList}) 
        VALUES (${valuesList})`;
  } else {
    query += colsList;
  }
  output.value = query;
};

const generateHandler = (e) => {
  Array.from(inputEle).forEach((ele) => {
    const inputEle = ele.children[1];
    const name = inputEle.name;
    data[name] = inputEle.value;
    if (name == "insert") {
      data[name] = inputEle.checked;
    }
  });
  Array.from(operations).forEach((ele) => {
    const name = ele.name;
    data[name] = ele.checked;
  });
  console.log(data);
  executeQuery(data);
};

generateBtn.addEventListener("click", generateHandler);




// code highlighter

output.addEventListener('input', () => {
  syncScroll({parent:output, child:preEle});
  codeHiglighter({overlay:codeOverLayEle, ele:output, lang:langSelectorEle.value});
  syncScroll({parent:output, child:preEle});
});


output.addEventListener('scroll', () => {
  syncScroll({parent:output, child:preEle});
})