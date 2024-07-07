from django.http import HttpRequest
from django.http.response import JsonResponse
from django.views.decorators.csrf import csrf_exempt

from rest_framework import status
from rest_framework.parsers import JSONParser
from rest_framework.decorators import api_view

from DataModel.models.UserProfilePhotoModel.user_profile_photo_model import UserProfilePhotoModel
from DataModel.models.UserProfilePhotoModel.user_profile_photo_model_serializer import UserProfilePhotoModelSerializer

@csrf_exempt
@api_view(['PUT'])
def upload_photo(request: HttpRequest, user_id: int) -> JsonResponse:
    parser = JSONParser()
    try:
        # Dizionario contenente le informazioni passate nella richiesta
        request_data = parser.parse(request)
    except Exception as e:
        return JsonResponse({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)
    
    # Verifico se esiste già una foto legata all'utente
    if(UserProfilePhotoModel.objects.filter(user=user_id).exists()):
        #
        # Update
        #
        profile_photo = UserProfilePhotoModel.objects.get(user=user_id)        
        profile_photo_serializer = UserProfilePhotoModelSerializer(profile_photo, request_data, partial=True)

        if(profile_photo_serializer.is_valid()):
            profile_photo_serializer.save()
            print("Uploaded profile photo '", profile_photo_serializer.data['photo_file_name'], "'")
            return JsonResponse({'update' : 'Profile photo successfully updated'}, status=status.HTTP_200_OK)
        
        else:
            print("Serializer data: ", profile_photo_serializer.data)
            print("Validation errors: ", str(profile_photo_serializer.errors))
            return JsonResponse(profile_photo_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    else:
        #
        # Create
        #
        request_data['user'] = user_id
        profile_photo_serializer = UserProfilePhotoModelSerializer(data=request_data)
        if(profile_photo_serializer.is_valid()):                
            profile_photo_serializer.save()
            print("Uploaded profile photo '", profile_photo_serializer.data['photo_file_name'], "'")
            return JsonResponse({'created' : 'Profile photo successfully uploaded'}, status=status.HTTP_201_CREATED)
        
        else:
            print("Serializer data: ", profile_photo_serializer.data)
            print("Validation errors: ", str(profile_photo_serializer.errors))
            return JsonResponse(profile_photo_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        

@csrf_exempt
@api_view(['PUT'])
def delete_photo(request: HttpRequest, user_id: int) -> JsonResponse:
    queryset = UserProfilePhotoModel.objects.filter(user=user_id)
    if(queryset.exists()):
        profile_photo = queryset.first()
        print("Deleted profile photo '", profile_photo.photo_file_name, "' for user ", profile_photo.user)
        profile_photo.delete()
        return JsonResponse({'delete' : 'Profile photo successfuly deleted'}, status=status.HTTP_204_NO_CONTENT)
    else:
        print("No profile photo found with id: ", user_id)
        return JsonResponse({'error' : 'Error while deleting profile photo. No image found'}, status=status.HTTP_404_NOT_FOUND)
    
