from .models import User
from datetime import datetime
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import facebook
from rest_framework.authtoken.models import Token
import json


@csrf_exempt
def login_view(request):
    """Function for login and register
        :return:token for authorization or error
    """
    data = json.loads(request.body.decode('utf-8'))
    access_token = data.get('accessToken')
    new_user = False
    try:
        graph = facebook.GraphAPI(access_token=access_token)
        user_info = graph.get_object(
            id='me',
            fields='first_name, middle_name, last_name, id, '
            'currency, hometown, location, locale, '
            'email, gender, interested_in, picture.type(large),'
            ' birthday, cover')
    except facebook.GraphAPIError:
        return JsonResponse({'error': 'Invalid data'}, safe=False)

    try:
        user = User.objects.get(facebook_id=user_info.get('id'))

    except User.DoesNotExist:
        password = User.objects.make_random_password()
        user = User(
            first_name=user_info.get('first_name'),
            last_name=user_info.get('last_name'),
            email=user_info.get('email')
            or '{0} without email'.format(user_info.get('last_name')),
            facebook_id=user_info.get('id'),
            profile_image=user_info.get('picture')['data']['url'],
            date_joined=datetime.now(),
            username=user_info.get('email') or user_info.get('last_name'),
            gender=user_info.get('gender'),
            is_active=1)
        user.set_password(password)
        user.save()
        new_user = True
    token = Token.objects.get(user=user).key
    if token:
        return JsonResponse({'auth_token': token, 'new_user': new_user},
                            safe=False)
    else:
        return JsonResponse({'error': 'Invalid data'}, safe=False)