// 디버그를 위한 내용
var debug = true;

function print(a){
    if(debug){
        console.log(a)
    }
}

// REST API 실행하는 내용
function rest(url, method){

    print("url : " + url)
    // XMLHttpRequest 객체의 인스턴스를 생성합니다.
    var xhr = new XMLHttpRequest();

    xhr.onload = function () {
        // xhr 객체의 status 값을 검사한다.
        if (xhr.status === 200) {
            print(xhr.responseText)
        }
    }

    // open() 메서드는 요청을 준비하는 메서드입니다. (http 메서드, 데이터를 받아올 URL 경로, 비동기 여부)
    xhr.open(method, url, true);

    // send() 메서드는 준비된 요청을 서버로 전송하는 메서드입니다. (서버에 전달될 정보)
    xhr.send("");
}