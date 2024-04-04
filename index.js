const library = document.querySelector("#library");
const newBookBtn = document.querySelector("#new-book-btn");
const closeFormBtn = document.querySelector("#close-form-btn")
const newBookForm = document.querySelector("#new-book-dialogue")

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

function addBookToLibrary() {
    let newBook = Book("The Unseen Realm", "Michael Heiser" ,"2000", "3000", "not finished yet.")
    myLibrary.push(newBook);
}

addBookToLibrary();
addBookToLibrary();
addBookToLibrary();
addBookToLibrary();
addBookToLibrary();
addBookToLibrary();
addBookToLibrary();
addBookToLibrary();
addBookToLibrary();

for (const book of myLibrary) {
    const bookCard = document.createElement("div");
    bookCard.classList.add("book");
    bookCard.textContent = book;
    library.appendChild(bookCard);
}

newBookBtn.addEventListener("click", () => {
    newBookForm.showModal();
})

closeFormBtn.addEventListener("click", () => {
    newBookForm.close();
});