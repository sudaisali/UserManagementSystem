import {User , ContactDetails} from './user.js'
import { Department } from './departments.js'


//Department Object
let dep1 = new Department("Admin","03185097377")  
//Contact Detail Object
let contactdetails = new ContactDetails("sialkot","Punjab","03185097377","Isl Gohdpur")
//User Object
let user1 = new User("sduais","23","2000",contactdetails)
let user2 = new User("talha","24","2000",contactdetails)

// user1.getEmployeeDepartmentId('tksjSmcDTkFW')
// console.log(user1.getEmployeeDepartmentId('tksjSmcDTkFW'))
// console.log(user1.getEmployeePermissions('tksjSmcDTkFW'))
user1.createEmployee('DNLYOMXgbJSi' , dep1)
//    user1.assignDepartment(dep1)
//    user1.assignPermission(dep1)
//    user1.saveUser()
// dep1.saveDepartment()
// user2.saveUser()
// dep1.createDepartment('hLneVJLMOENg')
// dep1.viewDepartments()
// dep1.getdepartments()
// dep1.getdepartments()
// console.log(dep1)
// console.log(user1)
// fun.createUser(user1)
// fun.createDepartment(dep1)
// console.table(user1)