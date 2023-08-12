
/**
 * Enumera i possibili tipi di messaggio che possono essere visualizzati
 */
export class SnackBarDataTypeEnum {

    public static readonly INFO_TYPE = new SnackBarDataTypeEnum("Info", "info");
    public static readonly WARNING_TYPE = new SnackBarDataTypeEnum("Warning", "warning");
    public static readonly ERROR_TYPE = new SnackBarDataTypeEnum("Error", "error")

    constructor(public readonly description:string, public readonly icon:string) {}
}