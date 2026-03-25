const makerInputData = {}
const templateTxt = document.querySelector('.templateInput');
const repInputContainer = document.querySelector('.repInputContainer');
const addVariableBtn = document.querySelector('.addVariableBtn');
const makerBtn = document.querySelector('.makerActionBtn');
const addLineBreakerBtn = document.querySelector('.addLineBreakerBtn');
const LINE_BREAK = '\n\n\n---### UNIVERSAL_BREAK_MIGHT_NOT_EXIST ###---\n\n\n'
let idTag = 1;
addVariableBtn.addEventListener("click", () => {
    const divEle = document.createElement("div");
    divEle.className = "repInput";
    divEle.id = idTag;

    divEle.innerHTML = `
        <p class="idTagName">${idTag}</p>
        <textarea name="variableInput" class="variableInput" 
            placeholder="eg: [\${variable_input}, \${replace(', '')}]"></textarea>

        <div class="variableTxtContainer" >
            <textarea name="transformerTxt" class="variableTxt" 
            placeholder="Paste here"></textarea>

            <div>
                <button class="button addLineBreakerBtn">
                    Add Line Break
                </button>
                <input type="text" name="customeSeperator" class="customeSeperator" />
            </div>
        </div>
        

        <div class="repInputDelete">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                viewBox="0 0 24 24" fill="currentColor"
                class="icon icon-tabler icons-tabler-filled icon-tabler-trash-x">
                <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                <path d="M20 6a1 1 0 0 1 .117 1.993l-.117 .007h-.081l-.919 11a3 3 0 0 1 -2.824 2.995l-.176 .005h-8c-1.598 0 -2.904 -1.249 -2.992 -2.75l-.005 -.167l-.923 -11.083h-.08a1 1 0 0 1 -.117 -1.993l.117 -.007h16zm-9.489 5.14a1 1 0 0 0 -1.218 1.567l1.292 1.293l-1.292 1.293l-.083 .094a1 1 0 0 0 1.497 1.32l1.293 -1.292l1.293 1.292l.094 .083a1 1 0 0 0 1.32 -1.497l-1.292 -1.293l1.292 -1.293l.083 -.094a1 1 0 0 0 -1.497 -1.32l-1.293 1.292l-1.293 -1.292l-.094 -.083z" />
                <path d="M14 2a2 2 0 0 1 2 2a1 1 0 0 1 -1.993 .117l-.007 -.117h-4l-.007 .117a1 1 0 0 1 -1.993 -.117a2 2 0 0 1 1.85 -1.995l.15 -.005h4z" />
            </svg>
        </div>
    `;

    repInputContainer.appendChild(divEle);
    idTag++;
    // Delete functionality
    divEle.querySelector(".repInputDelete").addEventListener("click", () => {
        divEle.remove();
    });
});


function handleMakerFunc(e){
    const repInputEles = document.querySelectorAll('.repInput');

    repInputEles.forEach(ele => {
        console.log("elements ",);
        const transformInputs = ele.children[1].value;
        console.log(ele.children[2].children[0])
        // ele.querySelector('.addLineBreakerBtn').addEventListener('click', (e) => handleLineBreaker(e, ))
    })

}

makerBtn.addEventListener('click', handleMakerFunc)


function handleLineBreaker(e, targetEle){
    const repInputEles = document.querySelector('.variableTxt');
    repInputEles.value += LINE_BREAK;
    repInputEles.textContent = repInputEles.value;
    console.log(repInputEles);
}


addLineBreakerBtn.addEventListener('click', (e) => handleLineBreaker(e, ''));



