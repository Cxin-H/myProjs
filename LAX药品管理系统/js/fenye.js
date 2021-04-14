/*
var arr = [1,2,3,4,5,6,7,8,9];
var numPerPage = 5;

var pagination = document.getElementsByClassName('pagination')[0];
var nextPage = document.getElementsByClassName('nextPage')[0];
var totalPage = Math.ceil(arr.length/numPerPage);
for(var i=1;i<=totalPage;i++){
    var nodeLi = document.createElement('li');
    nodeLi.innerHTML = '<a href="#">'+i+'</a>';
    pagination.insertBefore(nodeLi,nextPage);
}
pagination.onclick = function(){
    var e=window.event || arguments[0];
    var target = e.target || e.srcElement;
    if(target.parentElement.className.indexOf('prePage') < 0 && target.parentElement.className.indexOf('nextPage') < 0 ){
        console.log(target.innerText)
        /!* 每页条数的满的  (页码-1)*每页条数  ~   页码*每页条数 -1
         最后一页     (页码-1)*每页条数  ~   arr.length-1*!/
        var pageData=[];
        if(target.innerText == totalPage){
            pageData= arr.slice((target.innerText-1)*numPerPage);
        }else{
            pageData= arr.slice((target.innerText-1)*numPerPage,target.innerText*numPerPage)
        }
        console.log(pageData);
    }
}
*/
