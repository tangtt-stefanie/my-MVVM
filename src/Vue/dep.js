
export class Dep{
    constructor(){
        this.subs = []
    }

    //订阅
    addSub(watcher){
        this.subs.push(watcher)
    }

    //添加watcher
    depend(){
        if (Dep.target) {
            this.addSub(Dep.target)
        }
    }

    //发布
    notify(){
        this.subs.slice().forEach((watcher)=>{
            watcher.update()
        })
    }
}