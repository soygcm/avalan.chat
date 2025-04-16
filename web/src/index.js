import {loop} from "./avalancha/loop.js"
import { IDBTaskVault } from "./integration/indexedDB/IDBTaskVault.js"


async function main(){
    //Dependency injection
    //run the program loop
    //draw the UI
    //Let say user answer the first question and the LLM is creating tasks
    //createTasks()
    
    //startDB
    const taskVault = await IDBTaskVault()
    await loop(taskVault)
}

main().catch(console.error)