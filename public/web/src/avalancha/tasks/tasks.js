/**
 * @typedef {import('./task').Task} Task
 */

/**
 * Interface for managing a collection of tasks
 * @typedef {Object} TaskVault
 * @property {function(Task[]): Promise<Task[]>} add - Adds a new task to the collection and returns the added task
 * @property {function(string|number): boolean} remove - Removes a task by its ID and returns true if successful
 * @property {function(string|number, string|number|null): boolean} move - Moves a task to a new parent and returns true if successful
 */