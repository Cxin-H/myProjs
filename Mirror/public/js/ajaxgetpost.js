/**
 * Created by Administrator on 2020/12/28.
 */
function ajax(json){
    var xhr = null;
    if(window.XMLHttpRequest){//chorme   兼容性处理
        xhr = new XMLHttpRequest();
    }else{//ie6-11
        xhr = new ActiveXObject('Microsoft.XMLHTTP')
    }
    xhr.onreadystatechange = function(){
        if(xhr.readyState == 4){//readyState的值为4的时候，代表响应就绪
            if(xhr.status>=200 && xhr.status<300  ||  xhr.status==304){
                json.fun(JSON.parse(xhr.responseText));//外面获取不到数据
            }
        }
    }
    switch (json.type.toLowerCase()){
        case 'get':
            if(json.jsonData){
                xhr.open(json.type,json.url+'?'+json2Url(json.jsonData),true);
            }else{
                xhr.open(json.type,json.url,true);
            }
            xhr.send();
            break;
        case 'post':
            xhr.open('post',json.url,true);
            xhr.setRequestHeader('Content-Type','application/json');
            xhr.send(JSON.stringify(json.jsonData));
            break;
        default :
            console.log('请输入正确的请求方法')
    }

}
//json数据转成url参数
function json2Url(json){
    /*  name=value&name2=value2*/
    var arr=[];
    for(var key in json){
        arr.push(key+'='+json[key]);
    }
    return arr.join('&');
}