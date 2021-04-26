class User {
  constructor(role, name, surname, secondName, phone, email, birthday, passport = '', profileImg) {
    this.role = role;
    this.name = name;
    this.surname = surname;
    this.secondName = secondName;
    this.phone = phone;
    this.email = email;
    this.birthday = birthday;
    this.profileImg = profileImg;
    if (role === 'Driver') {
      this.passport = passport;
    }
  }
}

export default User;