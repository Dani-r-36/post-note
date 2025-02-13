console.log = function () {
} //disables logging

$('.darkmode-toggle').text('🌓')

document.addEventListener("DOMContentLoaded", renderNotes());

$('#creatorDate').text(`Today: ${dateGetter()}`) //sets the current date to the note creator card

function strip(str) {
    // strips out leading and trailing spaces
    return str.replace(/^\s+|\s+$/gm, '');
}

$("body").overlayScrollbars({});

// ------------------------------------------------------------------------------------------------------

$(document).on("click", "#palette", function () {
    //console.log("Palette cc=lciked")
    let paletteDiv = this.parentElement.nextElementSibling
    $(paletteDiv).toggleClass('colors').toggleClass("colors openDivs");
});

function resetNoteForm() {
    $('#createTitleInput').val('')
    $('#createDescriptionInput').val('')
    let note = $('#noteCreator').find('#bg')

    $('#noteCreator').find('#allColor').removeClass('openDivs')
    setNoteBackgroundColor(note, 'white')
    selectedCircleRemoval()
    $('#noteCreator').find('#allColor').find('#circle_white').toggleClass('selected')

}

function setNoteBackgroundColor(element, color) {
    $(element).removeAttr('class').addClass("single-note add-note " + color);
}

$(document).on("click", ".circle", function () {
    selectedCircleRemoval()
    $(this).toggleClass('selected')

    let color = this.getAttribute('data-color')
    let parentDiv = null
    if (this.parentElement.getAttribute('data-new-note')) {
        parentDiv = this.parentElement.parentElement.parentElement
    } else {
        parentDiv = this.parentElement.parentElement
    }

    setNoteBackgroundColor(parentDiv, color)
});

function selectedCircleRemoval() {
    let allCircles = $('.circle')
    for (let i = 0; i < allCircles.length; i++) {
        $(allCircles[i]).removeClass('selected')
    }
}

// ------------------------------------------------------------------------------------------------------

function appendNoteToDOM(noteID, noteTitle, noteDescription, selectedColor, date, checked) {
    let noteCard = document.createElement('div')
    noteCard.className = 'col-md-4 col-sm-6 note-box'
    noteCard.id = 'note-' + noteID
    let origin = window.location.origin
    let sharedLink = `${origin}/shared/?note=${noteID}&title=${noteTitle}&description=${noteDescription}&color=${selectedColor}&date=${date}&checked=${checked}`
    if (checked) {
        noteCard.innerHTML = `   <form id="UpdateNoteForm">
                                <div id="bg" class="single-note ${selectedColor}">

                                    <span class="notDone">
                                            <label class="my-checkbox">
                                                <input type="checkbox" id="id_is_done" class="isDone">
                                                <i class="checked fa-check-square fas"></i>
                                                <i class="unchecked fa-check-square far"></i>
                                            </label>
                                    </span>

                                    <input id="new_title" name="title" type="text" class="isDone"
                                           maxlength="20" placeholder="Type a title ..."
                                           value="${noteTitle}" readonly>

                                    <small id="timeUpdated">Last Updated: ${date}</small>
                                    <hr>
                                    <textarea id="desc"  readonly name="description" class="isDone"> ${noteDescription}</textarea>

                                    <p id="descPara" class="expand isDone" style="display: none;">${noteDescription}</p>

                                    <div class="meta">
                                        <span style="display: none;">
                                            <button name="update" id="update_btn" class="mark btn btn-lg" type="button">
                                                <i class="fas fa-check"></i>
                                            </button>
                                        </span>

                                        <span id="pencil" ><i class="fas fa-pencil-alt"></i></span>
                                        <span id="palette" class="">
                                            <i class="fas fa-palette"></i>
                                        </span>

                                        <span>
                                            <button id="delete_btn" type="button" name="delete_btn"
                                                    class="mark btn btn-lg">
                                                <i class="far fa-trash-alt"></i>
                                            </button>
                                        </span>

                                        <span id="expand"><i class="fas fa-expand"></i></span>
                                        <span id="link" data-clipboard-text="${sharedLink}">
                                            <i class="fas fa-link"></i>
                                        </span>
                                    </div>

                                    <div id="allColor" class="colors">
                                        <div id="circle_blue" class="circle blue" data-color="blue">
                                        </div>
                                        <div id="circle_yellow" class="circle yellow" data-color="yellow">
                                        </div>
                                        <div id="circle_red" class="circle red" data-color="red">
                                        </div>
                                        <div id="circle_purple" class="circle purple" data-color="purple">
                                        </div>
                                        <div id="circle_green" class="circle green" data-color="green">
                                        </div>
                                        <div id="circle_white" class="circle whiteCircle" data-color="white">
                                        </div>
                                    </div>
                                    <div id="copied" class="copied"> Note link copied !</div>
                                </div>
                            </form>
                            `

        $(noteCard).find('#id_is_done').click() // mimic clicking of checkbox so to display as checked


    } else {
        noteCard.innerHTML = `   <form id="UpdateNoteForm">
                                <div id="bg" class="single-note ${selectedColor}">

                                    <span class="notDone">
                                            <label class="my-checkbox">
                                                <input type="checkbox" id="id_is_done">
                                                <i class="checked fa-check-square fas"></i>
                                                <i class="unchecked fa-check-square far"></i>
                                            </label>
                                    </span>

                                    <input id="new_title" name="title" type="text" class="note-title"
                                           maxlength="20" placeholder="Type a title ..."
                                           value="${noteTitle}" readonly>

                                    <small id="timeUpdated">Last Updated: ${date}</small>
                                    <hr>
                                    <textarea id="desc" class="note-description"  readonly name="description"> ${noteDescription}</textarea>

                                    <p id="descPara" class="expand note-description" style="display: none;">${noteDescription}</p>

                                    <div class="meta">
                                        <span style="display: none;">
                                            <button name="update" id="update_btn" class="mark btn btn-lg" type="button">
                                                <i class="fas fa-check"></i>
                                            </button>
                                        </span>

                                        <span id="pencil" ><i class="fas fa-pencil-alt"></i></span>
                                        


                                    </div>
                                </div>
                            </form>
                            `
    }
    $('#all-notes').prepend(noteCard)

    //$(noteCard).fadeIn(700)
    let circle = $(noteCard).find('#circle_' + selectedColor)
    circle.toggleClass('selected')

}

$('#createNote').submit(function (event) {
    // Handles creation of note
    event.preventDefault();

    let createTitleInput = $('#createTitleInput').val()
    let createDescriptionInput = $('#createDescriptionInput').val()

    let selectedColor = $(this).find('.selected').attr('data-color')
    console.log("selectedColor: ", selectedColor)
    if (strip(createTitleInput).length > 1) {
        resetNoteForm()
        let noteID = getLatestID()
        let date = dateGetter()
        appendNoteToDOM(noteID, createTitleInput, createDescriptionInput, selectedColor, date, false)
        addNoteToLocalStorage(noteID, createTitleInput, createDescriptionInput, selectedColor, date)
        let formData = new FormData();
        const csrfToken = document.querySelector(
          "input[name=csrfmiddlewaretoken]"
        ).value;
        formData.append("heading", createTitleInput);
        formData.append("note", createDescriptionInput);
        formData.append("color", selectedColor);
        formData.append("csrfmiddlewaretoken", csrfToken); // Add CSRF token
        const submitFormUrl =
          document.getElementById("submitFormUrl").dataset.url;
        // Send an AJAX request to the Django view
        fetch(submitFormUrl, {
            method: "POST",
            body: formData, // Pass formData as the body of the request
            headers: {
                "X-CSRFToken": csrfToken,
            },
            })
        .then(response => {
        if (response.ok) {
            console.log("Note saved successfully");
            // Optionally, you can perform any actions after the note is successfully saved
        } else {
            throw new Error("Failed to save note");
        }
        })
        .catch(error => {
        console.error("Failed to save note:", error);
        });



function dateGetter() {
    // returns the current day formatted ::: Sat, 08th Aug 2020
    var today = new Date();
    var day = today.toString().split(' ')[0];
    let month = today.toString().split(' ')[1];
    let dayInt = (today.toString().split(' ')[2]);
    let year = today.toString().split(' ')[3];

    return day + ', ' + dayInt + ' ' + month + ' ' + year
}

function getLatestID() {
    // fetches the last id in localstorage and add 1 else returns 0
    let allNotes = getAllNotesFromLocalStorage()
    //console.log(allNotes)
    if (allNotes !== null) {

        let ids = []
        allNotes.forEach(function (note, index) {
            //console.log(note)
            //console.log(note.id)
            ids.push(note.id)

        });

        //console.log(ids)
        var largest = ids[0];

        for (var i = 0; i < ids.length; i++) {
            if (largest < ids[i]) {
                largest = ids[i];
            }
        }

        //console.log("Largest is", largest)
        largest += 1
        //console.log("Largest after adding 1", largest)
        //console.log(allNotes)
        return largest
    } else {
        // No notes found
        //console.log("NO previus id")
        return 0
    }
}

// ------------------------------------------------------------------------------------------------------

function addNoteToLocalStorage(id, title, description, color, date) {
    let noteObject = {
        id: id,
        title: title,
        description: description,
        checked: false,
        date: date,
        color: color
    }
    let notes = getAllNotesFromLocalStorage();
    notes.push(noteObject);
    localStorage.setItem("stickynotes", JSON.stringify(notes));
    console.log("Saved to localstorage");
}

function getAllNotesFromLocalStorage() {
    let note;
    if (localStorage.getItem("stickynotes") === null) {
        note = [];
    } else {
        note = JSON.parse(localStorage.getItem("stickynotes"));
    }
    //console.log("Get notes from localstorage");
    return note;
}

function renderNotes() {
    // render all notes to dom
    const allNotes = getAllNotesFromLocalStorage()

    if (allNotes !== null) {
        console.log("Note Rendered")
        allNotes.forEach(function (note, index) {
            appendNoteToDOM(note.id, note.title, note.description, note.color, note.date, note.checked)
            //console.log("note rendered - ", note.id, "with title - ", note.title)

        });

    } else {
        console.log("Empty. No Note Rendered")
        const div = `<div class="container text-center"
                             style="display: flex; justify-content: center; margin-bottom: 50px;">
                            <div class="col-md-3 col-sm-5">
                                <h2><small>No notes for now <br>Start by creating one</small></h2>
                            </div>
                        </div>`

    }

}

function deleteNoteFromLocalStorage(id) {
    console.log("Deleting from local storage : - ", id)

    const allNotes = getAllNotesFromLocalStorage()

    allNotes.forEach(function (note, index) {
        if ("" + note.id === id) {
            console.log("Note is present and will be deleted: ", note.id, note.title)
            allNotes.splice(index, 1); // remove the element from the array
        }
    });

    LocalStorageSetter(allNotes)

}

function LocalStorageSetter(noteObjects) {
    // Ubdates all the notes in localstorage to noteObjects
    localStorage.setItem("stickynotes", JSON.stringify(noteObjects));
}

function updateNoteFromLocalStorage(id, title, description, color, checked, date) {
    const allNotes = getAllNotesFromLocalStorage()

    allNotes.forEach(function (note, index) {
        if ("" + note.id === id) {
            console.log("Note is present with: ", note.id, note.title)
            note.title = title
            note.description = description
            note.color = color
            note.date = date
            note.checked = checked
        }
    });
    LocalStorageSetter(allNotes)

}

// ------------------------------------------------------------------------------------------------------


$(document).on("click", "#pencil", function () {
    console.log("Pencil clciked")
    //console.log(this)

    let paragraph = this.parentElement.previousElementSibling
    let textArea = this.parentElement.previousElementSibling.previousElementSibling
    let input = this.parentElement.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling

    //console.log("textArea", textArea)
    //console.log("input", input)

    if ($(textArea).is(":hidden")) {
        $(paragraph).hide()
        $(textArea).show()
    }

    textArea.removeAttribute('readonly')
    input.removeAttribute('readonly')

    $(this.previousElementSibling).show() // show update btn
    $(this).hide() // hide pencil
});

$(document).on("click", "#update_btn", function (e) {
    e.preventDefault()
    console.log("update_btn clciked")
    // console.log(this)

    let textArea = this.parentElement.parentElement.previousElementSibling.previousElementSibling
    let input = this.parentElement.parentElement.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling

    textArea.setAttribute('readonly', 'true')
    input.setAttribute('readonly', 'true')

    let parentDiv = textArea.parentElement.parentElement.parentElement.id
    let noteID = parentDiv.replace(/[^0-9]/g, '') // strips out anything that aint a digit. So it returns the id only

    $(this.parentElement).hide() //hide update btn
    $(this.parentElement.nextElementSibling).show() // show pencil


    let noteTitle = $(input).val()
    let noteDescription = $(textArea).val()
    let color = strip(textArea.parentElement.className.replace('single-note', ''))
    let checked = input.previousElementSibling.children[0].children[0].classList.contains('isDone')
    let date = dateGetter()

    let dateElement = $(input.nextElementSibling).text(`Last Updated: ${date}`)

    updateNoteFromLocalStorage(noteID, noteTitle, noteDescription, color, checked, date)
});

$(document).on("click", "#delete_btn", function (e) {
    e.preventDefault()
    console.log("delete_btn clciked")
    // console.log(this)
    let noteCard = this.parentElement.parentElement.parentElement.parentElement.parentElement
    let noteID = noteCard.id.replace(/[^0-9]/g, '') // strips out anything that aint a digit. So it returns the id only
    //console.log("Deleting -", noteID)

    alertify.confirm('Confirm Delete', 'Are you sure you want to delete this Note', function () {

        $(noteCard).fadeOut('600')
        $(noteCard).remove()
        deleteNoteFromLocalStorage(noteID)

        alertify.success('Note deleted');
        console.log("Note deleted")
    }, function () {
        console.log("Note cancelled ")
    }).set('resizable', true).set('labels', {ok: 'Yes', cancel: 'Nah, cancel'});

});

$(document).on("click", "#expand", function () {
    console.log("Expand clciked")
    //console.log(this)

    let paragraph = this.parentElement.previousElementSibling
    let textArea = this.parentElement.previousElementSibling.previousElementSibling

    //console.log("paragraph: ",paragraph)
    //console.log("textArea: ",textArea)

    if ($(paragraph).is(":hidden")) {
        //console.log("para is hidden so will show now")
        $(paragraph).show()
        $(textArea).hide()
    } else {
        //console.log("para is shown so will hidden now")
        $(paragraph).hide()
        $(textArea).show()
    }

});

$(document).on("click", "#link", function () {

    let div = this.parentElement.nextElementSibling.nextElementSibling

    $(div).toggleClass('openDivs')

    $(div).attr('class', 'copied openDivs');
    $(div).fadeOut(800, function () {
        $(div).fadeIn(300);
        $(div).attr('class', 'copied');

    });

});


// ------------------------------------------------------------------------------------------------------


$(document).on("keyup", "#desc", function () {
    // Automatically sets the paragraph text to the description text when a key is clicked
    // console.log(this.value)
    let descriptionValue = this.value

    let paragraph = this.nextElementSibling
    //console.log(paragraph)
    $(paragraph).text(descriptionValue)

});

$(document).on("click", "#id_is_done", function (event) {
    //console.log("Chekcer")
    //console.log(this)
    let title = this.parentElement.parentElement.nextElementSibling
    let description = this.parentElement.parentElement.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling
    let paragraph = this.parentElement.parentElement.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling
    let parentDiv = this.parentElement.parentElement.parentElement.parentElement.parentElement.id

    if ($(this).prop('checked')) {
        //console.log("Checked")
        $(title).addClass('isDone')
        $(description).addClass('isDone')
        $(paragraph).addClass('isDone')
        $(this).addClass("isDone")

    } else {
        //console.log("Unchceked")
        $(title).removeClass('isDone')
        $(description).removeClass('isDone')
        $(paragraph).removeClass('isDone')
        $(this).removeClass("isDone")
    }

    let noteID = parentDiv.replace(/[^0-9]/g, '') // strips out anything that aint a digit. So it returns the id only
    let noteTitle = $(title).val()
    let color = strip(title.parentElement.className.replace('single-note', ''))
    let noteDescription = $(description).val()
    let checked = this.classList.contains('isDone')
    let date = dateGetter()
    //console.log(noteID, noteTitle, noteDescription, "color: ", color, "checked: ", checked, date)

    updateNoteFromLocalStorage(noteID, noteTitle, noteDescription, color, checked, date)

});
// ------------------------------------------------------------------------------------------------------


document.getElementById("searchNotesInput").addEventListener("keyup", function () {
    // Search notes
    let searchNotesInput = strip(this.value.toLowerCase())

    var all = document.querySelectorAll("#new_title")
    if (all !== null) {
        for (let note of all) {
            let title = note.value.toLowerCase();
            //console.log(item)
            let parent = note.parentElement.parentElement.parentElement
            let description = note.nextElementSibling.nextElementSibling.nextElementSibling.value.toLowerCase();

            if (title.indexOf(searchNotesInput) != -1 || description.indexOf(searchNotesInput) != -1) {
                $(parent).show()
            } else if (searchNotesInput === '' || searchNotesInput === null) {
                $(parent).show()
            } else {
                $(parent).hide()
            }
        }
    } else {
        console.log("No notes")
    }

});

$('#searchNotesInput').on('input', function (e) {
    // X icon shows on some browsers
    // event fired when the X icon is clicked in search-box
    // returns all notes to their previous states (hidden ==> show)
    if ('' == this.value) {
        var all = document.querySelectorAll(".note-box")

        for (let noteBox of all) {
            $(noteBox).show()
        }

    }
});

$('#searchForm').submit(function (event) {
    event.preventDefault();
});

