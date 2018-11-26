from django import forms
from .models import CustomUser

class CustomUserCreationForm(forms.ModelForm):

    class Meta:
        model = CustomUser
        fields = ('username', 'email')

class CustomUserChangeForm(forms.ModelForm):

    class Meta:
        model = CustomUser
        fields = ('username', 'email')