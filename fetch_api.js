// async/await more elegant way of using promise
async function fetchUsers() {
    const res = await fetch('https://jsonplaceholder.typicode.com/users');  // returns a promise
    const data = res.json();
    console.log(data);
}

fetchUsers();
