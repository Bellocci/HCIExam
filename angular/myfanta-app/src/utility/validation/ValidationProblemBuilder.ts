import { SnackBarDataTypeEnum } from "src/enum/SnackBarDataTypeEnum.model";
import { ValidationProblem } from "./ValidationProblem";

//FIXME: spostare il metodo withMessage in un'altra classe in modo da poter costruire l'oggetto in modo obbligando entrambi i passi
export class ValidationProblemBuilder {

    private messageType!:SnackBarDataTypeEnum;
    private message!:string;

    withValidationType(messageType:SnackBarDataTypeEnum) : this {
        this.messageType = messageType;
        return this;
    }

    withMessage(message:string) : this {
        this.message = message;
        return this;
    }

    build() : ValidationProblem {
        return new ValidationProblem(this.messageType, this.message);
    }
}