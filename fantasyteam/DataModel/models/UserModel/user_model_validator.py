import re

from DataModel.models.UserModel.user_model import UserModel

class UserModelVaidator:

    def validate(self, user:UserModel) -> dict:
        validation = {}

        if(user.name is None or len(user.name) == 0):
            validation['error_name'] = "Name cannot be empty."

        if(user.surname is None or len(user.surname) == 0):
            validation['error_surname'] = 'Surname cannot be empty.'

        if(user.username is None):
            validation['error_username'] = 'Username cannot be empty.'
        elif(len(user.username) <= 3):
            validation['error_username'] = 'Username must have at least 3 character.'

        '''Verifico che non esista già un utente con questo username'''
        queryset = UserModel.objects.filter(username=user.username)
        if(queryset.exists()):
            validation['error_exist_username'] = "Username '" + user.username + " has already been used."

        if(user.password is None):
            validation['error_password'] = 'Password cannot be empty.'
        else:
            # Controllo che la password rispetti i requisiti
            if(not self.__validate_password(user.password)):
                password_error_message = ("Password must be at least 8 characters long and have at least one "
                "lower case character, one upper case character, a number and a special character")
                validation['error_password'] = password_error_message
        
        return validation
    

    def __validate_password(self, password) -> bool:
        '''
        Si controlla che la password rispetti le seguenti condizioni:
        1) (?=.*[A-Z]): Verifica che ci sia almeno una lettera maiuscola.
        2) (?=.*[a-z]): Verifica che ci sia almeno una lettera minuscola.
        3) (?=.*\d): Verifica che ci sia almeno un numero
        4) (?=.*[!@#$%^&*(),.?":{}|<>]): Verifica che ci sia almeno un carattere speciale 
        5) [A-Za-z\d!@#$%^&*(),.?":{}|<>]{8,}$: Verifica che la stringa contenga solo lettere (maiuscole o minuscole), 
            numeri e caratteri speciali, e che sia lunga almeno 8 caratteri.
        '''
        pattern = re.compile(
            r'^(?=.*[A-Z])'
            r'(?=.*[a-z])'
            r'(?=.*\d)'
            r'(?=.*[!@#$%^&*(),.?":{}|<>])'
            r'[A-Za-z\d!@#$%^&*(),.?":{}|<>]{8,}$'
        )
        return bool(pattern.match(password))