from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import path, include
from users.views import *
from tests.views import *


urlpatterns = [
    path('admin/', admin.site.urls, name='admin'),
    path('', start, name='start'),
    path('login/', user_login, name='login'),
    path('registration/', register, name='registration'),
    path('logout/', user_logout, name='logout'),
    path('home/', index, name='home'),

    path('tests/', tests_view, name='tests'),
    path('test/<int:pk>/session_create/', session_create, name='session_create'),
    path('test_session/<int:session_pk>', test_view, name='test'),
    path('test_session/<int:session_pk>/results/', test_complited, name='test_complited'),

    path('results/', results, name='results'),
    path('result/<int:session_pk>/', result, name='result'),

    path('drink/', include('alcohol.urls'))

] + static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)

urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)


