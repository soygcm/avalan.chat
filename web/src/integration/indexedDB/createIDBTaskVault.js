/**
 *  @typedef {import("../../avalancha/tasks/tasks").TaskVault} TaskVault
 *  @typedef {import("../../avalancha/tasks/tasks").Task} Task

 */

import { objectStoreName } from "./config.js"

/**
 * @param {IDBDatabase} db
 */
export function createIDBTaskVault(db) {
    /** 
    * @type {TaskVault}
    */
    const taskVault = {
        add: (/** @type {Task[]} */tasks) => {

            return new Promise((res, rej) => {

                const transaction = db.transaction(objectStoreName, "readwrite")
                const tasksObjectStore = transaction.objectStore(objectStoreName)

                /** @type {Task[]} */
                const createdTasks = []

                tasks.forEach((task) => {
                    // eslint-disable-next-line @typescript-eslint/no-unused-vars
                    const { id, ...taskWithoutId } = task
                    const request = tasksObjectStore.add(taskWithoutId)
                    console.log('Adding', taskWithoutId)

                    request.onsuccess = (event) => {
                        // @ts-expect-error event target result has no type in Event
                        const generatedId = event.target.result
                        createdTasks.push({ ...task, id: generatedId })
                        console.log(`Added task with ID: ${generatedId}`)

                    }
                    request.onerror = (event) => {
                        // @ts-expect-error event target error has no type in Event
                        console.error("Error adding task:", event.target.error);
                    }

                })
                transaction.oncomplete = () => {
                    res(createdTasks);
                };
                
                transaction.onerror = (event) => {
                    // @ts-expect-error event target error has no type in Event
                    rej(event.target.error)
                };
            })
        },
        // @ts-expect-error remove is undefined by now
        remove: undefined,
        // @ts-expect-error remove is undefined by now
        move: undefined
    }
    return taskVault
}