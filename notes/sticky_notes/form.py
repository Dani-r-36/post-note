from django import forms
from .models import StickyNote

class StickyNoteForm(forms.ModelForm):
    class Meta:
        model = StickyNote
        fields = ['heading', 'note'] 
        widgets = {
            'heading': forms.TextInput(attrs={'placeholder': 'Type a title'}),
            'note': forms.TextInput(attrs={'placeholder': 'Type a description'}),
        }

class EditNoteForm(forms.ModelForm):
    class Meta:
        model = StickyNote
        fields = ['heading', 'note']
        widgets = {
            'heading': forms.TextInput(attrs={'maxlength': 20, 'placeholder': 'Type a title ...'}),
            'note': forms.Textarea(attrs={'placeholder': 'Type a description ...'}),
        }