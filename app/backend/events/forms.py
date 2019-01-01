from django import forms
from django.contrib.auth.forms import UserCreationForm, UserChangeForm
from .models import Event

class EventCreationForm(forms.ModelForm):

    class Meta:
        model = Event
        fields = ('name', 'info', 'date')

class EventChangeForm(forms.ModelForm):

    class Meta:
        model = Event
        fields = ('name', 'info', 'date')