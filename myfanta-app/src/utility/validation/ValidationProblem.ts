import { SnackBarDataTypeEnum } from "src/enum/SnackBarDataTypeEnum.model";


export class ValidationProblem {

    private problemType:SnackBarDataTypeEnum;
    private message:string;

    constructor(problemType:SnackBarDataTypeEnum, message:string) {
        this.problemType = problemType;
        this.message = message;
    }

    getProblemType() : SnackBarDataTypeEnum {
        return this.problemType;
    }

    getMessage() : string {
        return this.message;
    }
}