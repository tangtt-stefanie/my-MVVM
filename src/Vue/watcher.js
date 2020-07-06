import { getVal } from './utils'
import { Dep } from './dep'


export class Watcher{

    constructor(vm,expr,cb,options={}){
        this.vm = vm;
        this.expr = expr;
        this.cb = cb;
        this.oldValue = this.get();
    }

    get(){
        Dep.target = this;
        let value = getVal(this.vm,this.expr);
        Dep.target = null;
        return value;
    }

    update(){
        let newVal = getVal(this.vm,this.expr)
        if(newVal !== this.oldValue){
            //新值与旧值不同调用cb
            this.cb();
        }
    }
}