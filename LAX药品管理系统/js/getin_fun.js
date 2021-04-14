// 按后修改弹出框显示
$('#in_change').click(function () {
    $('#change_pop').modal('show')
})
// 选中按钮
$('#selectAll').click(function(){
    if($(this).prop('checked')){
        $('tbody input:checkbox').prop('checked',true);
    }else{
        $('tbody input:checkbox').prop('checked',false);
    }
});
$('tbody input:checkbox').click(function(){
    if($('tbody input:checkbox').length == $('tbody input:checked').length){
        $('#selectAll').prop('checked',true);
    }else{
        $('#selectAll').prop('checked',false);
    }
})

var drugData = [
    {
        id:1,
        name_sp:'丁螺环酮片[一舒]5mg*60片',
        class:'抗焦虑药和镇静催眠药',
        batch:'9448644',
        address:'江苏',
        company:'江苏恩华药业股份有限公司',
        ex_date:'2022-11-14',
        num:100,
        price:20.00,
        a_price:2000.00
    },
    {
        id:2,
        name_sp:'劳拉西泮片1mg*24片',
        class:'抗焦虑药和镇静催眠药',
        batch:'9448643',
        address:'山东',
        company:'山东信谊制药有限公司',
        ex_date:'2022-11-15',
        num:50,
        price:10.00,
        a_price:500.00
    },
    {
        id:3,
        name_sp:'丁螺环酮片[一舒]5mg*60片',
        class:'抗焦虑药和镇静催眠药',
        batch:'9448644',
        address:'江苏',
        company:'江苏恩华药业股份有限公司',
        ex_date:'2022-11-14',
        num:100,
        price:20.00,
        a_price:2000.00
    },
    {
        id:4,
        name_sp:'劳拉西泮片1mg*24片',
        class:'抗焦虑药和镇静催眠药',
        batch:'9448643',
        address:'山东',
        company:'山东信谊制药有限公司',
        ex_date:'2022-11-15',
        num:50,
        price:10.00,
        a_price:500.00
    },
    {
        id:5,
        name_sp:'丁螺环酮片[一舒]5mg*60片',
        class:'抗焦虑药和镇静催眠药',
        batch:'9448644',
        address:'江苏',
        company:'江苏恩华药业股份有限公司',
        ex_date:'2022-11-14',
        num:100,
        price:20.00,
        a_price:2000.00
    },
    {
        id:6,
        name_sp:'劳拉西泮片1mg*24片',
        class:'抗焦虑药和镇静催眠药',
        batch:'9448643',
        address:'山东',
        company:'山东信谊制药有限公司',
        ex_date:'2022-11-15',
        num:50,
        price:10.00,
        a_price:500.00
    },
    {
        id:7,
        name_sp:'劳拉西泮片1mg*24片',
        class:'抗焦虑药和镇静催眠药',
        batch:'9448643',
        address:'山东',
        company:'山东信谊制药有限公司',
        ex_date:'2022-11-15',
        num:50,
        price:10.00,
        a_price:500.00
    },
    {
        id:8,
        name_sp:'劳拉西泮片1mg*24片',
        class:'抗焦虑药和镇静催眠药',
        batch:'9448643',
        address:'山东',
        company:'山东信谊制药有限公司',
        ex_date:'2022-11-15',
        num:50,
        price:10.00,
        a_price:500.00
    },
    {
        id:9,
        name_sp:'劳拉西泮片1mg*24片',
        class:'抗焦虑药和镇静催眠药',
        batch:'9448643',
        address:'山东',
        company:'山东信谊制药有限公司',
        ex_date:'2022-11-15',
        num:50,
        price:10.00,
        a_price:500.00
    },
    {
        id:10,
        name_sp:'劳拉西泮片1mg*24片',
        class:'抗焦虑药和镇静催眠药',
        batch:'9448643',
        address:'山东',
        company:'山东信谊制药有限公司',
        ex_date:'2022-11-15',
        num:50,
        price:10.00,
        a_price:500.00
    }
]
//初始化在这里
/*drugData = JSON.stringify(drugData);
localStorage.setItem('drugs',drugData);*/
var drugs = JSON.parse(localStorage.getItem('drugs'));
var numPerPage = 4;
var totalPage = Math.ceil(drugs.length/numPerPage);
var pageData = getPageData(1,4);
var pagination = document.getElementsByClassName('pagination')[0];
var nextPage = document.getElementsByClassName('nextPage')[0];
var pagecount=1;
renderTable(pageData);
fenye(drugs,numPerPage);
// 获取当前页数据
function getPageData(pageNum,numPerPage){
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
function fenyeadd(arr,numPerPage) {
    var totalPage = Math.ceil(arr.length/numPerPage);
    var nodeLi = document.createElement('li');
    nodeLi.innerHTML = '<a href="#">'+totalPage+'</a>';
    pagination.insertBefore(nodeLi,nextPage);
}
// 将获取的显示在页面
function renderTable(pageData){
    var str = '';
    pageData.forEach(function (v,i) {
        str += `<tr>
            <td><input type="checkbox" /></td>
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
                <button type="button" class="btn btn-info fix">修改</button><button type="button" class="btn btn-danger del">删除</button>
            </td>
        </tr>`;
    })
    $('#dataRender').html(str);
}
// 分页按钮点击
pagination.onclick = function(){
    var e=window.event || arguments[0];
    var target = e.target || e.srcElement;
    console.log(target);
    if(target.parentElement.className.indexOf('prePage') < 0 && target.parentElement.className.indexOf('nextPage') < 0 ){
/*        console.log(target.innerText);*/
        pagecount = +target.innerText;
        var pageData = getPageData(target.innerText,numPerPage);
        renderTable(pageData);
    }
}
$('#pre').click(function () {
    if (pagecount>1){
        pagecount --;
        var pageData = getPageData(pagecount,numPerPage);
        renderTable(pageData)
    }
})
$('#next').click(function () {
    if (pagecount<totalPage){
        pagecount ++;
        var pageData = getPageData(pagecount,numPerPage);
        renderTable(pageData)
    }
})
// 按'+'后弹出添加框显示
$('#in_add').click(function () {
    $('.alert-success').removeClass('in').addClass('hide')
    $('#add_pop').modal('show')
    var preLength = drugs.length;
    $('#drug_id').val(preLength+1);
    if ($('h4').text() == '修改信息'){
        $('h4').text('添加信息')
        $('#name_sp').val(null),
            $('#class').val(null),
            $('#batch').val(null),
            $('#address').val(null),
            $('#company').val(null),
            $('#ex_date').val(null),
            $('#num').val(null),
            $('#price').val(null),
            $('#a_price').val(null)
    }
})
/*修改按钮点击
1.找到该条数据
2.获取其中数据到模态框
3.修改
4.获取所有数据
5.创建成tr》td的格式，放到tbody里面
6.渲染分页
7.可以获取每页的数据*/
$('.fix').click(function () {
    /*    $('.alert-success').removeClass('in').addClass('hide')*/
    $('#add_pop').modal('show');
    if ($('h4').text() == '添加信息'){
        $('h4').text('修改信息')
    }
    var fixbtn = this;
    /*    console.log($(fixbtn).parent().prevAll('td')[9].innerText);*/
    drugs.forEach(function (v,i) {
        if (v.id == $(fixbtn).parent().prevAll('td')[9].innerText){
            $('#drug_id').val(v.id),
                $('#name_sp').val(v.name_sp),
                $('#class').val(v.class),
                $('#batch').val(v.batch),
                $('#address').val(v.address),
                $('#company').val(v.company),
                $('#ex_date').val(v.ex_date),
                $('#num').val(v.num),
                $('#price').val(v.price),
                $('#a_price').val(v.a_price)
        }
    })
})
/*
删除功能
1.所有数据去掉被删除的
2.获取所有数据
3.创建成tr》td的格式，放到tbody里面
4.渲染分页
5.可以获取每页的数据
*/
// 删除按钮点击
$('tbody').delegate('.del','click',function (v,i) {
    var delbtn = this;
    /*console.log($(this).parent().prevAll('td')[9].innerText);*/
    drugs.forEach(function (v,i) {
        if (v.id == $(delbtn).parent().prevAll('td')[9].innerText){
            drugs.splice(i,1);
        }
    })
    $(this).parents('tr').remove();
//渲染
    drugs = JSON.stringify(drugs);
    localStorage.setItem('drugs',drugs);
    drugs = JSON.parse(drugs);
    var pageData = getPageData(pagecount,numPerPage);
    renderTable(pageData);
//修改分页
    var prepagenum = totalPage;
    totalPage = Math.ceil(drugs.length/numPerPage);
    if (totalPage < prepagenum){
        $('.pagination li').eq(-2).remove();
    }
})
// 确认添加/修改事件
$('#add').click(function () {
    if ($('h4').text() == '添加信息'){
        var preLength = drugs.length;
        var addData = {
            id:preLength+1,
            name_sp:$('#name_sp').val(),
            class:$('#class').val(),
            batch:$('#batch').val(),
            address:$('#address').val(),
            company:$('#company').val(),
            ex_date:$('#ex_date').val(),
            num:$('#num').val(),
            price:$('#price').val(),
            a_price:$('#a_price').val(),
        };
        drugs.unshift(addData);
        var newLength = drugs.length;
        if (preLength+1 == newLength){
            $('.alert-success').removeClass('hide').addClass('in')
            setTimeout(function () {
                $('.alert-success').removeClass('in').addClass('hide')
            },3000)
            $('#add_pop').modal('hide')
            $('#drug_id').val(newLength+1);
            drugs = JSON.stringify(drugs);
            localStorage.setItem('drugs',drugs);
            drugs = JSON.parse(drugs);
            var pageData = getPageData(1,4);
            renderTable(pageData);
            //修改分页
            var prepagenum = totalPage;
            totalPage = Math.ceil(drugs.length/numPerPage);
            if (totalPage > prepagenum){
                fenyeadd(drugs,numPerPage);
            }
        }
        console.log(drugs);
    }else if ($('h4').text() == '修改信息'){
        drugs.forEach(function (v,i) {
            if (v.id == +$('#drug_id').val()){
                v.name_sp=$('#name_sp').val();
                v.class=$('#class').val();
                v.batch=$('#batch').val();
                v.address=$('#address').val();
                v.company=$('#company').val();
                v.ex_date=$('#ex_date').val();
                v.num=$('#num').val();
                v.price=$('#price').val();
                v.a_price=$('#a_price').val();
            }
            localStorage.setItem('drugs',JSON.stringify(drugs));
            var pageDate2 = getPageData(pagecount,numPerPage);
            renderTable(pageDate2);
            $('.alert-success').removeClass('hide').addClass('in')
            setTimeout(function () {
                $('.alert-success').removeClass('in').addClass('hide')
            },3000)
            $('#add_pop').modal('hide')
        })
    }
})

// ************************分页按钮还有bug，因为点后修改按钮失效
