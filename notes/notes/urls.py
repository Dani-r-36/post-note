"""
URL configuration for notes project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from sticky_notes.views import create_note,all_notes, copied, submit_form_view, edit_note_view,delete_notes

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', all_notes, name = 'home'),
    path('<int:pk>/', create_note, name = 'create_note'),
    path('check', copied, name = 'copied'),
    path('submit_form', submit_form_view, name='submit_form'),
    path('edit_note/<int:note_id>/', edit_note_view, name='edit_note'),
    path('delete_note/<int:note_id>/', delete_notes, name='delete_notes'),
]
