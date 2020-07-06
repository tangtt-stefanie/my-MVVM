import { Dep } from './dep'
import { isObject } from './utils'

export class Observer{
    constructor(data){
        this.observer(data);
    }

    //监听
    observer(data){
        if(data && isObject(data)){
            for(let key in data){
                this.defienReactive(data,key,data[key])
            }
        }
    }

    defienReactive(obj,key,value){
        //深度监听
        this.observer(value)
        //每个key都存一个Dep
        let dep = new Dep();

        Object.defineProperty(obj,key,{
            get:()=>{
                //new Wacther()时会把watcher放在Dep.target上，并自动调用一次get方法，此时就可以进行订阅
                dep.depend();
                return value
            },
            set:(newVal)=>{
                if(newVal !== value){
                    //新值进行监听
                    this.observer(newVal)
                    value = newVal;
                    //发布
                    dep.notify();
                }
            }
        })
    }
}