
/**
 * @typedef {import("../../avalancha/tasks/tasks").TaskVault} TaskVault
 * @typedef {import("../../avalancha/tasks/tasks").Task} Task
 */

import { dbName, objectStoreName } from "./config.js"
import { createIDBTaskVault } from "./createIDBTaskVault.js"

/**
 * @returns {Promise<TaskVault>}
 */
export async function IDBTaskVault() {

    const request = window.indexedDB.open(dbName, 2)

    /**
     * @type {IDBDatabase}
     */
    var db

    return new Promise((res, rej) => {


        request.onerror = (/** @type {Event} */ event) => {
            rej(event)
        }

        request.onsuccess = (/** @type {Event} */ event) => {
            console.log("IDB ready: ", event)
            // @ts-expect-error event doesn't contain result value
            db = event.target.result
            res(createIDBTaskVault(db))
        }
        request.onupgradeneeded = (/** @type {Event} */ event) => {
            console.log("IDB onupgradeneeded", event)

            // @ts-expect-error event doesn't contain result value
            db = event.target.result

            if (db.objectStoreNames.contains(objectStoreName)) {
                db.deleteObjectStore(objectStoreName)
            }

            const objectStore = db.createObjectStore(objectStoreName, { keyPath: "id", autoIncrement: true })
            objectStore.createIndex("parentId", "parentId", { unique: false })
            objectStore.createIndex("date", "date", { unique: false })
            objectStore.createIndex("done", "done", { unique: false })
        }

    })
}