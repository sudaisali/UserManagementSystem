 import fs from 'fs'
 const path = './db.json'; // Define the path to the JSON file
 class User {

    constructor(name, age, salary, contactdetails, permissions, departmentId, updatedAt) {
        this.id = this.createEmployeeId();
        this.name = name;
        this.age = age;
        this.salary = salary;
        this.token = this.generateRandomToken(12);
        this.contactdetails = contactdetails;
        this.permissions = null;
        this.departmentId = null;
        this.createdAt = this.getCurrentDate();
        this.updatedAt = updatedAt;

    }
    generateRandomToken(length) {
        const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
        let token = "";
        for (let item = 0; item < length; item++) {
            const randomIndex = Math.floor(Math.random() * charset.length);
            token += charset[randomIndex];
        }
        return token;
    }
    readData() {
        const data = fs.readFileSync(path, 'utf8');
        return JSON.parse(data);
    }
    getCurrentDate() {
        const currentDate = new Date();
        return currentDate.toLocaleDateString(); 
      }
    createEmployeeId() {
        const users = this.readData(); // Added 'this' to readData
        let maxId = 0;
        users.user.forEach(element => {
            if (element.id > maxId) {
                maxId = element.id;
            }
        });
        this.id = maxId + 1;
        return this.id;
    }
    saveUser() {
        const users = JSON.parse(fs.readFileSync(path, 'utf8'));
        users.user.push(this);
        fs.writeFileSync(path, JSON.stringify(users));
    }
    getEmployeeDepartmentId(userToken){
        const users = this.readData();
        let  data = users.user
        let user = data.find(element => element.token === userToken)
        return user.departmentId
    }
    getEmployeeByToken(userToken){
        const users = this.readData();
        let  data = users.user
        let user = data.find(element => element.token === userToken)
        return user
    }
    getEmployeePermissions(userToken){
        const users = this.readData();
        let  data = users.user
        let user = data.find(element => element.token === userToken)
        return user.permissions

    }
    getDepartment(userToken){
        const  departments = this.readData()
        let  data = departments.department
        let department = data.find(element => element.id === this.getEmployeeDepartmentId(userToken))
         return department
    }
    createEmployee(userToken){

        const empDepartmentId = this.getEmployeeDepartmentId(userToken)
        const empPer = this.getEmployeePermissions(userToken)
        const department = this.getDepartment(userToken)
        if (empDepartmentId!= null && empPer!=null && department!= null) {
            if (empPer.includes("isCreate") && department.permissions.includes("isCreate")) {
              this.saveUser()
             console.log("Data Save SuccessFully")
             let userArray = []
              userArray.push(this)
              console.table(userArray)
            } else {
                console.log("Unauthorized User")
            }
        }
        else{
            console.log("Unauthorized User")
        }
    }
    getDepartmentByName(depName){
        const  departments = this.readData()
        let  data = departments.department
        let department = data.find(element => element.departmentName.toLowerCase() === depName.toLowerCase())
        return department
    }
    findLastUser(){
        const users = this.readData()
        let  data = users.user
        let user = data[data.length - 1]
        return user
    }
    getAllUsers(){
        const users = this.readData()
        let  data = users.user
        return data
    }
    
    addEmployeePermission(userToken , departmentName){
        const  departments = this.getDepartmentByName(departmentName)
        const department = this.getDepartment(userToken)
        const user = this.getEmployeeByToken(userToken)
        const LastUser  = this.findLastUser();
        if (this.getDepartment(userToken).length!= 0) {
            if(departmentName.toLowerCase() == department.departmentName.toLowerCase() && department.permissions.includes("isCreate")&& user.permissions.includes("isCreate")){
                if(LastUser.permissions == null && LastUser.departmentId == null){
                     LastUser.permissions = departments.permissions;
                     LastUser.departmentId = departments.id;
                     let user = this.getAllUsers();
                     const userIndex = user.findIndex(user => user.token === LastUser.token);
                     if (userIndex !== -1) {
                         const users = JSON.parse(fs.readFileSync(path, 'utf8'));
                        users.user[userIndex] = LastUser;
                         fs.writeFileSync(path, JSON.stringify(users));
                         console.log("User data updated successfully.");
                         let userArray = []
                         userArray.push(LastUser)
                         console.table(userArray)
                         console.log(userArray)
                     } 
                }else{
                    console.log("User Already have Permissions")
                }
                
            }
            else if(departments.departmentName.toLowerCase() != 'admin' && department.permissions.includes("isCreate")&& user.permissions.includes("isCreate")){
                if(LastUser.permissions == null && LastUser.departmentId == null){
                    LastUser.permissions = departments.permissions;
                    LastUser.departmentId = departments.id;
                    let user = this.getAllUsers();
                    const userIndex = user.findIndex(user => user.token === LastUser.token);
                    if (userIndex !== -1) {
                        const users = JSON.parse(fs.readFileSync(path, 'utf8'));
                       users.user[userIndex] = LastUser;
                        fs.writeFileSync(path, JSON.stringify(users));
                        console.log("User data updated successfully.");
                        let userArray = []
                        userArray.push(LastUser)
                        console.table(userArray)
                    } 
               }else{
                   console.log("User Already have Permissions")
               }
                  
            }

            else{
                console.log("Sorry have No permission to Assign Department")
            }
            
            
       
        }


    }
    
}

class ContactDetails {
    constructor(city, state, phone, address) {
        this.city = city;
        this.state = state;
        this.phone = phone;
        this.address = address;

    }
} 


export { User, ContactDetails }