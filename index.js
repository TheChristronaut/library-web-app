const myLibrary = [];

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