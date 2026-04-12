const makerInputData = {}
const templateInputEle = document.querySelector('.templateInput');
const repInputContainer = document.querySelector('.repInputContainer');
const addVariableBtn = document.querySelector('.addVariableBtn');
const makerBtn = document.querySelector('.makerActionBtn');
const addLineBreakerBtn = document.querySelector('.addLineBreakerBtn');
const LINE_BREAK = '\n\n\n---### UNIVERSAL_BREAK_MIGHT_NOT_EXIST ###---\n\n\n'

const outputEle = document.querySelector(".output");
const codeOverlayEle = document.querySelector(".codeOverlay");
let idTag = 1;




addVariableBtn.addEventListener("click", () => {
    const divEle = document.createElement("div");
    divEle.className = "repInput";
    divEle.id = idTag;

    divEle.innerHTML = `
            <p class="idTagName">${idTag}</p>
            <textarea name="variableInput" class="variableInput"
                placeholder="eg:put in seperate line each function"></textarea>

            <div class="variableTxtContainer">
                <textarea name="transformerTxt" class="variableTxt" placeholder="Paste here"></textarea>

                <div class="variableTxtActions">
                <button class="button addLineBreakerBtn">
                    Add Line Break
                </button>
                <input type="text" name="customeSeperator" class="customeSeperator"
                    placeholder="or seperator (, | ;)" />
                
                <input type="text" name="useSeperator" class="useSeperator"
                    placeholder="Inplace Seperator?(y/n)" />
                </div>
            </div>


            <div class="repInputDelete">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"
                class="icon icon-tabler icons-tabler-filled icon-tabler-trash-x">
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path
                    d="M20 6a1 1 0 0 1 .117 1.993l-.117 .007h-.081l-.919 11a3 3 0 0 1 -2.824 2.995l-.176 .005h-8c-1.598 0 -2.904 -1.249 -2.992 -2.75l-.005 -.167l-.923 -11.083h-.08a1 1 0 0 1 -.117 -1.993l.117 -.007h16zm-9.489 5.14a1 1 0 0 0 -1.218 1.567l1.292 1.293l-1.292 1.293l-.083 .094a1 1 0 0 0 1.497 1.32l1.293 -1.292l1.293 1.292l.094 .083a1 1 0 0 0 1.32 -1.497l-1.292 -1.293l1.292 -1.293l.083 -.094a1 1 0 0 0 -1.497 -1.32l-1.293 1.292l-1.293 -1.292l-.094 -.083z" />
                <path
                    d="M14 2a2 2 0 0 1 2 2a1 1 0 0 1 -1.993 .117l-.007 -.117h-4l-.007 .117a1 1 0 0 1 -1.993 -.117a2 2 0 0 1 1.85 -1.995l.15 -.005h4z" />
                </svg>
            </div>
    `;

    repInputContainer.appendChild(divEle);
    idTag++;
    // Delete functionality
    divEle.querySelector(".repInputDelete").addEventListener("click", () => {
        showSnackBar({
            message : `Deleted Variable`,
            type:'danger'
        });
        divEle.remove();
    });


    const addLineBreakerBtn = divEle.querySelector('.addLineBreakerBtn');
    
    const variableTxtEle = divEle.querySelector(".variableTxt");
    
    addLineBreakerBtn.addEventListener('click', (e) => handleLineBreaker(e, variableTxtEle));
    
});


function getArgsOfFunc(txt){
    let startIdx = txt.indexOf('(') + 1;
    let endIdx = txt.indexOf(')');
    let args = txt.substring(startIdx, endIdx).split(',');
    return args;
}

function vecDivsHandler(divs,maxIterator){
    let result = [];
    for(let i = 0; i < maxIterator; i++){
        let currTemplate = templateInputEle.value;
        for(let j = 0; j < divs.length; j++){
            let ops = divs[j].get("operations"); 
            let varsList = divs[j].get("variables");
            let idx = i;
            if(i >= varsList.length){
                idx = varsList.length - 1;
            }

            let currQuery = varsList[idx];

            for(let o = 0; o < ops.length; o++){
                let trans = ops[o].trim();
                
                if(trans.toLowerCase().startsWith("replace(") && trans.toLowerCase().endsWith(")")){
                    let args = getArgsOfFunc(trans);
                    let repflags = ((args.length > 2) && (args[2].length > 0)) ? args[2] : "gi";
                    currQuery = replace_func(args[0], args[1], currQuery, repflags);
                }else if(trans.toLowerCase().startsWith('{') && trans.toLowerCase().endsWith('}')){
                    currTemplate = replace_func(trans, currQuery, currTemplate, "g");
                }
            }
        }
        result.push(currTemplate);
    }

    return result;
}

function handleMakerFunc(e) {
    const vecDivs = [];
    let idx = 0;
    const repInputEles = document.querySelectorAll('.repInput');
    const joinWithEle = document.querySelector('.joinWith').value;
    let output = "";
    let maxIterator = 0;
    repInputEles.forEach(divEle => {
        const mp = new Map();
        const variableInputEle = divEle.querySelector('.variableInput');
        const variableTxtEle = divEle.querySelector('.variableTxt');
        const customeSeperatorEle = divEle.querySelector(".customeSeperator");
        const useSeperatorEle = divEle.querySelector(".useSeperator");
        let seperator = LINE_BREAK;

        
        if(customeSeperatorEle.value.length > 0){
            seperator = customeSeperatorEle.value;
        }
        let variableTxtList = [];
        const transformsList = variableInputEle.value.trim().split('\n').map(item => item.trim()).filter((item) => (item.trim()).length > 0);
        if(useSeperatorEle.value.toLowerCase() == 'y' || useSeperatorEle.value.toLowerCase() == 'yes' || useSeperatorEle.value.toLowerCase()  == '1'){
            variableTxtList = variableTxtEle.value.trim().split(seperator).map(item => item.trim()).filter((item) => (item.trim()).length > 0).map((item) => item += seperator);
        }else{
            variableTxtList = variableTxtEle.value.trim().split(seperator).map(item => item.trim()).filter((item) => (item.trim()).length > 0);
        }

        mp.set("operations", transformsList);
        mp.set("variables", variableTxtList);
        maxIterator = Math.max(maxIterator, variableTxtList.length);
        
        vecDivs.push(mp);
        
    })

    let resultList = vecDivsHandler(vecDivs,maxIterator);
    let join = ",\n";
    if(joinWithEle.length > 0){
        join = joinWithEle.replace(/\\n/g, '\n').replace(/\\t/g, '\t').replace(/\\r/g, '\r');
    }
    for(let i = 0; i < resultList.length; i++){
        if(i == resultList.length - 1){
            output += resultList[i];
        }else{
            output += resultList[i] + join;
        }
    }
    outputEle.value = output;
    codeHiglighter({ele:outputEle, overlay:codeOverLayEle, lang:langSelectorEle.value})
}

makerBtn.addEventListener('click', handleMakerFunc);











