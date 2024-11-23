import { MessageSeverityEnum } from "src/enum/MessageSeverityEnum";
import { MessageBuilder, MessageSeverityStep, MessageTextStep } from "./MessageBuilder";
import { Message } from "primeng/api";

export class MessageBuilderImpl implements MessageBuilder {
    
    Build(): MessageSeverityStep {
        return new MessageSeverityStepImpl();
    }
}

export class MessageSeverityStepImpl implements MessageSeverityStep {    

    setSeverity(severity: MessageSeverityEnum): MessageTextStep {
        return new MessageTextStepImpl(severity);    
    }
}

export class MessageTextStepImpl implements MessageTextStep {

    private severityMessage:MessageSeverityEnum;
    private textMessage:string = '';

    constructor(severityMessage:MessageSeverityEnum) {
        this.severityMessage = severityMessage;
    }

    setText(textMessage: string): MessageTextStepImpl {
        this.textMessage = textMessage;
        return this;            
    }

    build(): Message {
        return {
            severity: this.severityMessage,
            detail: this.textMessage,
            closable: true,
            life: 3000
        }    
    }
}