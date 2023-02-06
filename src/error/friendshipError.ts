import { CustomError } from "./customError";

export class invalidData extends CustomError {
    constructor()  {
        super(400, "Dados inválidos. Necessário informar todos os parâmetros.")
    }
}

export class invalidId extends CustomError {
    constructor(){
        super(422, "O id inserido não existe.")
    }
}

export class sameId extends CustomError {
    constructor () {
        super (412, "Os id's inseridos são os mesmos.")
    }
}

export class alreadyFriends extends CustomError {
    constructor () {
        super (412, "Os usuários já são amigos." )
    }
}

export class notFriends extends CustomError {
    constructor () {
        super (412, "Os usuários não são amigos." )
    }
}