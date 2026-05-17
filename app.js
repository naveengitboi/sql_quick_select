

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

  const query = new SqlQueryGenerator();
})



// code highlighter

output.addEventListener('input', () => {
  syncScroll({parent:output, child:preEle});
  codeHiglighter({overlay:codeOverLayEle, ele:output, lang:langSelectorEle.value});
  syncScroll({parent:output, child:preEle});
});


output.addEventListener('scroll', () => {
  syncScroll({parent:output, child:preEle});
})

output.addEventListener('keydown', (e) =>{
    let isCtrl = e.ctrlKey || e.metaKey;
    if(isCtrl && e.key.toLowerCase() == 'x'){
        codeHiglighter({overlay:codeOverLayEle, ele:output, lang:langSelectorEle.value});
    }
});

