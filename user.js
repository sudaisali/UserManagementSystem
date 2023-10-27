class User{
    constructor(id,name,age,salary,token,contactdetails,permissions,departmentId,createdAt,updatedAt){
        this.id = id;
        this.name = name;
        this.age = age;
        this.salary = salary;
        this.token = token;
        this.contactdetails = contactdetails;
        this.permissions = permissions;
        this.departmentId = departmentId;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;

    }
   
}
class ContactDetails{
    constructor(city,state,phone,address){
        this.city = city;
        this.state = state;
        this.phone = phone;
        this.address = address;

    }
}

export {User , ContactDetails}