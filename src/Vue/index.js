import { Compile } from './compile'
import { Observer } from './observer'
import { Watcher } from './watcher';

export class Vue {
    constructor(options){
        //绑定数据
        this.$el = options.el;
        this.$data = options.data;
        this.$methods = options.methods;
        this.$computed = options.computed;

        //根据是否传了el来判断是否编译
        if(this.$el){
            //监听数据
            new Observer(this.$data);
            //把vm.$data代理到vm上
            this.proxyVm(this.$data)

            let computed = this.$computed;
            
            for(let key in computed){
                // let watcher = new Watcher(this,key,computed[key],{computed:true,dirty:true});
                Object.defineProperty(this,key,{
                    get:()=>{
                        return this.$computed[key].call(this);
                    },
                    set:(newVal)=>{
                        computed[key] = newVal
                    }
                })
            }

            //编译
            new Compile(this.$el,this)
        }
    }

    proxyVm(data){
        for(let key in data){
            Object.defineProperty(this,key,{
                get:()=>{
                    return data[key];
                },
                set:(newVal)=>{
                    data[key] = newVal
                }
            })
        }
    }
}

