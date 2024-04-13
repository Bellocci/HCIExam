
/**
 * Enumera i possibili tipi di messaggio che possono essere visualizzati dalla 
 * CustomSnackbarComponent
 */
export class SnackBarDataTypeEnum {

    public static readonly INFO_TYPE = new SnackBarDataTypeEnum("Info", "info", ['snackbar-info']);
    public static readonly WARNING_TYPE = new SnackBarDataTypeEnum("Warning", "warning", ['snackbar-warning']);
    public static readonly ERROR_TYPE = new SnackBarDataTypeEnum("Error", "error", ['snackbar-error'])

    constructor(public readonly description:string, public readonly icon:string, public readonly styleClass:string[]) {}
}