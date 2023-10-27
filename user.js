 class User {
    constructor(id, name, age, salary, token, contactdetails, permissions, departmentId, createdAt, updatedAt) {
        this.id = id;
        this.name = name;
        this.age = age;
        this.salary = salary;
        this.token = this.generateRandomToken(12);
        this.contactdetails = contactdetails;
        this.permissions = permissions;
        this.departmentId = departmentId;
        this.createdAt = this.getCurrentDate();
        this.updatedAt = updatedAt;

    }
    generateRandomToken(length) {
        const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
        let token = "";
        for (let item = 0; item < length; item++) {
            const randomIndex = Math.floor(Math.random() * charset.length);
            token += charset[randomIndex];
        }
        return token;
    }
    getCurrentDate() {
        const currentDate = new Date();
        return currentDate.toLocaleDateString(); 
      }


}
class ContactDetails {
    constructor(city, state, phone, address) {
        this.city = city;
        this.state = state;
        this.phone = phone;
        this.address = address;

    }
} export { User, ContactDetails }