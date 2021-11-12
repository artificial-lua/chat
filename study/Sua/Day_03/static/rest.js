function rest(url, method, savedCookie){

    console.log(url,method); //웹브라우저의 콘솔에서 보여준다

    let xhr = new XMLHttpRequest(); //ajax

    xhr.onload = function(){ //page가 로드 되었을 때, 
        if(xhr.status == 200){ //성공
            console.log(xhr.responseText); //웹브라우저의 콘솔에 응답받은 내용 출력

            const response = JSON.parse(xhr.responseText);

            savedCookie(response);

        }
    }

    //open() 메서드 요청을 준비하는 메서드
    xhr.open(method,url,true); //get, 쿼리포함 url, 비동기여부
    xhr.send("");
}
