function rest(url, method){
console.log(url,method);
let xhr = new XMLHttpRequest(); //ajax
xhr.onload = function(){
    if(xhr.status == 200){
        console.log(xhr.responseText);
    }
}

   //open() 메서드 요청을 준비하는 메서드
   xhr.open(method,url,true);
   xhr.send("");
}
