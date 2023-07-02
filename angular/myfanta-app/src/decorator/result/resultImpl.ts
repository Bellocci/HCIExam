import { Result } from "./result.interface";

export class ResultImpl implements Result {
    
    private success: boolean;
    private message: string[];

    constructor(success:boolean, message:string[]) {
        this.success = success;
        this.message = message;
    }
    
    isSuccess(): boolean {
        return this.success;
    }
    getMessages(): string[] {
        return this.message;
    } 
}