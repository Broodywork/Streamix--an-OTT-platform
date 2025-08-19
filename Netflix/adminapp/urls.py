
from django.contrib import admin
from django.urls import path
from adminapp import views

urlpatterns = [
      path('',views.Adminlogin,name="admin"),
      path('home/',views.Home, name="home"),
      path('edit/',views.Edit, name="edit"),
      path('history/',views.History,name="history"),
      path('changepw/',views.Pass,name="Password"),
      path('views/',views.View_count,name="view_count"),
      
]
