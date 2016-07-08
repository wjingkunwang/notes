<!-- https://segmentfault.com/a/1190000000662547 -->
function outer(){
        var x=10;
        return function(){             //函数嵌套函数
                x++;
                alert(x);
        }
}
var y = outer();              //外部函数赋给变量y;
y();                 //y函数调用一次，结果为11，相当于outer()()；
y(); 