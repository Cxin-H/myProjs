
var users= JSON.parse(localStorage.getItem('users'));
var isOK=false;
$('#btnBack').click(function(){
    location.href='login.html';
});
$('#btnRegister').click(function(){
    for(var i=0;i<users.length;i++){
        if(users[i].userName===$("#uname").val() ){
            isOK=true;
        }
        var userID = users[users.length-1].id+1;
    }
    if($("#uname").val()=='' || $("#pwd").val()=='' || $("#rePwd").val()==''){
        alert('用户名和密码不能为空');
    }else if(isOK==true){
        alert('用户名已存在');
    }else if($("#pwd").val().length<6 || $("#pwd").val().length>12){
        alert('密码位数不在6-12');
    }
    else if($("#rePwd").val()!=$('#pwd').val()){
        alert('两次输入密码不一致');
    }else{
        users.push({
            id:userID,
            userName:$("#uname").val(),
            password:$("#pwd").val(),
            privacy:1
        });
        alert('注册成功');
        localStorage.setItem('users',JSON.stringify(users));
        console.log(users);
        location.href='login.html';
    }
});