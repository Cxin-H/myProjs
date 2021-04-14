    //左侧的二级菜单
     var firstNavs = document.querySelectorAll('.firstNav');
     for(var i=0;i<firstNavs.length;i++){
        firstNavs[i].onclick = function(){
             for(var j=0;j<firstNavs.length;j++){
                firstNavs[j].parentNode.classList.remove('actives');
             }
             this.parentNode.classList.add('actives');
        }
     }

    //获取日期
    var riQi;
    setInterval(function(){
        dateTime();
    },1000);
    function dateTime(){
        var date = new Date();
        var year = date.getFullYear();
        var month = date.getMonth()+1;
        if(month<=9){
            month='0'+month;
        }
        var day = date.getDate();
        var hour = date.getHours();
        if(hour<=9){
            hour='0'+hour;
        }
        var min = date.getMinutes();
        if(min<=9){
            min='0'+min;
        }
        var sec = date.getSeconds();
        if(sec<=9){
            sec='0'+sec;
        }
        riQi = year+'年'+month+'月'+day+'日'+''+hour+':'+min+':'+sec;
        $('#dates').html(riQi);
    }

     //存储的cookie的name值 ：users.username
     // $('#names').html($.cookie('username'));

      //退出登录
      var back = document.getElementById('backLogin');
        back.onclick = function(){
            location.href = '../html/login.html';
        };

    /*左侧菜单显示不同页面*/
    $('ul').delegate('li','click',function(){
        $('#right').load(this.dataset.src);

    });
    /*左侧二级菜单*/
   $('.dropDown').delegate('div','click',function(){
       //console.log(this.dataset.src);
       $('#right').load(this.dataset.src);
   });


