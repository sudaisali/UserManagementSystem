import fs from 'fs'
const path = './db.json'; // Define the path to the JSON file
class Department{
    constructor(id,departmentName,contactNo,permissions,createdAt,UpdatedAt){
        this.id = id;
        this.departmentName = departmentName;
        this.contactNo = contactNo;
        this.permissions = permissions;
        this.createdAt = createdAt;
        this.UpdatedAt = UpdatedAt;
    }
    saveDepartment(){
        const departments = JSON.parse(fs.readFileSync(path, 'utf8'));
        departments.department.push(this);
        fs.writeFileSync(path, JSON.stringify(departments));
    }

}

export {Department}