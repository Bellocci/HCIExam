import { DialogDataBuilderInterface } from "./dialog-data-builder.interface";
import { DialogDataAbstract } from "./dialog-data.abstract";

export abstract class DialogDataBuilderAbstract implements DialogDataBuilderInterface {
    
    /*
     * ============
     * CONSTRUCTOR 
     * ============
     */
    constructor() { }

    abstract build(): DialogDataAbstract;
}