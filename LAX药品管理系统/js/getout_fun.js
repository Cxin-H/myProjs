//获取采购入库存储信息
var drugData = JSON.parse(localStorage.getItem('drugs'));
//初始化在这里
drugData = JSON.stringify(drugData);
localStorage.setItem('drugs',drugData);
var drugs = JSON.parse(localStorage.getItem('drugs'));
var numPerPage = 4;
var totalPage = Math.ceil(drugs.length/numPerPage);
var pageData = getPageData(drugs,1,4);
var pagination = document.getElementsByClassName('pagination')[0];
var nextPage = document.getElementsByClassName('nextPage')[0];
var pagecount=1;
renderTable(pageData);
fenye(drugs,numPerPage);
var jilu = [];
// 获取当前页数据
function getPageData(arr,pageNum,numPerPage){
    if(totalPage == pageNum){
        return drugs.slice((pageNum-1)*numPerPage);
    }else {
        return drugs.slice((pageNum-1)*numPerPage,pageNum*numPerPage);
    }
}
// 分页显示
function fenye(arr,numPerPage) {
    var totalPage = Math.ceil(arr.length/numPerPage);
    for(var i=1;i<=totalPage;i++){
        var nodeLi = document.createElement('li');
        nodeLi.innerHTML = '<a href="#">'+i+'</a>';
        pagination.insertBefore(nodeLi,nextPage);
    }
}
// 将获取的显示在页面
function renderTable(pageData){
    var str = '';
    pageData.forEach(function (v,i) {
        str += `<tr>
            <td>${v.id}</td>
            <td>${v.name_sp}</td>
            <td>${v.class}</td>
            <td>${v.batch}</td>
            <td>${v.address}</td>
            <td>${v.company}</td>
            <td>${v.ex_date}</td>
            <td>${v.num}</td>
            <td>${v.price}</td>
            <td>${v.a_price}</td>
            <td>
                <button type="button" class="btn btn-danger del">出库</button>
            </td>
        </tr>`;
    })
    $('#dataRender').html(str);
}
// 将获取的显示在模态框
function jilurenderTable(pageData){
    var str = '';
    pageData.forEach(function (v,i) {
        str += `<tr>
            <td>${v.id}</td>
            <td>${v.name_sp}</td>
            <td>${v.class}</td>
            <td>${v.batch}</td>
            <td>${v.address}</td>
            <td>${v.company}</td>
            <td>${v.ex_date}</td>
            <td>${v.num}</td>
            <td>${v.price}</td>
            <td>${v.a_price}</td>
        </tr>`;
    })
    $('#jiluRender').html(str);
}
// 分页按钮点击
pagination.onclick = function(){
    var e=window.event || arguments[0];
    var target = e.target || e.srcElement;
    console.log(target);
    if(target.parentElement.className.indexOf('prePage') < 0 && target.parentElement.className.indexOf('nextPage') < 0 ){
        /*        console.log(target.innerText);*/
        pagecount = +target.innerText;
        var pageData = getPageData(drugs,target.innerText,numPerPage);
        renderTable(pageData);
    }
}
$('#pre').click(function () {
    if (pagecount>1){
        pagecount --;
        var pageData = getPageData(drugs,pagecount,numPerPage);
        renderTable(pageData)
    }
})
$('#next').click(function () {
    if (pagecount<totalPage){
        pagecount ++;
        var pageData = getPageData(drugs,pagecount,numPerPage);
        renderTable(pageData)
    }
})


// 按'出库记录'后弹出模态框显示
$('#jilu').click(function () {
    $('#jilu_pop').modal('show')
    jilurenderTable(jilu);
    fenye(jilu,numPerPage);
})

/*
删除功能
1.所有数据去掉被删除的
2.获取所有数据
3.创建成tr》td的格式，放到tbody里面
4.渲染分页
5.可以获取每页的数据
*/
// 出库按钮点击
$('tbody').delegate('.del','click',function (v,i) {
    var delbtn = this;
    drugs.forEach(function (v,i) {
        if (v.id == $(delbtn).parent().prevAll('td')[9].innerText){
            var getoutData = drugs.splice(i,1);
            jilu.unshift(getoutData[0]);
        }
    })
    $(this).parents('tr').remove();
//渲染
    drugs = JSON.stringify(drugs);
    localStorage.setItem('drugs',drugs);
    drugs = JSON.parse(drugs);
    var pageData = getPageData(drugs,pagecount,numPerPage);
    renderTable(pageData);
//修改分页
    var prepagenum = totalPage;
    totalPage = Math.ceil(drugs.length/numPerPage);
    if (totalPage < prepagenum){
        $('.pagination li').eq(-2).remove();
    }
})

