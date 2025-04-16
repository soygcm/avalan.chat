import {task} from "./tasks/task.js"

/**
 * @typedef {import('./tasks/task').Task} Task
 * @typedef {import('./tasks/tasks').TaskVault} Tasks
 */

/**
 * 
 * @param {Tasks} taskVault 
 */
async function yourFirstTasksCompa(taskVault){
    //call the LLM
    //createTheTasks
    
    /**
     * @type {Partial<Task>[]}
     */
    const partialTasks = [
        {
            description: "Infraestructura"
        },
        {
            description: "Features"
        }
    ]
    const tasks = partialTasks.map(partialTask => task(partialTask))
    await taskVault.add(tasks)
}

/**
 * 
 * @param {Tasks} taskVault 
 */
export async function loop(taskVault){
    await yourFirstTasksCompa(taskVault)
}