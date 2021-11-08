function rest(url, method){
    console.log(url, method);

    let xhr = new XMLHttpRequest();

    xhr.onload = function(){
        if(xhr.status === 200){
            console.log(xhr.responseText);
        } else {
            console.log("something Error")
        }
    }

    xhr.open(method, url, true);
    xhr.send();
}