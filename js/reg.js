// 表单验证的正则表达式
window.onload = function(){
    var regtel = /^1[3|4|5|6|7|8|9]\d{9}$/;
    var tel = document.querySelector('#tel');
    var span = document.querySelector('span')
    tel.onblur = function(){
        if(regtel.test(this.value)){
            console.log(true);
            console.dir(span);
            span.className = 'success';
             span.innerHTML = '<i class="success_icon"></i>格式正确</span>';
        }else{
            console.log(false);
            span.className = 'error';
            span.innerHTML = '<i class="error_icon"></i>格式输入不正确，请重新输入</span>';
        }
    }
}
