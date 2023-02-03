import { CustomError } from "./customError";

export class invalidData extends CustomError {
    constructor()  {
        super(400, "Dados inválidos. Necessário informar todos os parâmetros.")
    }
}

export class invalidType extends CustomError {
    constructor(){
        super(422, "O tipo deve ser 'normal' ou 'event'.")
    }
}

export class invalidId extends CustomError {
    constructor(){
        super(422, "O id inserido não existe.")
    }
}