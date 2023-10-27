import {User , ContactDetails} from './user.js'
import { Department } from './departments.js'
import * as fun from './functions.js'

let contactdetails1 = new ContactDetails("sialkot","Punjab","03185097377","Isl Gohdpur")
let contactdetails2 = new ContactDetails("Lahore","Islamabad","03249966909","New Gohdpur")
let contactdetails3 = new ContactDetails("Daska","Kpk","03185097","Uk Gohdpur")
let user1 = new User("1","sduais","23","2000",contactdetails1)
let user2 = new User("2","talha","24","202",contactdetails2)
let user3 = new User("3","burhan","25","2150",contactdetails3)
let dep1 = new Department("1","Dev","03185097377")
let dep2 = new Department("2","Hr","034565656")
let dep3 = new Department("3","Admin","037894545")

user1.saveUser()
user2.saveUser()
user3.saveUser()
dep1.saveDepartment()
dep2.saveDepartment()
dep3.saveDepartment()
// console.log(dep1)
// console.log(user1)
// fun.createUser(user1)
// fun.createDepartment(dep1)
// console.table(user1)