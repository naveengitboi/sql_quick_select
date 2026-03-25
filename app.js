const notebook = document.querySelector(".notebook");


// tabs
const tabs = document.querySelectorAll('.tabs');
const inputsSection = document.querySelector('.inputsSection');
// console.log(inputsSection);

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

//replace ele
const replaceInputs = document.querySelectorAll(".replaceInput");
const replaceBtn = document.querySelector(".replaceBtn");
const replaceCheckBoxes = document.querySelectorAll(".replaceChecks");

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

function getParentEle(ele) {
  console.log("Ele", ele.parentElement);
  if (
    ele.nextElementSibling &&
    ele.nextElementSibling.nodeName.toLowerCase() == "textarea"
  ) {
    return ele.nextElementSibling;
  }
  return getParentEle(ele.parentElement);
}

copyBtns.forEach((copyBtn) => {
  copyBtn.addEventListener("click", (e) => {
    console.log({ e });
    const parentEle = getParentEle(e.target);
    handleCopyQuery(parentEle);
  });
});

cutBtns.forEach((cutBtn) => {
  cutBtn.addEventListener("click", (e) => {
    const parentEle = getParentEle(e.target);
    handleCutCopyQuery(parentEle);
  });
});

// replace actions
const getInputs = (input) => {
  replaceInputs.forEach((ipt) => {
    let [name, value] = [ipt.name, ipt.value];
    input[name] = value;
  });
  replaceCheckBoxes.forEach((checkEle) => {
    let [name, value] = [checkEle.name, checkEle.checked];
    input[name] = value;
  });
};
const replaceTxtHandler = (e) => {
  let input = {};
  getInputs(input);
  if (input.source == "") {
    showSnackBar(
      (message = "Please! Enter what you want to replace"),
      (icon = ""),
      (type = "danger")
    );
    return;
  }
  let parem = "g";
  if (input.caseSensitive) {
    parem += "i";
  }
  if (input.search) {
    const pattern = new RegExp(input["source"], parem);
    const replaceList = [...input["content"].matchAll(pattern)];
    console.log("replace", replaceList);
    let searchResult = "";
    for (let i = 0; i < replaceList.length; i++) {
      searchResult += replaceList[i];
      if (i != replaceList.length - 1) {
        searchResult += "\n";
      }
    }
    output.value = searchResult;
    return;
  }
  const pattern = new RegExp(input["source"], parem);
  const replaceResult = input["content"].replaceAll(pattern, input["target"]);
  console.log(replaceResult);
  output.value = replaceResult;
  return;
};

replaceBtn.addEventListener("click", replaceTxtHandler);

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
