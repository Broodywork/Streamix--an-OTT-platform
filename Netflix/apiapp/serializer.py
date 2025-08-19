from rest_framework import serializers
from adminapp.models import Movie_table, Watchlist, History

class MovieSerializer(serializers.ModelSerializer):
    class Meta:
        model = Movie_table
        fields = ['id', 'Movie_title', 'Movie_Description', 'Movie_thumbnail','Movie_count','Movie_video']

class WishlistSerializer(serializers.ModelSerializer):
    movie = MovieSerializer()   # ✅ only one movie per watchlist row
    class Meta:
        model = Watchlist
        fields = '__all__'

class HistorySerializer(serializers.ModelSerializer):
    movie = MovieSerializer()   # ✅ only one movie per history row
    class Meta:
        model = History
        fields = '__all__'
