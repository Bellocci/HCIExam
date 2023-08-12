import { SnackBarDataTypeEnum } from "src/enum/SnackBarDataTypeEnum.model";
import { ValidationProblem } from "./ValidationProblem";


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