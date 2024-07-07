from enum import Enum

class CountryEnum(Enum):

    AUSTRALIA = ("AUSTRALIA", "Australia", "AUT")
    BELGIUM = ("BELGIUM", "Belgio", "BEL")
    BRAZIL = ("BRAZIL", "Brasile", "BRA")
    CAMEROON = ("CAMEROON", "Camerun", "CMR")
    CANADA = ("CANADA", "Canada", "CAN")
    ITALY = ("ITALY", "Italia", "ITA")
    ENGLAND = ("ENGLAND", "Inghilterra", "ENG")
    FRANCE = ("FRANCE", "Francia", "FRA")
    GERMANY = ("GERMANY", "Germania", "DEU")
    GREECE = ("GREECE", "Grecia", "GRC")
    LITHUANIA = ("LITHUANIA", "Lituania", "LTU")
    NIGERIA = ("NIGERIA", "Nigeria", "NGA")
    POLAND = ("POLAND", "Polonia", "POL")
    SERBIA = ("SERBIA", "Serbia", "SCG")
    SLOVENIA = ("SLOVENIA", "Slovenia", "SVN")
    SPAIN = ("SPAIN", "Spagna", "ESP")
    SWEDEN = ("SWEDEN", "Svezia", "SWE")
    SWITZERLAND = ("SWITZERLAND", "Svizzera", "CHE")
    TURKEY = ("TURKEY", "Turchia", "TUR")
    UNITED_STATES = ("UNITED_STATES", "Stati Uniti", "USA")

    def __new__(cls, value, description, short_description) -> 'CountryEnum':
        member = object.__new__(cls)
        member._value_ = value
        member.description = description
        member.short_description = short_description
        return member
    
    @classmethod
    def choices(cls):
        return [(country.value, country.description) for country in cls]