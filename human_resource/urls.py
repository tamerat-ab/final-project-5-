from .import views
from django.urls import path
from django.conf import settings
from django.conf.urls.static import static
from django.contrib.staticfiles.urls import staticfiles_urlpatterns

urlpatterns=[path('', views.front_page,name='front_page'),
             path('index',views.index, name='index'),
             path('user_register',views.user_register, name='user_register'),
             path('user_login',views.user_login, name='user_login'), 
             path('user_logout',views.user_logout, name='user_logout'),
             path('applicant_form',views.applicant_form, name='applicant_form'),
             path('new_picture',views.new_picture, name='new_picture'),    
             path('<int:rec_id>/message',views.message, name='message'), 
             path('<int:user_id>/is_onwork',views.is_onwork, name='is_onwork'),
             path('all_users',views.all_users, name='all_users'),
             path('<int:user_id>/stat',views.stat, name='stat'),
             path('admin_user',views.admin_user, name='admin_user'),
             path('application',views.application, name='application'),
             path('set_rate',views.set_rate, name='set_rate'),
             path('<int:id>/edit',views.edit, name='edit'),
            #  path('new_picture',views.new_picture, name='new_picture'),
            #  path('form',views.form, name='form'),
             ]
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL,
                          document_root=settings.MEDIA_ROOT)
    
    urlpatterns += staticfiles_urlpatterns()
    # urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)