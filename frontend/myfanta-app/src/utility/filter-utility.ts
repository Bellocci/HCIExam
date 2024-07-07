

export class FilterUtility {

    public static isStringEmpty(text:string) : boolean {
        return text == null || text.trim().length == 0;
    }
}