function rest(url, method){

    console.log(url, method);

    let xhr = new XMLHttpRequest(); // ajax

    xhr.onload = function(){
        console.log(xhr.status === 200?xhr.responseText:xhr.statusText);
    }

    
    // open() 메서드는 요청을 준비하는 메서드입니다. (http 메서드, 데이터를 받아올 URL 경로, 비동기 여부)
    xhr.open(method, url, true);

    xhr.send("");
}