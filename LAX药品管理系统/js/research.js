/**
 * Created by yun on 2020/12/15.
 */
window.onload = function(){
    var otab = document.getElementById('theader');
    var obtn = document.getElementById('search_submit');
    var obtn1 = document.getElementById('search_sm');
    var otext = document.getElementById('keyword');
    var olei = document.getElementById('leiBie');
    obtn.onclick = function bb(){
        for(var i=0;i<otab.tBodies[0].rows.length;i++){
            var stab = otab.tBodies[0].rows[i].cells[2].innerHTML.toLowerCase();
            var stext = otext.value.toLowerCase();
            var arr = stext.split(' ');
            otab.tBodies[0].rows[i].style.background = "";
            for(var j = 0;j<arr.length;j++){
                var type = 0;
                if(stab.search(arr[j])!=-1){
                    otab.tBodies[0].rows[i].style.background = "ghostwhite";
                    type =1;
                }
                if(type!= 1){
                    otab.tBodies[0].rows[i].style.display = "none";
                }
            }
        }
    };


    obtn1.onclick = function(){
        for(var i=0;i<otab.tBodies[0].rows.length;i++){
            var stab = otab.tBodies[0].rows[i].cells[1].innerHTML.toLowerCase();
            var slei = olei.value.toLowerCase();
            var Arr = slei.split(' ');
            otab.tBodies[0].rows[i].style.background = "";
            for(var k = 0;k<Arr.length;k++){
                var type = 0;
                if(stab.search(Arr[k])!=-1){
                    otab.tBodies[0].rows[i].style.background = "ghostwhite";
                    type =1;
                }
                if(type!= 1){
                    otab.tBodies[0].rows[i].style.display = "none";
                }
            }
        }
    }
}