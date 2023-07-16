export class User {
    constructor(name, email, birthday, cpf, password) {
        this._name = name;
        this._email = email;
        this._birthday = birthday;
        this._CPF = cpf;
        this._password = password;
        this._autheticaded = false;
    }


    login(email, password){
        if(email === this._email && password === this._password){
           return this._autheticaded = true
        }
    }

    logout(){
        return this._autheticaded = false;
    }
}