function getCookie(name) { //원하는 쿠키의 이름을 넣어서 쿠키가 있으면 value return 없으면 null return
    var value = document.cookie.match('(^|;) ?' + name + '=([^;]*)(;|$)');
    return value? value[2] : null;
}

function setCookie(name, value) {
    document.cookie = name + "=" + value
}

function delCookie(arr){
    for(i = 0; i < arr.length; i++){
        document.cookie = arr[i] + '=; expires=Thu, 01 Jan 1999 00:00:10 GMT;'
    }
}