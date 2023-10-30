import {User , ContactDetails} from './user.js'
import { Department } from './departments.js'


//Department Object
let dep1 = new Department("admin","03185097377")  

//Contact Detail Object
let contactdetails = new ContactDetails("sialkot","Punjab","03185097377","Isl Gohdpur")
//User Object
let user1 = new User("","15","2002",contactdetails)
let user2 = new User("Burhan Ali Saif","24","2000",contactdetails)
let user3 = new User("Usama Naseer","12","2000",contactdetails)
let user4 = new User("Asad","24","2000",contactdetails)
let user5 = new User("sudais","24","2000",contactdetails)




//createDepartment
// dep1.createDepartment('UQQIyDjvPQIz')


// create and assign Department
// user1.createEmployee('yZjicpKVXknH')
// user1.assignEmployeePermission("yZjicpKVXknH","dev")

// Update User
// user1.updateEmployee('qhGbKOzaiBVE',2, user1)

// DeleteEmployee
// user1.deleteEmployee('vUZZThXPmrsq',3)

//Add Employee Permissions
//  user1.addEmployeePermissions('yZjicpKVXknH',3, 'isUpdate')
// user1.removeEmployeePermissions('yZjicpKVXknH',3, 'isUpdate')



user1.getEmployeeDetails()