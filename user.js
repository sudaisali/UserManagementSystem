 import fs from 'fs'
 const path = './db.json';
 
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
    assignEmployeePermission(userToken , departmentName){
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
    deleteEmployee(userToken , employeeToken){
        const user = this.getEmployeeByToken(userToken)
        const userDepartment = this.getDepartment(userToken)
        const employee = this.getEmployeeByToken(employeeToken)
        const employeeDepartment = this.getDepartment(employeeToken)
        if(user){
            if(user.permissions.includes('isDelete')&& user.departmentId == 1){
                if(employee.departmentId == 1 ||  employeeDepartment == null){
                        let user = this.getAllUsers();
                        const userIndex = user.findIndex(user => user.token === employee.token);
                        if (userIndex!== -1) {
                            const users = JSON.parse(fs.readFileSync(path, 'utf8'));
                            users.user.splice(userIndex, 1);
                            fs.writeFileSync(path, JSON.stringify(users));
                            console.log("User Deleted successfully.");
                        
                    }
                    else{
                        console.log("user is unauthorized")
                    }
                }
                else if(employee.departmentId != 1){
                    let user = this.getAllUsers();
                    const userIndex = user.findIndex(user => user.token === employee.token);
                    if (userIndex!== -1) {
                        const users = JSON.parse(fs.readFileSync(path, 'utf8'));
                        users.user.splice(userIndex, 1);
                        fs.writeFileSync(path, JSON.stringify(users));
                        console.log("User Deleted successfully.");
                    
                }
                else{
                    console.log("user is unauthorized")
                }
            }
                else{
                    console.log("Unauthorized User")
                }
            }
            else{
                if(user.permissions.includes('isDelete') && userDepartment.departmentName.toLowerCase() == 'dev'){
                    console.log(employeeDepartment)
                    if(employeeDepartment === null || employeeDepartment.departmentId == '3' || employeeDepartment.departmentName.toLowerCase() == 'dev'){
                        let user = this.getAllUsers();
                        const userIndex = user.findIndex(user => user.token === employee.token);
                        if (userIndex!== -1) {
                            const users = JSON.parse(fs.readFileSync(path, 'utf8'));
                            users.user.splice(userIndex, 1);
                            fs.writeFileSync(path, JSON.stringify(users));
                            console.log("User Deleted successfully.");
                        }
                    }
                    else{
                        console.log("user is unauthorized")
                    }
    
                }
                else{
                    console.log("Unauthorized User")
                }
            }
        }
        else{
            console.log("Unauthorized User")
            
            
        }
    
    }
    updateEmployee(userToken , employeeId , updatedUser){
           
        const user = this.getEmployeeByToken(userToken)
        const employee =  this.getEmployeById(employeeId)
        const userDepartment = this.getDepartment(userToken)
        const employeeDepartment = this.getDepartmentByEmployeeId(employeeId)
      
        
        employee.name = updatedUser.name
        employee.age = updatedUser.age
        employee.salary = updatedUser.salary
        employee.contactdetails = updatedUser.contactdetails
        employee.updatedAt = this.getCurrentDate()
        if(user){
            if(user.permissions.includes('isUpdate') && user.departmentId == 1){
                    let user = this.getAllUsers();
                    const userIndex = user.findIndex(user => user.token === employee.token);
                    if (userIndex!== -1) {
                        const users = JSON.parse(fs.readFileSync(path, 'utf8'));
                        users.user[userIndex] = employee;
                        fs.writeFileSync(path, JSON.stringify(users));
                        console.log("User Updated successfully.");
                        
                
                }
                else{
                    console.log("user is unauthorized")
                }
            }
            else if (user.permissions.includes('isUpdate') && user.departmentId == 3){
                if(employeeDepartment.id == '3'){
                    let user = this.getAllUsers();
                    const userIndex = user.findIndex(user => user.token === employee.token);
                    if (userIndex!== -1) {
                        const users = JSON.parse(fs.readFileSync(path, 'utf8'));
                        users.user[userIndex] = employee;
                        fs.writeFileSync(path, JSON.stringify(users));
                        console.log("User Updated successfully.");
                    }
                }
                else{
                    console.log("user is unauthorized")
                }
        }
            else{
                if(user.permissions.includes('isUpdate') && user.departmentId == 2){
                    if(employeeDepartment.id == '3' || employeeDepartment.id == '2'){
                        let user = this.getAllUsers();
                        const userIndex = user.findIndex(user => user.token === employee.token);
                        if (userIndex!== -1) {
                            const users = JSON.parse(fs.readFileSync(path, 'utf8'));
                            users.user[userIndex] = employee;
                            fs.writeFileSync(path, JSON.stringify(users));
                            console.log("User Updated successfully.");
                        }
                    }
                    else{
                        console.log("user is unauthorized")
                    }
            }
        }
        }
       
       
    }
    addEmployeePermissions(userToken , employeeId , permission){
           
        const user = this.getEmployeeByToken(userToken)
        const employee =  this.getEmployeById(employeeId)
        const employeeDepartment = this.getDepartmentByEmployeeId(employeeId)
        employee.permissions.push(permission)
        employee.updatedAt = this.getCurrentDate()
        if(user){
            if(user.permissions.includes('isUpdate') && user.departmentId == 1){
                    let user = this.getAllUsers();
                    const userIndex = user.findIndex(user => user.token === employee.token);
                    if (userIndex!== -1) {
                        const users = JSON.parse(fs.readFileSync(path, 'utf8'));
                        users.user[userIndex] = employee;
                        fs.writeFileSync(path, JSON.stringify(users));
                        console.log("Employee Permission Added successfully.");
                        
                
                }
                else{
                    console.log("user is unauthorized")
                }
            }
            else if (user.permissions.includes('isUpdate') && user.departmentId == 3){
                if(employeeDepartment.id == '3'){
                    let user = this.getAllUsers();
                    const userIndex = user.findIndex(user => user.token === employee.token);
                    if (userIndex!== -1) {
                        const users = JSON.parse(fs.readFileSync(path, 'utf8'));
                        users.user[userIndex] = employee;
                        fs.writeFileSync(path, JSON.stringify(users));
                        console.log("Employee Permission Added Successfully");
                    }
                }
                else{
                    console.log("user is unauthorized")
                }
        }
            else{
                if(user.permissions.includes('isUpdate') && user.departmentId == 2){
                    if(employeeDepartment.id == '3' || employeeDepartment.id == '2'){
                        let user = this.getAllUsers();
                        const userIndex = user.findIndex(user => user.token === employee.token);
                        if (userIndex!== -1) {
                            const users = JSON.parse(fs.readFileSync(path, 'utf8'));
                            users.user[userIndex] = employee;
                            fs.writeFileSync(path, JSON.stringify(users));
                            console.log("Employee Permission Added Sucessfully");
                        }
                    }
                    else{
                        console.log("user is unauthorized")
                    }
            }
        }
        }
       
       
    }
    removeEmployeePermissions(userToken , employeeId , permission){
           
        const user = this.getEmployeeByToken(userToken)
        const employee =  this.getEmployeById(employeeId)
        const employeeDepartment = this.getDepartmentByEmployeeId(employeeId)
        employee.permissions.splice(employee.permissions.indexOf(permission), 1);
        employee.updatedAt = this.getCurrentDate()
        if(user){
            if(user.permissions.includes('isUpdate') && user.departmentId == 1){
                    let user = this.getAllUsers();
                    const userIndex = user.findIndex(user => user.token === employee.token);
                    if (userIndex!== -1) {
                        const users = JSON.parse(fs.readFileSync(path, 'utf8'));
                        users.user[userIndex] = employee;
                        fs.writeFileSync(path, JSON.stringify(users));
                        console.log("Employee Permission Added successfully.");
                        
                
                }
                else{
                    console.log("user is unauthorized")
                }
            }
            else if (user.permissions.includes('isUpdate') && user.departmentId == 3){
                if(employeeDepartment.id == '3'){
                    let user = this.getAllUsers();
                    const userIndex = user.findIndex(user => user.token === employee.token);
                    if (userIndex!== -1) {
                        const users = JSON.parse(fs.readFileSync(path, 'utf8'));
                        users.user[userIndex] = employee;
                        fs.writeFileSync(path, JSON.stringify(users));
                        console.log("Employee Permission Added Successfully");
                    }
                }
                else{
                    console.log("user is unauthorized")
                }
        }
            else{
                if(user.permissions.includes('isUpdate') && user.departmentId == 2){
                    if(employeeDepartment.id == '3' || employeeDepartment.id == '2'){
                        let user = this.getAllUsers();
                        const userIndex = user.findIndex(user => user.token === employee.token);
                        if (userIndex!== -1) {
                            const users = JSON.parse(fs.readFileSync(path, 'utf8'));
                            users.user[userIndex] = employee;
                            fs.writeFileSync(path, JSON.stringify(users));
                            console.log("Employee Permission Added Sucessfully");
                        }
                    }
                    else{
                        console.log("user is unauthorized")
                    }
            }
        }
        }
       
       
    }
    getEmployeeDetails(){
        const users = this.readData();
        let  data = users.user
        let dataArray = []
        for(let items of data){
             dataArray.push(items) 
        }
        console.table(dataArray)
    }
    getAllUsers(){
        const users = this.readData()
        let  data = users.user
        return data
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
    saveUser() {
        const users = JSON.parse(fs.readFileSync(path, 'utf8'));
        users.user.push(this);
        fs.writeFileSync(path, JSON.stringify(users));
    }
    getEmployeeDepartmentId(userToken){
        const users = this.readData();
        let  data = users.user
        let user = data.find(element => element.token === userToken)
        if(user != null){
         return user.departmentId
        }
       return null
    }
    getEmployeeByToken(userToken){
        const users = this.readData();
        let  data = users.user
        let user = data.find(element => element.token === userToken)
        if(user != null){
            return user
        }
        return null
    }
    getEmployeById(userId){
        const users = this.readData();
        let  data = users.user
        let user = data.find(element => element.id === userId)
        if(user!= null){
            return user
        }
        return null

    }
    getEmployeePermissions(userToken){
        const users = this.readData();
        let  data = users.user
        let user = data.find(element => element.token === userToken)
       if(user != null){
        return user.permissions
       }
       else{
        return null
       }
       

    }
    getDepartment(userToken){
        const  departments = this.readData()
        let  data = departments.department
        let department = data.find(element => element.id === this.getEmployeeDepartmentId(userToken))
         if(department){
            return department
         }
         else{
            return null
         }
    }
    getDepartmentByName(depName){
        const  departments = this.readData()
        let  data = departments.department
        let department = data.find(element => element.departmentName.toLowerCase() === depName.toLowerCase())
        return department
    }
    getDepartmentByEmployeeId(employeeId){
        const users = this.readData()
        let  data = users.user
        let user = data.find(element => element.id === employeeId)
        if(user!= null){
            let userToken = user.token
            let userDepartment = this.getDepartment(userToken)
            return userDepartment

        }
       return null
 
    
    }
    findLastUser(){
        const users = this.readData()
        let  data = users.user
        let user = data[data.length - 1]
        return user
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