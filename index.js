const library = document.querySelector("#library");
const newBookBtn = document.querySelector("#new-book-btn");
const closeFormBtn = document.querySelector("#close-form-btn");
const submitFormBtn = document.querySelector("#submit-form-btn");
const newBookForm = document.querySelector("#new-book-dialogue");
const pageUpdateForm = document.querySelector("#read-pages-update");
const submitUpdateFormBtn = document.querySelector("#submit-pages-form-btn");
const closeUpdateFormBtn = document.querySelector("#close--pages-form-btn");

const myLibrary = [];

function Book(title, author, pagesRead, pages, readStatus) {
    this.title = title;
    this.author = author;
    this.pagesRead = pagesRead;
    this.pages = pages;
    this.readStatus = readStatus;
    return(this.title + " by " + author + ", " + pagesRead + " of " + pages + " pages read, " + readStatus + ".");
}

function addBookToLibrary(title, author, pagesRead, pages, readStatus) {
    let newBook = new Book(title, author, pagesRead, pages, readStatus)
    myLibrary.push(newBook);

    const bookCard = document.createElement("div");
    bookCard.classList.add("book");
    const bookInfo = `${newBook.title} by ${newBook.author}, ${newBook.pagesRead} of ${newBook.pages} pages read, ${newBook.readStatus}.`;
    bookCard.textContent = bookInfo;
    bookCard.dataset.bookIndex = myLibrary.length - 1;
    library.appendChild(bookCard);

    createUpdateBtn(bookCard);
    createDeleteBtn(bookCard);
}

function createUpdateBtn(bookCard) {
    const updateBtn = document.createElement("button");
    updateBtn.textContent = "Update Pages Read";
    updateBtn.classList.add("book-btn")
    bookCard.appendChild(updateBtn);
    updateBtn.addEventListener("click", () => {
        const bookIndex = parseInt(bookCard.dataset.bookIndex);
        const book = myLibrary[bookIndex];
        pageUpdateForm.dataset.bookIndex = bookIndex
        pageUpdateForm.showModal();
    });   
}

function createDeleteBtn(bookCard) {
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.classList.add("book-btn")
    bookCard.appendChild(deleteBtn);
    deleteBtn.addEventListener("click", () => {
        deleteBook(bookCard);
    });
}

function getReadStatus(pagesReadInput, pagesInput) {
    if (pagesReadInput < pagesInput) {
        return ("not finished yet")
    } else {
        return("finished");
    }
}

function updatePagesRead(bookIndex, newPagesRead) {
    const book = myLibrary[bookIndex];
    book.pagesRead = newPagesRead;
    book.readStatus = getReadStatus(newPagesRead, book.pages);
    
    const bookCard = library.querySelector(`.book[data-book-index="${bookIndex}"]`);
    if (bookCard) {
        const bookInfo = `${book.title} by ${book.author}, ${book.pagesRead} of ${book.pages} pages read, ${book.readStatus}.`;
        bookCard.textContent = bookInfo;
    }

    createUpdateBtn(bookCard);
    createDeleteBtn(bookCard);
}

function deleteBook(bookCard) {
    bookCard.remove();
    
    const index = Array.from(library.children).indexOf(bookCard);
    
    if (index !== -1) {
        myLibrary.splice(index, 1);
    }
}

newBookBtn.addEventListener("click", () => {
    newBookForm.showModal();
});

closeFormBtn.addEventListener("click", () => {
    newBookForm.close();
});

submitFormBtn.addEventListener("click", (event) => {
    event.preventDefault();

    const titleInput = document.querySelector("#title").value;
    const authorInput = document.querySelector("#author").value;
    const pagesReadInput = document.querySelector("#page-location").value;
    const pagesInput = document.querySelector("#page-number").value;
    const inputReadStatus = getReadStatus(pagesReadInput, pagesInput);

    addBookToLibrary(titleInput, authorInput, pagesReadInput, pagesInput, inputReadStatus)

    document.querySelector("#title").value = "";
    document.querySelector("#author").value = "";
    document.querySelector("#page-location").value = "";
    document.querySelector("#page-number").value = "";

    newBookForm.close();
});

submitUpdateFormBtn.addEventListener("click", (event) => {
    event.preventDefault();
    const newPagesRead = parseInt(document.querySelector("#new-page-location").value);
    const bookIndex = parseInt(pageUpdateForm.dataset.bookIndex);
    const book = myLibrary[bookIndex];
    const newReadStatus = getReadStatus(newPagesRead, book.pages);
    updatePagesRead(bookIndex, newPagesRead);
    pageUpdateForm.close();
})

closeUpdateFormBtn.addEventListener("click", () => {
    pageUpdateForm.close();
});