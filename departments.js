import fs from 'fs'
const path = './db.json'; // Define the path to the JSON file
class Department {
    constructor(departmentName, contactNo, permissions, createdAt, UpdatedAt) {
        this.id = this.createDepartmentId();
        this.departmentName = departmentName;
        this.contactNo = contactNo;
        this.permissions = this.departmentpermission();
        this.createdAt = this.getCurrentDate();
        this.UpdatedAt = null;
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
        this.writeData(departments);
        console.log("Department Created SuccessFully")// Added 'this' to writeData
    }
    createDepartment(userToken) {
        const user = this.getUserbyToken(userToken)
        const departmentPermissions = this.getdepartmentsPermissions(userToken)
        if (this.getdepartments().length != 0) {
            if (user && user.permissions.includes("isCreate") && departmentPermissions.includes("isCreate")) {
                const departments = this.getdepartments();
                const isDepartmentExists = departments.some(
                    department => department.departmentName.toLowerCase() === this.departmentName.toLowerCase());
                const isDepartmentExistwithId = departments.some(
                    department => department.id === this.id
                )
                if (!isDepartmentExists && !isDepartmentExistwithId) {
                    this.saveDepartment();
                    const dataArray = [];
                    dataArray.push(this);
                    console.table(dataArray);

                }
                else {
                    console.log("Sorry Department Exist")
                }

            } else {
                console.log("Unauthorized User")
            }

        }
        else {
            this.saveDepartment()
        }


    }
    departmentpermission() {
        if (this.departmentName == 'Admin') {
            return ["isCreate", "isDelete", "isUpdate"]
        }
        if (this.departmentName == 'Hr') {
            return ["isCreate", "isUpdate"]
        }
        if (this.departmentName == 'Dev') {
            return ["isDelete", "isUpdate"]
        }
        return null
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
    getCurrentDate() {
        const currentDate = new Date();
        return currentDate.toLocaleDateString();
    }
    getUserbyToken(userToken) {
        const users = this.readData();
        let data = users.user.find(element => element.token === userToken);
        return data

    }
    getdepartments() {
        const departments = this.readData();
        return departments.department
    }
    getdepartmentsPermissions(userToken) {
        const user = this.getUserbyToken(userToken)
        const departments = this.getdepartments();
        if (user) {
            const userDepartmentId = user.departmentId;
            const department = departments.find(dep => dep.id === userDepartmentId);
            if (department) {
                return department.permissions;
            }
        }
        return null;
    }
    viewDepartments(){
        const departments = this.readData();
        console.table(departments.department)
    }
  


}
export { Department }