from enum import Enum

class SportEnum(Enum):
    
    SOCCER = ("SOCCER", "Calcio")
    VOLLEYBALL = ("VOLLEYBALL", "Pallavolo")
    BASKETBALL = ("BASKETBALL", "Basket")

    def __new__(cls, value: str, description:  str) -> 'SportEnum' :
        member = object.__new__(cls)
        member._value_ = value
        member.description = description
        return member
    
    @classmethod
    def choices(cls):
        return [(sport.value, sport.description) for sport in cls]