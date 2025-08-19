from django.contrib.auth.models import AbstractBaseUser, BaseUserManager 
from django.db import models 
class UserManager(BaseUserManager): 
    def create_user(self, email, name=None,password=None): 
        if not email: 
            raise ValueError("Users must have an email address") 
        email = self.normalize_email(email) 
        user = self.model(email=email,name=name) 
        user.set_password(password) 
        user.save(using=self._db) 
        return user 
 
    def create_superuser(self, email, password,name=None): 
        user = self.create_user(email, name=name,password=password) 
        user.is_admin = True 
        user.is_superuser = True 
        user.save(using=self._db) 
        return user 
 
class User(AbstractBaseUser): 
    email = models.EmailField(unique=True) 
    name = models.CharField(max_length =255,null=True) 
    is_active = models.BooleanField(default=True) 
    is_admin = models.BooleanField(default=False) 
    is_superuser=models.BooleanField(default=False)
    objects = UserManager() 
 
    USERNAME_FIELD = 'email'

class Movie_table(models.Model):
    Movie_title=models.CharField(max_length=255)
    Movie_Description=models.TextField()
    Movie_count=models.IntegerField()
    Movie_thumbnail = models.FileField(upload_to="", null=True, blank=True)  # saves in media/
    Movie_video = models.FileField(upload_to="", null=True, blank=True) 

class Watchlist(models.Model):
    movie=models.ForeignKey(Movie_table,on_delete=models.CASCADE)
    user=models.ForeignKey(User,on_delete=models.CASCADE)
    date=models.DateTimeField(auto_now=True,null=True)

class History(models.Model):
    movie=models.ForeignKey(Movie_table,on_delete=models.CASCADE)
    user=models.ForeignKey(User,on_delete=models.CASCADE)
    date=models.DateTimeField(auto_now=True)

