function testCollision(div1,div2){
    if( div1.offsetLeft + div1.clientWidth < div2.offsetLeft ||
        div1.offsetTop + div1.clientHeight  < div2.offsetTop  ||
        div1.offsetLeft > div2.offsetLeft + div2.clientWidth  ||
        div1.offsetTop > div2.offsetTop+div2.clientHeight){
        return false;
    }else{
        return true;
    }
}