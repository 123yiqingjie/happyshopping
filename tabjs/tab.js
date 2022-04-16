var that;
class Tab {
    constructor(id){
        // 获取整个Tab的id
        that = this;
        this.main = document.querySelector(id);
        // 获取所有的小li和section元素
        this.lis = this.main.querySelectorAll("li");
        this.section = this.main.querySelectorAll("section");
        // 获取添加功能的元素
        this.add = this.main.querySelector(".tabadd");
        // li的父元素
        this.ul = this.main.querySelector('.firstnav ul:first-child');
        // 获取section的父元素
        this.fsection = this.main.querySelector('.tabcon');
      
        // 给所有的元素绑定事件
        this.init();    
    }
    init (){
        this.updatenode();
        this.add.onclick = this.addTab;
         // init初始化操作让相关的元素绑定事件
        for (var i= 0;i< this.lis.length; i++){
            this.lis[i].index = i;
            this.lis[i].onclick = this.toggleTab;
            this.remove[i].onclick = this.removeTab;
            // 给所有的span绑定双击事件
            this.spans[i].ondblclick = this.editTab;
            this.section[i].ondblclick =this.editTab;

        }
    }
    // c更新获取所有的li和section
    updatenode() {
        this.lis = this.main.querySelectorAll("li");
        this.secton = this.main.querySelectorAll("section");
        // 因为我们要动态添加元素，需要重新获取对应的元素
        this.remove = this.main.querySelectorAll('.icon-cuowuguanbiquxiao-yuankuang');
        // 获取所有的span
        this.spans = this.main.querySelectorAll(".firstnav li span:first-child");
    }
    // 1.切换功能
    toggleTab(){
        that.clearClass();
        this.className = "liactive";
        that.section[this.index].className = "conactive";
    }
    //清除样式
    clearClass(){
        for(var i = 0;i < this.lis.length; i++){
           
            this.secton[i].className = ' ';
            this.lis[i].className ='';
        }
    }
    // 2.添加功能
    addTab(){
        // alert("11")
        // 创建Li元素和section元素
        that.clearClass();
        var random = Math.random();
        var li = '<li ><span>新</span><span class="iconfont icon-cuowuguanbiquxiao-yuankuang"></span></li>';   
        var  section = '<section>新增'+random+'</section>';
        // 把这两个元素追加到对应的父元素
        that.ul.insertAdjacentHTML("beforeend",li);
        that.fsection.insertAdjacentHTML("beforeend",section);
        that.init();

    }
    // 3.删除功能
    removeTab(e){
        e.stopPropagation();
        var  index = this.parentNode.index;
        console.log(index);
        that.lis[index].remove();
        that.section[index].remove();
        that.init();
        // 如果我们删除的不是选定状态的li，原来的选中状态li保持不变
        if(document.querySelector('.liactive'))return;
        // 当我们删除了选中状态的li，让前一个li处于选定状态
        index--;
       that.lis[index] &&that.lis[index].click();
        
    }
    // 4.修改功能
    editTab(){
        // 双击禁止选中文字
         window.getSelection ? window.getSelection().removeAllRanges() : document.selection.empty();
         var str = this.innerHTML;
        this.innerHTML= '<input type="text"></input>';
        // 获取文本框的input
        var input = this.children[0];
        input.value = str;
        // 文本框里面的文字处于选定状态
        input.select();
        input.onblur = function(){
            // 这里的this指向的是onblur事件的调用者input
            this.parentNode.innerHTML = this.value;
        };
        input.onkeyup = function(e){
            if(e.keyCode===13){
                // 手动调用失去焦点事件blur
                this.blur();
            }
        }

    }
}
new Tab("#tab")