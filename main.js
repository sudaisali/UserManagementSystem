import {User , ContactDetails} from './user.js'
import { Department } from './departments.js'
import * as fun from './functions.js'

let dep1 = new Department("Admin","03185097377")
let contactdetails = new ContactDetails("sialkot","Punjab","03185097377","Isl Gohdpur")
let user1 = new User("1","sduais","23","2000",contactdetails)

user1.assignDepartment(dep1)
user1.saveUser()

dep1.saveDepartment()

// console.log(dep1)
// console.log(user1)
// fun.createUser(user1)
// fun.createDepartment(dep1)
// console.table(user1)