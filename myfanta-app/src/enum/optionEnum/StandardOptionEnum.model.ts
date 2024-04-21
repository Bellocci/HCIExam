
export class StandardOptionEnum {

    public static readonly ALL = new StandardOptionEnum("ALL");
    public static readonly NONE = new StandardOptionEnum("NONE");

    private constructor(public readonly value:string) {}
}