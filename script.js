let selectedBookId = null;


// GET - Display all books
function getBooks() {

    fetch("/books")
        .then(response => response.json())
        .then(books => {

            const booksList = document.getElementById("booksList");

            booksList.innerHTML = "";

            books.forEach(book => {

                booksList.innerHTML += `
                    <div class="book">

                        <h3>${book.title}</h3>

                        <p>
                            <b>Author:</b> ${book.author}
                        </p>

                        <p>
                            <b>Year:</b> ${book.year}
                        </p>

                        <button
                            class="edit"
                            onclick="startUpdate(
                                ${book.id},
                                '${book.title}',
                                '${book.author}',
                                ${book.year}
                            )">
                            Edit
                        </button>

                        <button
                            class="delete"
                            onclick="deleteBook(${book.id})">
                            Delete
                        </button>

                    </div>
                `;

            });

        })
        .catch(error => {
            console.log(error);
        });
}


// POST - Add new book
function addBook() {

    const title = document.getElementById("title").value;
    const author = document.getElementById("author").value;
    const year = document.getElementById("year").value;

    if (title === "" || author === "" || year === "") {
        alert("Please fill all fields");
        return;
    }

    fetch("/books", {

        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify({
            title: title,
            author: author,
            year: year
        })

    })

    .then(response => response.json())

    .then(data => {

        alert(data.message);

        clearForm();

        getBooks();

    });

}


// Start Update
function startUpdate(id, title, author, year) {

    selectedBookId = id;

    document.getElementById("title").value = title;

    document.getElementById("author").value = author;

    document.getElementById("year").value = year;

    document.getElementById("updateBtn").style.display = "inline-block";

    document.getElementById("cancelBtn").style.display = "inline-block";

}


// PUT - Update book
function updateBook() {

    const title = document.getElementById("title").value;

    const author = document.getElementById("author").value;

    const year = document.getElementById("year").value;

    if (title === "" || author === "" || year === "") {
        alert("Please fill all fields");
        return;
    }

    fetch(`/books/${selectedBookId}`, {

        method: "PUT",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify({
            title: title,
            author: author,
            year: year
        })

    })

    .then(response => response.json())

    .then(data => {

        alert(data.message);

        clearForm();

        getBooks();

        document.getElementById("updateBtn").style.display = "none";

        document.getElementById("cancelBtn").style.display = "none";

        selectedBookId = null;

    });

}


// DELETE - Delete book
function deleteBook(id) {

    if (!confirm("Are you sure you want to delete this book?")) {
        return;
    }

    fetch(`/books/${id}`, {

        method: "DELETE"

    })

    .then(response => response.json())

    .then(data => {

        alert(data.message);

        getBooks();

    });

}


// Cancel Update
function cancelUpdate() {

    clearForm();

    document.getElementById("updateBtn").style.display = "none";

    document.getElementById("cancelBtn").style.display = "none";

    selectedBookId = null;

}


// Clear form
function clearForm() {

    document.getElementById("title").value = "";

    document.getElementById("author").value = "";

    document.getElementById("year").value = "";

}


// Load books when page opens
getBooks();