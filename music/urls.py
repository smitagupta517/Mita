from django.conf.urls import  re_path, include, url
from music import views
from django.urls import path,re_path

app_name='music'

urlpatterns = [

    # /music/
    path("", views.index, name = "index"),

    # /music/712/
    path('<int:album_id>/', views.detail, name = "detail"),

    #/music/<album_id>/favorite/
    path('<int:album_id>/favorite/', views.favorite, name = "favorite"),

]