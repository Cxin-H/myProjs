//初始化按钮
$('#initBtn').click(function(){
    var initData = [
        {
            xuHao:'001',
            pillName:'丁螺环酮片',
            pillCla:'抗焦虑药和镇静催眠药',
            pillNum:'5mg*60片',
            facName:'山东信谊制药有限公司',
            saleTime:'',
            saleNum:2,
            price:42.00,
            totalPrice:84.00,
            payPrice:84.00,
            kuCun:5
        },
        {
            xuHao:'002',
            pillName:'劳拉西泮片',
            pillCla:'抗焦虑药和镇静催眠药',
            pillNum:'5mg*60片',
            facName:'山东信谊制药有限公司',
            saleTime:'',
            saleNum:2,
            price:42.00,
            totalPrice:84.00,
            payPrice:84.00,
            kuCun:5
        },
        {
            xuHao:'003',
            pillName:'劳拉东泮片',
            pillCla:'抗焦虑药和镇静催眠药',
            pillNum:'5mg*60片',
            facName:'山东信谊制药有限公司',
            saleTime:'',
            saleNum:2,
            price:42.00,
            totalPrice:84.00,
            payPrice:84.00,
            kuCun:5
        }
    ];
    //存储初始化数据
    initData = JSON.stringify(initData);//把需要存储的数据转成 字符串
    localStorage.setItem('pillData',initData);
});
    var fenYe = $('.pagination');
    var numPerPage=5;
    function getPage(total,numPerPage){

    }

    //得到所有本地存储的数据
    var getPillData = localStorage.getItem('pillData');
        getPillData = JSON.parse(getPillData); //把得到的存储的数据转成 数组对象

    //把数据渲染到页面上
    //销售时间函数
    function datesTime(){
        var date = new Date();
        var year = date.getFullYear();
        var month = date.getMonth()+1;
        if(month<=9){
            month='0'+month;
        }
        var day = date.getDate();
       return year+'/'+month+'/'+day;
    }
    var dates=datesTime();//调用销售时间函数
    renderTable(getPillData);//把得到的所有数据通过函数renderTable传数据
    function renderTable(pageData){
        var str = '';
        pageData.forEach(function(v,i){
            str +=`
            <tr>
       <td><input type="checkbox"/>${v.xuHao}</td>
       <td>${v.pillName}</td>
       <td>${v.pillCla}</td>
       <td>${v.pillNum}</td>
       <td>${v.facName}</td>
       <td>${dates}</td>
       <td>${v.saleNum}</td>
       <td>${v.price}</td>
       <td>${v.totalPrice}</td>
       <td>${v.payPrice}</td>
       <td>${v.kuCun}</td>
       <td>
           <button class="btn  btn-primary" data-toggle="modal" data-target="#myAdd">添加</button>
           <button class="btn btn-info">修改</button>
            <button class="btn btn-danger">删除</button>
       </td>
    </tr>
            `;
        });
        //通过tBody的id=dataRender把数据添加到tBody中
        $('#dataRender').html(str);
    }

    //添加

   $('#add').click(function(){
       var preLength = getPillData.length;
       var formData = {};
       var formArr = $('#Form').serializeArray();
       console.log(formArr);
       //$.each(formArr, function() {
       //    formData[this.name] = this.value;
       //});
       //formData ={
       //
       //};
       //addData = JSON.stringify(formData);
       var newLength = getPillData.unshift(formData); //数据添加后的数组长度
       //console.log(newLength);
       if(preLength+1 == newLength){
           alert('添加成功');
           pillData = formData;
           pillData = JSON.stringify(pillData);
           //将添加后的数据重新存到本地存储      【对应的值（formData）存在，则更新（addData）该键对应的值。】
           localStorage.setItem('formData',pillData);
       }
   });


