function showSnackBar(message="Event Succeed", icon="",type="regular", duration=3000){
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
        console.log("Cut ele ", ele);
        console.log("ele ", ele.value);
    }else{
        ele.textContent = "";
    }
    return;
}


function clearContent(ele){
    if(ele.type.toLowerCase() == 'textarea'){
        ele.value = "";
        console.log("Cut ele ", ele);
        console.log("ele ", ele.value);
    }else{
        ele.textContent = "";
    }
    return;
}