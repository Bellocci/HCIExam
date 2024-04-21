import { DialogDataAbstract } from "./dialog-data.abstract";

/**
 * Interfaccia per la costruzione dell'oggetto contenente 
 * i dati da passare all'apertura della dialog
 */
export interface DialogDataBuilderInterface {

    build() : DialogDataAbstract;
}

