from django.db import models

class StickyNote(models.Model):
    heading = models.CharField(max_length=50, blank=True)
    note = models.TextField(max_length=500)
