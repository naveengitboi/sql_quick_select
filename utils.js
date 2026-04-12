const COPY = 'copy';
const CUT = 'cut';

function showSnackBar({message="Event Succeed", icon="",type="regular", duration=3000}={}){
    const sb = document.querySelector(".snackbar");
        sb.innerHTML = `${icon}${message}!`;
        if(type == 'danger'){
            sb.style.backgroundColor = "red";
        }else if(type == 'sucess'){
            sb.style.backgroundColor = 'rgba(0, 159, 0, 1)';
        }else{
            sb.style.backgroundColor = 'rgb(62,62,62)';
        }
        sb.classList.add("show")
        let intervalId;
        intervalId = setTimeout(() => {
            sb.classList.remove("show");
            clearInterval(intervalId)
        }, duration);
}

function syncScroll({parent=null, child=null}={}){
    requestAnimationFrame(() => {
        child.scrollTop = parent.scrollTop;
        child.scrollLeft = parent.scrollLeft;
  });

}

function codeHiglighter({ele=null,overlay=null, lang="plaintext", refresh=true}={}){
    overlay.classList.forEach(cls => {
        if(cls.startsWith('language')){
            overlay.classList.remove(cls);
        }
    })
    let txt;
    if(ele.localName == 'textarea'){
        txt = ele.value;
        if(ele.value.endsWith('\n')){
            txt += '\n';
        }
    }else{
        txt = ele.innerText;
        if(ele.innerText.endsWith('\n')){
            txt += '\n';
        }
    }
    overlay.classList.add(`language-${lang}`);
    if(refresh){
        delete overlay.dataset.highlighted;
    }
    overlay.textContent = txt;
    hljs.highlightElement(overlay);
    syncScroll({parent:ele, child:overlay});
}


function debouncer(fn, delay=300){
    let timer;
    return function(...args){
        clearTimeout(timer);
        timer = setTimeout(()=>{
            fn.apply(this, args);
        }, delay);
    }
}

async function handleCopyQuery({ele=null, type=COPY}={}){
    let data = "";
    if(ele.localName.toLowerCase() == "textarea"){
        data = ele.value;
        if(type == CUT){
            ele.value = '';
        }
    }else{
        data = ele.textContent;
        if(type == CUT) ele.textContent = '';
    }
    if(navigator.clipboard && data){
        await navigator.clipboard.writeText(data);
        showSnackBar({message:`${type} Succeed`});
    }
    
}


function getFrequency(container){
    const hMap = new Map();
    for(item of container){
        hMap.set(item, hMap.get(item) +1 || 1);
    }
    return hMap;
}

function removeDuplicates(container){
    const hMap = new Map();
    for(item of container){
        hMap.set(item, true);
    }
    return Array.from(hMap.keys())
}

function compareMaps(sourceMap, targetMap, considerDuplicates){
    const presentInTarget = "";
    const missingFromTarget = "";
    for(let [key, val] of sourceMap){
        if(targetMap.has(key)){
            presentInTarget += (key) + "\n";
        }else{
            missingFromTarget += (key) + "\n";
        }
    }

    return [presentInTarget, missingFromTarget];
}



// replace function

function replace_func(searchValue, newValue, content, flags="gi"){
    const pattern = new RegExp(searchValue, flags);
    const replaceResult = content.replace(pattern, newValue);
    // console.log(replaceResult, pattern);
    return replaceResult;
}

function search_func(searchValue, content, flags="gi"){
    const pattern = new RegExp(searchValue, flags);
    const matchList = [...content.match(pattern)];
    let searchResult = "";
    for (let i = 0; i < matchList.length; i++) {
      searchResult += matchList[i];
      if (i != matchList.length - 1) {
        searchResult += "\n";
      }
    }
    return searchResult;
}

// line breaker
function handleLineBreaker(e, targetEle) {
    targetEle.value += LINE_BREAK;
    targetEle.textContent = targetEle.value;
}