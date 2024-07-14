
export class CountryEnum {

    public static readonly AUSTRALIA = new CountryEnum("AUSTRALIA", "Australia", "AUT");
    public static readonly BELGIUM = new CountryEnum("BELGIUM", "Belgio", "BEL")
    public static readonly BRAZIL = new CountryEnum("BRAZIL", "Brasile", "BRA")
    public static readonly CAMEROON = new CountryEnum("CAMEROON", "Camerun", "CMR")
    public static readonly CANADA = new CountryEnum("CANADA", "Canada", "CAN")
    public static readonly ITALY = new CountryEnum("ITALY", "Italia", "ITA")
    public static readonly ENGLAND = new CountryEnum("ENGLAND", "Inghilterra", "ENG")
    public static readonly FRANCE = new CountryEnum("FRANCE", "Francia", "FRA")
    public static readonly GERMANY = new CountryEnum("GERMANY", "Germania", "DEU")
    public static readonly GREECE = new CountryEnum("GREECE", "Grecia", "GRC")
    public static readonly LITHUANIA = new CountryEnum("LITHUANIA", "Lituania", "LTU")
    public static readonly NIGERIA = new CountryEnum("NIGERIA", "Nigeria", "NGA")
    public static readonly POLAND = new CountryEnum("POLAND", "Polonia", "POL")
    public static readonly SERBIA = new CountryEnum("SERBIA", "Serbia", "SCG")
    public static readonly SLOVENIA = new CountryEnum("SLOVENIA", "Slovenia", "SVN")
    public static readonly SPAIN = new CountryEnum("SPAIN", "Spagna", "ESP")
    public static readonly SWEDEN = new CountryEnum("SWEDEN", "Svezia", "SWE")
    public static readonly SWITZERLAND = new CountryEnum("SWITZERLAND", "Svizzera", "CHE")
    public static readonly TURKEY = new CountryEnum("TURKEY", "Turchia", "TUR")
    public static readonly UNITED_STATES = new CountryEnum("UNITED_STATES", "Stati Uniti", "USA")

    private static countries:CountryEnum[] = [
        this.AUSTRALIA,
        this.BELGIUM,
        this.BRAZIL,
        this.CAMEROON,
        this.CANADA,
        this.ITALY,
        this.ENGLAND,
        this.FRANCE,
        this.GERMANY,
        this.GREECE,
        this.LITHUANIA,
        this.NIGERIA,
        this.POLAND,
        this.SERBIA,
        this.SLOVENIA,
        this.SPAIN,
        this.SWEDEN,
        this.SWITZERLAND,
        this.TURKEY,
        this.UNITED_STATES
    ]

    private constructor(
        public readonly value: string, 
        public readonly shortDescription: string, 
        public readonly description: string) {}

    
    getAllCountries():CountryEnum[] {
        return [...CountryEnum.countries];
    }

    toJSON() : any {
        return {
            value : this.value,
            shortDescription : this.shortDescription,
            description : this.description
        }
    }

    static fromJSON(json:any) : CountryEnum {
        return new CountryEnum(json.value, json.shortDescription, json.description);
    }
}