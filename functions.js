import {write, writeFile} from 'fs'
const path = './db.json'
export function createUser(user){
      writeFile(path , JSON.stringify(user),(error)=>{
        if(error){
            console.log(error)
        }
      }
      )
}