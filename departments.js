import fs from 'fs'
const path = './db.json'; // Define the path to the JSON file
class Department{
    constructor(departmentName,contactNo,permissions,createdAt,UpdatedAt){
        this.id = this.createDepartmentId();
        this.departmentName = departmentName;
        this.contactNo = contactNo;
        this.permissions = this.departmentpermission();
        this.createdAt = this.getCurrentDate();
        this.UpdatedAt = UpdatedAt;
    }

    readData() {
        const data = fs.readFileSync(path, 'utf8');
        return JSON.parse(data);
      }
      writeData(data) {
        fs.writeFileSync(path, JSON.stringify(data));
      }
      saveDepartment() {
        const departments = this.readData(); // Added 'this' to readData
        departments.department.push(this);
        this.writeData(departments); // Added 'this' to writeData
      }
      createDepartmentId() {
        const departments = this.readData(); // Added 'this' to readData
        let maxId = 0;
        departments.department.forEach(element => {
          if (element.id > maxId) {
            maxId = element.id;
          }
        });
        this.id = maxId + 1;
        return this.id;
      }
      departmentpermission(){
        return ["isCreate","isDelete","isUpdate"]
      }
      getCurrentDate() {
        const currentDate = new Date();
        return currentDate.toLocaleDateString(); 
      }
    }
export {Department}