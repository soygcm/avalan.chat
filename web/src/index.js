const request = window.indexedDB.open("MyTestDatabase", 4)

const customerData = [
    { ssn: "444-44-4444", name: "Bill", age: 35, email: "bill@company.com" },
    { ssn: "555-55-5555", name: "Donna", age: 32, email: "donna@home.org" },
]

request.onerror = (event) => {
    console.error(event)
}
request.onsuccess = (event) => {
    db = event.target.result
    console.log(event)
    // Do something with request.result!
}
request.onupgradeneeded = (event) => {
    console.log("onupgradeneeded")
    // Save the IDBDatabase interface
    const db = event.target.result

    // Create an objectStore for this database
    const objectStore = db.createObjectStore("customers", { keyPath: "ssn" })


    // Create an index to search customers by name. We may have duplicates
    // so we can't use a unique index.
    objectStore.createIndex("name", "name", { unique: false })

    // Create an index to search customers by email. We want to ensure that
    // no two customers have the same email, so use a unique index.
    objectStore.createIndex("email", "email", { unique: true })

    // Use transaction oncomplete to make sure the objectStore creation is
    // finished before adding data into it.
    objectStore.transaction.oncomplete = (event) => {
        // Store values in the newly created objectStore.
        const customerObjectStore = db
            .transaction("customers", "readwrite")
            .objectStore("customers")
        customerData.forEach((customer) => {
            customerObjectStore.add(customer)
            console.log(`adding${customer}`)
        })
    }
}

