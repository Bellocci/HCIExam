import { Message } from "primeng/api/message";
import { MessageSeverityEnum } from "src/enum/MessageSeverityEnum";

export interface MessageBuilder {
    Build() : MessageSeverityStep;
} 

export interface MessageSeverityStep {
    setSeverity(severity:MessageSeverityEnum) : MessageTextStep;
}

export interface MessageTextStep {
    setText(text:string) : MessageTextStep;
    build(): Message;
}