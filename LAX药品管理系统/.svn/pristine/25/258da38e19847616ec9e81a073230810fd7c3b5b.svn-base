var users;
function usersTable(){
     users=[{
        id:1000,
        userName:'admin',
        password:123456,
        privacy:0
    },{
        id:1001,
        userName:'zhangsan',
        password:123456,
        privacy:1
    },{
        id:1002,
        userName:'lisi',
        password:123456,
        privacy:1
    }
    ];
    return users;
}
usersTable();
//初始化
//localStorage.setItem('users',JSON.stringify(users));
var isOK=false;
$("#btnLogin").click(function () {
    var users= JSON.parse(localStorage.getItem('users'));
    for(var i=0;i<users.length;i++){
        if(users[i].userName==$("#uname").val() && users[i].password==$("#pwd").val()){
            isOK=true;
        }
    }
    if($("#uname").val()=='' || $("#pwd").val()==''){
        alert('用户名和密码不能为空');
    }else if(isOK==true){
        alert('登录成功');
        location.href='../html/home.html';
    } else{
        alert('用户名或密码错误');
        console.log(users);
    }
});

$('#btnRegister').click(function(){
    location.href='../html/register.html';
});