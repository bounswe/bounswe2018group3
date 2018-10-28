from django.contrib import admin
from django.contrib.auth import get_user_model
#from django.contrib.auth import admin

from .forms import EventCreationForm, EventChangeForm
from .models import Event
# Register your models here.

class EventAdmin(admin.ModelAdmin):
    dd_form = EventCreationForm
    form = EventChangeForm
    model = Event
    list_display = ['name', 'info', 'id']

admin.site.register(Event, EventAdmin)