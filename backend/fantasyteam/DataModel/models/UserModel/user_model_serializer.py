import re
from rest_framework import serializers

from DataModel.models.UserModel.user_model import UserModel
from DataModel.models.UserProfilePhotoModel.user_profile_photo_model import UserProfilePhotoModel
from DataModel.models.UserProfilePhotoModel.user_profile_photo_model_serializer import UserProfilePhotoModelSerializer

class UserModelSerializer(serializers.ModelSerializer):
    # Serializer nested per il campo OneToOne
    profile_photo = UserProfilePhotoModelSerializer(required=False) 

    class Meta:
        model = UserModel
        fields = ['user_id', 'name', 'surname', 'username', 'password', 'profile_photo']
        # Imposta write_only=True per il campo password in modo che non venga incluso nelle risposte API
        extra_kwargs = {
            'password': {'write_only': True}
        } 

    def to_representation(self, instance):
        data = super().to_representation(instance)
        queryset = UserProfilePhotoModel.objects.filter(user=instance)
        if(queryset.exists()):            
            # Si aggiunge alla serializzazione anche la foto profilo dell'utente, se presente
            profile_photo = queryset.first()
            data['profile_photo'] = UserProfilePhotoModelSerializer(profile_photo).data
        return data
    
    #
    # VALIDAZIONI
    #

    def validate(self, data):
        # Verifica se il campo è presente nei dati di input
        profile_photo = data.get('additional_field', None)
        if profile_photo:
            self.context['profile_photo'] = profile_photo
        return data
    
    def validate_name(self, value):
        if(value is None or len(value) == 0):
            raise serializers.ValidationError('Name is mandatory')
        return value
    
    def validate_surname(self, value):
        if(value is None or len(value) == 0):
            raise serializers.ValidationError('Surname is mandatory')
        return value
    
    def validate_username(self, value):
        if(value is None or len(value) == 0):
            raise serializers.ValidationError('Username is mandatory')
        
        if(len(value) <= 3):
            raise serializers.ValidationError('Username must have at least 3 character')
        
        # Verifico che non esista già un utente con questo username
        queryset = UserModel.objects.filter(username=value)
        if(queryset.exists()):
            validation_error_message = ("Username '", value, " already exist")
            print(validation_error_message)
            raise serializers.ValidationError(validation_error_message)
        
        return value
    
    def validate_password(self, value):
        if(value is None or len(value) == 0):
            raise serializers.ValidationError('Password is mandatory')
        
        if(not self.__is_valid_password(value)):
            validation_error_message = ("Password must be at least 8 characters long and have at least one "
                "lower case character, one upper case character, a number and a special character")
            raise serializers.ValidationError(validation_error_message)
        
        return value
        
    def __is_valid_password(self, password) -> bool:
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
        
