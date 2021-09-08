@testDecorator
@testDecorator2('18')
@testDecorator3
// eslint-disable-next-line
class Test {

    @readonly xigua = 'red'

}

function testDecorator(target){
    target.foo = 'fzm'
}

// 传参的
function testDecorator2(value){
    return function(target){
        target.bar = value
    }
}


function testDecorator3(target){
    target.prototype.zoo = 'ming'
}


function readonly(target,anme,descriptor){
    descriptor.writable = false
}


// console.log(Test.foo)
// console.log(Test.bar)
// console.log(new Test().zoo)
let t = new Test()
console.log(t.xigua)
t.xigua = 'yellow'
console.log(t.xigua)




// function mixin(...value){
//     console.log(...value)
//     return function(target){
//         Object.assign(target.prototype,...value)
//     }
// }

// @mixin({name:'123'},{sex:'female'})
// class MyClass{}

// console.log(new MyClass().__proto__)