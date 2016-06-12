
<i>pre:选择器，属性样式等方法基于jquery。</i>
<ul>
<li>可以for循环和if语句</li>
<li>用过临时的绑定名字来统一给模板绑定事件</li>
<li>方便使用过滤器功能</li>
<li>通过?ob.xx?载入数据，通过|分割过滤器</li>
</ul>


<h2>大概</h2>
<p>会输出JRender全局变量，输出使用方法为 render({aim://目标载入模板的元素,data://模板接入的数据,template://模板字符串,append:true//可选，为true表示追加内容到aim元素里面，默认为删除相关元素里面的内容})，setFilter({filter1://过滤名称和值}),setEvent({dmname://载入事件的dom的名字})</p>

<h2>代码例子</h2>
<p>
&lt;div id=&quot;cont&quot;&gt;&lt;/div&gt;
<br><br>
&lt;!-- &#22914;&#19979;&#30340;&#26159;html&#27169;&#26495;&#65292;&#19968;&#33324;&#24773;&#20917;&#26368;&#22909;&#25226;&#25152;&#26377;&#30340;&#27169;&#26495;&#25918;&#21040;&#19968;&#20010;&#25991;&#20214;&#22841;&#20013;&#65292;&#28982;&#21518;&#25353;&#38656;&#21152;&#36733;&#65292;&#36825;&#37324;&#21482;&#26159;&#31616;&#21333;&#27169;&#25311;&#19968;&#19979; --&gt;
&lt;!-- &#20351;&#29992;REFtitle&#65292;&#21487;&#20197;&#36890;&#36807;setEvent&#37324;&#38754;&#24341;&#29992;title&#26469;&#24341;&#29992;&#30456;&#20851;dom --&gt;
<br>&lt;script src=&quot;jquery.min.js&quot; &gt;&lt;/script&gt;
<br><br>
&lt;script src=&quot;JRender.js&quot;&gt;&lt;/script&gt;
<br>
   <br> &lt;script type=&quot;text/plain&quot; id=&quot;tmp&quot;&gt;<br>
        &lt;div &gt;<br>
            &lt;div ?REFtitle?&gt;?title?&lt;/div&gt;<br>
            &lt;div&gt;?content|length?&#20010;&lt;/div&gt;<br>
            &lt;div ?REFfoot?&gt;?footer?&lt;/div&gt;<br>
        &lt;/div&gt;<br>
        &lt;!-- pg&#26159;&#25968;&#32452;&#30340;&#23376;&#23646;&#24615;&#65292;&#33258;&#23450;&#20041;&#21517;&#23383;&#65292;content&#26159;data.content, --&gt;<br>
        [[for pg in content]]<br>
        &lt;div ?REFct?&gt;<br>
            &lt;span&gt;?pg.name?&lt;/span&gt;<br>
            &lt;span&gt;?pg.age?&lt;/span&gt; <br>
            &lt;!-- pg.loves&#25968;&#25454;&#26159;&#26159;[&quot;sing&quot;,&quot;play&quot;]&#36825;&#31181;&#65292;&#22914;&#26524;&#27809;&#26377;&#30456;&#20851;&#23646;&#24615;&#65292;&#19981;&#26174;&#31034; --&gt;<br>
            [[for lv in pg.loves]] <br>
				?lv?<br>
             [[/for]]<br>
        &lt;/div&gt;
        [[/for]]<br>
    &lt;/script&gt;<br>



<br><br>
    &lt;script&gt;<br>

<br><br>
//&#27169;&#25311;ajax&#30340;&#25968;&#25454;&#22238;&#35843;<br>
    var data = {<br>
        title: &quot;hello world&quot;,<br>
        content: [{name:&quot;liu&quot;,age:28}, {name:&quot;jiang&quot;,age:29,loves:[&quot;run&quot;,&quot;sing&quot;,&quot;play&quot;]}, {name:&quot;zhang&quot;,age:27}],<br>
        footer: &quot;&#21015;&#34920;&#20869;&#23481;&quot;<br>
    };

<br><br>
    var rd = new JRender();
<br><br>
//&#35774;&#32622;&#20107;&#20214;&#65292;&#36825;&#37324;&#30340;title&#21644;foot&#20026;&#21069;&#38754;&#27169;&#26495;&#20013;&#30340;?REFtitle?,?REFfoot?<br>
    rd.setEvent({<br>
        title: function(dms) {//&#36825;&#37324;&#30340;dms&#20026;&#24341;&#29992;&#21069;&#38754;<br>
            // alert(1)<br>
            dms.on(&quot;click&quot;, function() {<br>
                alert(1)<br>
            });<br>
        },<br>
        foot: function(dms, ct) {//&#31532;&#19968;&#20010;dms&#20026;&#24341;&#29992;?REFfoot?&#30340;dom&#65292;dms&#26159;&#24418;&#21442;&#21487;&#20197;&#29992;&#20219;&#20309;&#20889;&#27861;&#65292;&#31532;&#20108;&#20010;ct&#24341;&#29992;?REFct?&#65292;&#20174;&#31532;&#20108;&#20010;&#21442;&#25968;&#24320;&#22987;&#22914;&#26524;&#35201;&#29992;&#30456;&#20851;dom&#23601;&#35201;&#25226;&#24418;&#21442;&#30452;&#25509;&#20889;&#25104;&#37027;&#20010;&#21517;&#23383;<br>

            dms.on(&quot;click&quot;, function() {<br>
                ct.toggle();<br>
            })<br>
        }<br>
    })<br>

<br>
<p style="font-weight:bold;color:red;">默认过滤器有upper//变成大写, lower//变成小写, length//如果是数组，得到长度, safe//如果是html字符串，则直接输出字符串，而不会解析成html内容</p>
    rd.setFilter({<br>
        length: function(da, i, lg) {//&#35774;&#32622;&#36807;&#28388;&#22120;&#65292;&#31867;&#20284;&#20110;?content|length?&#65292;&#31532;&#19968;&#20010;&#21442;&#25968;&#36820;&#22238;&#23454;&#38469;&#30340;&#25968;&#25454;&#65292;i&#34920;&#31034;index&#20540;&#65288;&#27604;&#22914;&#36825;&#20010;dom&#26159;&#22312;for&#24490;&#29615;&#37324;&#38754;&#30340;&#65289;&#65292;lg&#34920;&#31034;for&#24490;&#29615;dom&#30340;&#24635;&#20010;&#25968;&#12290;&#12290;&#26368;&#21518;return&#30340;&#20540;&#34920;&#31034;&#26368;&#32456;&#26174;&#31034;&#30340;&#20540;<br>
            if (da.slice) {<br>
                return da.length;<br>
            } else {<br>
                return 0;<br>
            }<br>
        }<br>
    });<br>


<br>
    rd.render({
        data: data,//&#25968;&#25454;
        template: document.getElementById(&quot;tmp&quot;).innerHTML,//&#27169;&#26495;
        aim: &quot;#cont&quot;//&#34987;&#25554;&#20837;&#30340;&#30446;&#26631;&#23481;&#22120;&#65292;&#33021;&#29992;&#36873;&#25321;&#22120;&#23383;&#31526;&#20018;&#25110;&#32773;jq&#23545;&#35937;
        append:true(可选,为true表示内容为追加进去，不会删除目标aim元素里面的内容)
    });
    &lt;/script&gt;

</p>

<b>具体例子请看example文件夹</b>
<b>可以使用require来引用相关类</b>