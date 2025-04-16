/**
 * @typedef {Object} Task
 * @property {string|undefined} id - Unique identifier for the task
 * @property {string} name - Name or title of the task
 * @property {string|null} parentId - ID of the parent task, null if it's a root task
 * @property {boolean} done - Indicates whether the task is completed
 * @property {Date} date - Date associated with the task
 * @property {string} description - Detailed description of the task
 */

/**
 * @param {Partial<Task>} param0 
 * @returns {Task}
 */
export function task({id, name, parentId, done, date, description}){
    return {
        id,
        name: name ?? "",
        parentId: parentId ?? null,
        done: done ?? false,
        date: date ?? new Date(),
        description: description ?? ""
    }
}