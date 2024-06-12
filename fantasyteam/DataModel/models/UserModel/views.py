from django.http import HttpRequest
from django.http.response import JsonResponse
from django.views.decorators.csrf import csrf_exempt

from rest_framework import status
from rest_framework.parsers import JSONParser
from rest_framework.decorators import api_view

from DataModel.models.UserModel.user_model import UserModel
from DataModel.models.UserModel.user_model_serializer import UserModelSerializer

@csrf_exempt
@api_view(['POST'])
def find_user(request: HttpRequest) -> JsonResponse:
    parser = JSONParser()
    try:
        # Dizionario contenente le informazioni passate nella richiesta
        request_data = parser.parse(request)
    except Exception as e:
        return JsonResponse({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)

    username = request_data.get('username')
    password = request_data.get('password')

    validation = {}
    if(username is None or len(username) == 0):
        validation['error_username'] = 'Username is mandatory'
    
    if(password is None or len(password) == 0):
        validation['error_password'] = 'Password is mandatory'

    if(validation):
        return JsonResponse(validation, status=status.HTTP_400_BAD_REQUEST)

    try:
        user = UserModel.objects.get(username=username, password=password)
        print("User found: ", user)
        user_serializer:UserModelSerializer = UserModelSerializer(user)
        return JsonResponse(user_serializer.data, status=status.HTTP_200_OK)    
    except UserModel.DoesNotExist: 
        return JsonResponse({'error' : 'User not found'}, status=status.HTTP_404_NOT_FOUND)
    

@csrf_exempt
@api_view(['POST'])
def create_new_user(request: HttpRequest) -> JsonResponse:
    parser = JSONParser()
    try:
        # Dizionario contenente le informazioni passate nella richiesta
        request_data = parser.parse(request)
    except Exception as e:
        return JsonResponse({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)        

    user_serializer:UserModelSerializer = UserModelSerializer(data=request_data)
    if(user_serializer.is_valid()):
        user_serializer.save()
        print("Created new user: ", user_serializer.data['name'], " ", user_serializer.data['surname'])
        return JsonResponse(user_serializer.data, status=status.HTTP_200_OK)
    else:        
        print('Failed to create new user: ', user_serializer.errors)
        return JsonResponse(user_serializer.errors, status=status.HTTP_409_CONFLICT)
    

@csrf_exempt
@api_view(['POST'])
def retrieve_password(request: HttpRequest) -> JsonResponse:
    parser = JSONParser()
    try:
        # Dizionario contenente le informazioni passate nella richiesta
        request_data = parser.parse(request)
    except Exception as e:
        return JsonResponse({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)
    
    name = request_data.get('name')
    surname = request_data.get('surname')
    username = request_data.get('username')

    validation = {}
    if(name is None or len(name) == 0):
        validation['error_name'] = "Name is mandatory"
    
    if(surname is None or len(surname) == 0):
        validation['error_surname'] = "Surname is mandatory"
    
    if(username is None or len(username) == 0):
        validation['error_username'] = "Username is mandatory"

    if(validation):
        return JsonResponse(validation, status=status.HTTP_400_BAD_REQUEST)
    
    try:
        user = UserModel.objects.get(name=name, surname=surname, username=username)
        print("Recovered password for user: ", user)
        user_serializer = UserModelSerializer(user)
        # Si aggiunge manualmente la password nell'oggetto user serializzato siccome il
        # serializer, per come è definito, non lo definisce tra i parametri
        data = user_serializer.data
        data['password'] = user.password
        return JsonResponse(data, status=status.HTTP_200_OK)
    
    except UserModel.DoesNotExist:
        error_message = "Failed to retrieve user " + name + " " + surname + " with username '" + username + "'"
        return JsonResponse({'error' : error_message}, status=status.HTTP_404_NOT_FOUND)