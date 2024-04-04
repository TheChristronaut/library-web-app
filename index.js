const library = document.querySelector("#library");

const myLibrary = [];
myLibrary.sort();

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    return(this.title + " by " + author + ", " + pages + ", " + read);
}

function addBookToLibrary() {
    let newBook = Book("The Unseen Realm", "Michael Heiser" , "3000", "not yet read")
    myLibrary.push(newBook);
}

addBookToLibrary();

console.log(myLibrary);

for (const book of myLibrary) {
    const bookCard = document.createElement("div");
    bookCard.classList.add("book");
    bookCard.textContent = book;
    library.appendChild(bookCard);
}