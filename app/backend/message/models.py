from django.db import models
from users.models import CustomUser
from django.utils import timezone

class Message(models.Model):
    content = models.TextField()
    sender = models.ForeignKey(CustomUser, on_delete=models.SET_NULL, null=True, related_name='sent_messages')
    receiver = models.ForeignKey(CustomUser, on_delete=models.SET_NULL, null=True, related_name='received_messages')
    datetime = models.DateTimeField(default=timezone.localtime())