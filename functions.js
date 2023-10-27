import fs from 'fs'
const path = './db.json'; // Define the path to the JSON file

export function createUser(user) {
  fs.readFile(path, 'utf8', (err, data) => {
    if (err) {
      console.error("Error reading the file:", err);
      return;
    }

    let userArray = [];
    try {
      userArray = JSON.parse(data);
    } catch (error) {
      console.error("Error parsing JSON:", error);
      return;
    }

    userArray.user.push(user); // Add the new user to the array

    fs.writeFile(path, JSON.stringify(userArray), (error) => {
      if (error) {
        console.error("Error writing to file:", error);
      } else {
        console.log("User added successfully!");
      }
    });
  });
}
