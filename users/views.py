
from urllib import request
from django.db.utils import IntegrityError
from django.shortcuts import render, redirect
from django.contrib.auth import login, authenticate, logout
from django.contrib.auth.forms import UserCreationForm
from django.contrib import messages
from django.contrib.auth.models import User


def start(request):
    if request.user.is_authenticated:
        return redirect('home')
    else:
        return redirect('login')

def user_login(request):
    if request.method == "POST":
        user = authenticate(username=request.POST['username'], password=request.POST['password'])
        if user is not None:
            login(request, user)
            messages.info(request, 'Welcome =)')
            return redirect('start')
        else:
            messages.info(request, 'User is not exists')
            return redirect('registration')
    if request.user.is_authenticated:
        return redirect('logout')
    args = {
        'type': 'login',
    }
    return render(request, 'login.html', args)


def register(request):
    if request.method == 'POST':
        username = request.POST['username']
        email = request.POST['email']
        password = request.POST['password']
        password2 = request.POST['password2']
        if password == password2:
            try:
                User.objects.create_user(username, email, password)
                messages.info(request, 'Good. Now login pleace')
                return redirect('start')
            except IntegrityError as ex:
                messages.info(request, ex)
                return redirect('start')
        else:
            messages.info(request, 'passwords are not equal')
            return redirect('registration')
    if request.user.is_authenticated:
        return redirect('logout')
    args = {
        'type': 'registration',
    }
    return render(request, 'registration.html', args)

def user_logout(request):
    logout(request)
    messages.info(request, 'Good bye')
    return redirect('login')

def index(request):
    return render(request, 'index.html')
