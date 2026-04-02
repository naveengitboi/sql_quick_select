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



async function handleCopyQuery(ele){
    let data = "";
    if(ele.type.toLowerCase() == "textarea"){
        data = ele.value;
    }else{
        data = ele.textContent;
    }
    if(navigator.clipboard){
        await navigator.clipboard.writeText(data);
        showSnackBar(message="Copy Succeed");
    }
    
}


async function handleCutCopyQuery(ele){
    handleCopyQuery(ele);
    if(ele.type.toLowerCase() == 'textarea'){
        ele.value = "";
        // console.log("Cut ele ", ele);
        // console.log("ele ", ele.value);
    }else{
        ele.textContent = "";
    }
    return;
}


function clearContent(ele){
    if(ele.type.toLowerCase() == 'textarea'){
        ele.value = "";
        // console.log("Cut ele ", ele);
        // console.log("ele ", ele.value);
    }else{
        ele.textContent = "";
    }
    return;
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

function replace_func(searchValue, newValue, content, params="g"){
    const pattern = new RegExp(searchValue, params);
    const replaceResult = content.replace(pattern, newValue);
    // console.log(replaceResult, pattern);
    return replaceResult;
}

function search_func(searchValue, content, params="g"){
    const pattern = new RegExp(searchValue, params);
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
    console.log(targetEle);
}