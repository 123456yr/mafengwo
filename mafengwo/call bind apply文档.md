###Welcome to use MarkDown

构造函数的bind方法
一个绑定函数也能使用new操作符创建对象：这种行为就像把原函数当成构造器。提供的 this 值被忽略，同时调用时的参数被提供给模拟函数。

也就是说当 bind 返回的函数作为构造函数的时候，bind 时指定的 this 值会失效，但传入的参数依然生效。举个例子：


// 第三版
Function.prototype.bind2 = function (context) {
    var self = this;
    var args = Array.prototype.slice.call(arguments, 1);

    var fbound = function () {

        var bindArgs = Array.prototype.slice.call(arguments);
        // 当作为构造函数时，this 指向实例，self 指向绑定函数，因为下面一句 `fbound.prototype = this.prototype;`，已经修改了 fbound.prototype 为 绑定函数的 prototype，此时结果为 true，当结果为 true 的时候，this 指向实例。
        // 当作为普通函数时，this 指向 window，self 指向绑定函数，此时结果为 false，当结果为 false 的时候，this 指向绑定的 context。
        //检测this的原型对象是否存在于self的原型链上，作为构造函数，this指向实例，self指向绑定函数，fbound.prototype = this.prototype; fbound函数体外面的this是指向绑定函数的，所以将fbound的原型对象设置为绑定函数的原型对象，而fbound就是返回给实例的构造函数，self的原型对象存在于实例的原型链上，所以为true，这时返回上下文对象就是this构造函数的实例，并且可以使用绑定函数原型对象的方法（关键在于让绑定bind的函数和返回函数的原型对象一致）
        //当为普通函数时this指向window。self指向绑定函数，结果为false，this指向传递过来的context
        self.apply(this instanceof self ? this : context, args.concat(bindArgs));
    }
    // 修改返回函数的 prototype 为绑定函数的 prototype，实例就可以继承函数的原型中的值
    fbound.prototype = this.prototype;
    return fbound;
}

bind2方法中的this是调用bind2 的对象，比如 obj.bind2 obj先去找obj的实例方法看有没有，没有就不找原型，没有就如找Function然后找Function.prototype(call, bind, apply)  如果在没有就去找Object类没有的话就去找Object.prototype(所有的对象默认继承Object)

Array.prototype.slice.call(arguments);
Array.protoptype.slice 
slice是array原型对象中的方法，也是一个函数，既然是函数就能顺着原型链找到 Function原型对象上的call方法，当不传参数时，默认返回一个数组的副本
call([thisObj[,args[args]]])
thisObj 可选项  将当前函数的上下文对象改成thisObj
args  可选项  参数
Array.prototype.slice.call(arguments, 1)
将绑定函数传过来的参数转为数组，并截取返回除了第一个参数之外的参数，就是除了上下文对象以外的参数

js中的instanceof运算符
instanceof运算符用来判断一个构造函数的prototype属性所指向的对象是否存在另一个要检测对象的原型链上
object instanceof constructor    
instanceof运算符用来检测constructor.prototype 是否存在于参数Object的原型链上

首先要先了解在函数本身会有一些自己的属性，比如：

length：形参的个数；
name：函数名；
prototype：类的原型，在原型上定义的方法都是当前这个类的实例的公有方法；
__proto__：把函数当做一个普通对象，指向Function这个类的原型

角色一：普通函数，对于Fn而言，它本身是一个普通的函数，执行的时候会形成私有的作用域，然后进行形参赋值、预解析、代码执行、执行完成后内存销毁；

角色二：类，它有自己的实例，f就是Fn作为类而产生的一个实例，也有一个叫做prototype的属性是自己的原型，它的实例都可以指向自己的原型；

角色三：普通对象，Fn和 var obj = {} 中的obj一样，就是一个普通的对象（所有的函数都是Function的实例），它作为对象可以有一些自己的私有属性，也可以通过__proto__找到Function.prototype；


