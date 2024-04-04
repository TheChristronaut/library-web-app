const library = document.querySelector("#library");
const newBookBtn = document.querySelector("#new-book-btn");
const closeFormBtn = document.querySelector("#close-form-btn");
const submitFormBtn = document.querySelector("#submit-form-btn");
const newBookForm = document.querySelector("#new-book-dialogue");

const myLibrary = [];
myLibrary.sort();

function Book(title, author, pagesRead, pages, read) {
    this.title = title;
    this.author = author;
    this.pagesRead = pagesRead;
    this.pages = pages;
    this.read = read;
    return(this.title + " by " + author + ", " + pagesRead + " of " + pages + " pages read, " + read);
}

function addBookToLibrary(title, author, pagesRead, pages, read) {
    let newBook = Book(title, author, pagesRead, pages, read)
    myLibrary.length = 0;
    myLibrary.push(newBook);
    for (const book of myLibrary) {
        const bookCard = document.createElement("div");
        bookCard.classList.add("book");
        bookCard.textContent = book;
        library.appendChild(bookCard);
    }
}

addBookToLibrary("A Crown of Ivy and Glass", "Claire LeGrand", "554", "554", "finished.");

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
    //const readInput = document.querySelector("#read-status").value;

    addBookToLibrary(titleInput, authorInput, pagesReadInput, pagesInput, "finished")

    document.querySelector("#title").value = "";
    document.querySelector("#author").value = "";
    document.querySelector("#page-location").value = "";
    document.querySelector("#page-number").value = "";
    //document.querySelector("#read-status").value = "";

    newBookForm.close();
});