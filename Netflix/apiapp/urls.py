from django.contrib import admin
from django.urls import path,include
from apiapp import views

urlpatterns = [
    path('signup/',views.Signup),
    path('login/',views.login),
    path('movies/',views.Movies_page),
    path('movies/<int:id>',views.Movie_details),
    path('add',views.add_Watchlist),
    path('view',views.view_watchlist),
    path('add_his',views.add_history),
    path('view_his',views.view_history),
    path('change_pw',views.changepassword)
]

