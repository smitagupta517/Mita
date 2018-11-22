from django.conf.urls import include, re_path
from django.contrib import admin


urlpatterns=[

    re_path("admin/", admin.site.urls),
    re_path("music/", include('music.urls')),


]