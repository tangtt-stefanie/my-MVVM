import { Vue } from './Vue/index'

window.vm = new Vue({
    el:'#app',
    data:{
        name:'wanger',
        user:{
            name:'zhangsan',
            age:22,
            info:{
                sex:2
            }
        }
    },
    method:{

    },
    computed:{
        getNewName(){
            console.log('getNewName')
            return this.user.name+"--logo";
        }
    }
})





