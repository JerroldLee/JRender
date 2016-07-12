# PRE
* 选择器，属性样式等方法基于jquery
* 可以for循环和if语句
* 用过临时的绑定名字来统一给模板绑定事件
* 方便使用过滤器功能
* 通过 ```?ob.xx?``` 载入数据，通过 ```|``` 分割过滤器

# 大概

会输出 ```JRender``` 全局变量，输出使用方法为
```
render({
    aim://目标载入模板的元素,
    data://模板接入的数据,
    template://模板字符串,
    append:true//可选，为true表示追加内容到aim元素里面，默认为删除相关元素里面的内容
});
```
```
setFilter({
    filter1://过滤名称和值
});
```
```
setEvent({
    dmname://载入事件的dom的名字
});
```

代码例子

```
<div id="cont"></div>
<!-- 如下的是html模板，一般情况最好把所有的模板放到一个文件夹中，然后按需加载，这里只是简单模拟一下 -->
<!-- 使用REFtitle，可以通过setEvent里面引用title来引用相关dom -->
<script src="jquery.min.js"></script>
<script src="JRender.js"></script>
<script type="text/plain" id="tmp">
    <div>
        <div ?REFtitle?>?title?</div>
        <div>?content|length?个</div>
        <div ?REFfoot?>?footer?</div>
    </div>
    <!-- pg是数组的子属性，自定义名字，content是data.content, -->
    [[for pg in content]]
    <div ?REFct?>
        <span>?pg.name?</span>
        <span>?pg.age?</span>
        <!-- pg.loves数据是是["sing","play"]这种，如果没有相关属性，不显示 -->
        [[for lv in pg.loves]] ?lv? [[/for]]
    </div> [[/for]]
</script>
<script>
//模拟ajax的数据回调
var data = {
    title: "hello world",
    content: [{
        name: "liu",
        age: 28
    }, {
        name: "jiang",
        age: 29,
        loves: ["run", "sing", "play"]
    }, {
        name: "zhang",
        age: 27
    }],
    footer: "列表内容"
};

var rd = new JRender();

//设置事件，这里的title和foot为前面模板中的?REFtitle?,?REFfoot?
rd.setEvent({
    title: function(dms) { //这里的dms为引用前面
        // alert(1)
        dms.on("click", function() {
            alert(1)
        });
    },
    foot: function(dms, ct) { //第一个dms为引用?REFfoot?的dom，dms是形参可以用任何写法，第二个ct引用?REFct?，从第二个参数开始如果要用相关dom就要把形参直接写成那个名字
        dms.on("click", function() {
            ct.toggle();
        })
    }
})

/**
默认过滤器有
upper //变成大写, 
lower//变成小写, 
length//如果是数组，得到长度, 
safe//如果是html字符串，则直接输出字符串，而不会解析成html内容
**/
rd.setFilter({
    length: function(da, i, lg) { //设置过滤器，类似于?content|length?，第一个参数返回实际的数据，i表示index值（比如这个dom是在for循环里面的），lg表示for循环dom的总个数。。最后return的值表示最终显示的值
        if (da.slice) {
            return da.length;
        } else {
            return 0;
        }
    }
});

rd.render({
    data: data, //数据 
    template: document.getElementById("tmp").innerHTML, //模板 
    aim: "#cont" //被插入的目标容器，能用选择器字符串或者jq对象 
    append: true //可选,为true表示内容为追加进去，不会删除目标aim元素里面的内容
});
</script>

```
具体例子请看 example 文件夹 可以使用 require 来引用相关类