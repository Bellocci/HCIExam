from base64 import b64decode

from django.core.files.storage import default_storage
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

    if(username is None):
        return JsonResponse({'error' : 'Username is mandatory'}, status=status.HTTP_400_BAD_REQUEST)
    
    if(password is None):
        return JsonResponse({'error' : 'Password is mandatory'}, status=status.HTTP_400_BAD_REQUEST)

    try:
        user = UserModel.objects.get(username=username, password=password)
        user_serializer:UserModelSerializer = UserModelSerializer(user)
        return JsonResponse(user_serializer.data, status=status.HTTP_200_OK)
    
    except UserModel.DoesNotExist: 
        return JsonResponse({'error' : 'User not found'}, status=status.HTTP_404_NOT_FOUND)