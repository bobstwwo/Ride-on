class User {
  constructor(role, name, surname, secondName, phone, email, birthday, passport = null) {
    this.role = role;
    this.name = name;
    this.surname = surname;
    this.secondName = secondName;
    this.phone = phone;
    this.email = email;
    this.birthday = birthday;
    this.profileImg = "https://images.ctfassets.net/hrltx12pl8hq/3MbF54EhWUhsXunc5Keueb/60774fbbff86e6bf6776f1e17a8016b4/04-nature_721703848.jpg?fit=fill&w=480&h=270";
    if (passport) {
      this.passport = passport;
    }
  }
}

export default User;