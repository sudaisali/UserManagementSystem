import {User , ContactDetails} from './user.js'
import * as fun from './functions.js'

let contactdetails = new ContactDetails("sialkot","Punjab","03185097377","AirportRoad Gohdpur")
let user1 = new User("1","sduais","23","2000",12345,contactdetails)
const userData = user1
console.log(user1)
fun.createUser(user1)
console.table(Json)