from django.contrib.auth import authenticate
from django.shortcuts import get_object_or_404
from django.views.decorators.csrf import csrf_exempt
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from django.http import JsonResponse
from rest_framework.status import HTTP_200_OK, HTTP_400_BAD_REQUEST, HTTP_404_NOT_FOUND
from rest_framework.authtoken.models import Token
from adminapp.models import User,Movie_table,Watchlist,History
from rest_framework.permissions import IsAuthenticated

from apiapp.serializer import MovieSerializer,WishlistSerializer,HistorySerializer

@api_view(['POST'])
@permission_classes((AllowAny,))

def Signup(request):
        email  = request.data.get("email")
        password = request.data.get("password")

        name = request.data.get("name")
        if not name or not email or not password:
            return Response({'message':'All fields are required'})
        if User.objects.filter(email=email).exists():
            return  JsonResponse({'message':'Email already exist'})
        user = User.objects.create_user(email=email,name=name,password=password)
        
        user.save()
        return JsonResponse({'message':'user created successsfully'} ,status = 200)


@csrf_exempt
@api_view(["POST"])
@permission_classes((AllowAny,))
def login(request):
    email = request.data.get("email")
    password = request.data.get("password")
    if email is None or password is None:
        return Response({'error': 'Please provide both username and password'},
                        status=HTTP_400_BAD_REQUEST)
    user = authenticate(email=email, password=password)
    if not user:
        return Response({'error': 'Invalid Credentials'},
                        status=HTTP_404_NOT_FOUND)
    token, _ = Token.objects.get_or_create(user=user)
    return Response({
        'token': token.key,
        'email': user.email,
        'name': user.name
    }, status=HTTP_200_OK)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def Movies_page(request):
    products = Movie_table.objects.all()
    serializer = MovieSerializer(products, many=True)
    return Response(serializer.data)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def Movie_details(request,id):
    products = get_object_or_404(Movie_table,id=id)
    serializer = MovieSerializer(products)
    return Response(serializer.data)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def add_Watchlist(request):
    user = request.user
    movie_id = request.data.get('movie')

    # prevent duplicates
    if Watchlist.objects.filter(user=user, movie_id=movie_id).exists():
        return Response({"message": "Movie already in watchlist"}, status=HTTP_400_BAD_REQUEST)

    movie = Watchlist.objects.create(user=user, movie_id=movie_id)
    return Response({"message": "Movie added to watchlist"}, status=HTTP_200_OK)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def view_watchlist(request):
    user = request.user
    # get all movies that are in this user's watchlist
    watchlist_items = Watchlist.objects.filter(user=user)
    
    serializer = WishlistSerializer(watchlist_items, many=True)
    return Response(serializer.data)

from django.utils import timezone

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def add_history(request):
    user = request.user
    movie_id = request.data.get('movie')

    # Check if the movie is already in history
    history_item, created = History.objects.get_or_create(user=user, movie_id=movie_id)
    
    # If it already exists, update the date to now
    if not created:
        history_item.date = timezone.now()
        history_item.save()
        return Response({"message": "Movie history updated to latest date"}, status=200)

    return Response({"message": "Movie added to History"}, status=200)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def view_history(request):
    user = request.user.id
    history_items = History.objects.filter(user=request.user)
    serializer = HistorySerializer(history_items, many=True)
    return Response(serializer.data)

@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def changepassword(request):
    user=request.user
    old_password=request.data.get("old_password")
    new_password=request.data.get("new_password")
    if not user.check_password(old_password):
        return Response({"error": "Old password is incorrect"}, status=400)
    else:
            user.set_password(new_password)
            user.save()

            return Response({"message": "Password updated successfully"}, status=200)


