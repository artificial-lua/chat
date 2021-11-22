function getCookie(name) {
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