from django.shortcuts import render, get_object_or_404, redirect
from .form import StickyNoteForm
from .form import EditNoteForm
from .models import StickyNote

# Create your views here.
def create_note(request, pk):
    instance = get_object_or_404(StickyNote, pk=pk)
    # form = StickyNoteForm(request.POST or None, instance=instance)
    print(10)
    if request.method =="POST":
        print(12)
        form = StickyNoteForm(request.POST, instance=instance)
        # if form.is_valid():
        #     print(15)
        if request.POST.get("delete_note") is not None:
            print("it was a delete")
            StickyNote.objects.filter(pk=pk).delete()
            return redirect("home")
        else:
            if form.is_valid():
                print(20)
                form.save()
                return render(request, "home_test.html", {"notes":StickyNote.objects.all()})
    else:
        print(24)
        form = StickyNoteForm(instance=instance)
    print(26)
    return render(request, "form.html", {"form":form, "pk": pk})

def all_notes(request):
    if request.method == "GET":
        search_term = request.GET.get("search_term")
        if search_term:
            notes = StickyNote.objects.filter(heading__icontains=search_term)  # Filter by heading
        else:
            notes = StickyNote.objects.all()
    return render(request, "home_test.html", {"notes":notes})

def copied(request):
    if request.method == 'POST':
        heading = request.POST.get('heading')
        note = request.POST.get('note')
        print(25)
        print(heading,note)
    notes = StickyNote.objects.all()
    return render(request, "home_test.html", {"notes":notes})

def submit_form_view(request):
    if request.method == 'POST':
        heading = request.POST.get('heading')
        note = request.POST.get('note')
        print(34)
        print(heading, note)
        StickyNote.objects.create(heading=heading, note=note)
        notes = StickyNote.objects.all()
        # return render(request, "bs_home.html", {"notes":notes})  # Redirect to home page after submission
        return redirect('home')
    else:
        return render(request, 'home.html') 

def edit_note_view(request, note_id):
    note = StickyNote.objects.get(pk=note_id)
    print("46")
    if request.method == 'POST':
        form = EditNoteForm(request.POST, instance=note)  # Update existing note instance
        print("49")
        if form.is_valid():
            form.save()
            # Redirect to note list or confirmation page
            return redirect('home')
    else:
        form = EditNoteForm(instance=note)  # Pre-populate the form with existing data
    context = {'form': form}
    return render(request, 'home_test.html', {"notes":form})

def delete_notes(request, note_id):
    print(61)
    if request.method == "POST":
        print(63)
        StickyNote.objects.filter(pk=note_id).delete()
        # selected_notes = request.POST.getlist("notes_to_delete")  # Get selected note IDs
        # StickyNote.objects.filter(pk__in=selected_notes).delete()  # Delete notes with those IDs
        return redirect("home")  # Redirect to notes list view
    else:
        print(68)
        return redirect("home") 