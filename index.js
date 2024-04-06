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

    createProgressBar(bookCard, newBook.pagesRead, newBook.pages);
    createUpdateBtn(bookCard);
    createDeleteBtn(bookCard);
}

function createUpdateBtn(bookCard) {
    const updateBtn = document.createElement("button");
    updateBtn.classList.add("book-btn");
    updateBtn.classList.add("update-book-btn");

    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg")
    svg.setAttribute("xmlns", "http://www.w3.org/2000/svg");
    svg.setAttribute("height", "24");
    svg.setAttribute("viewBox", "0 -960 960 960");
    svg.setAttribute("width", "24");

    const path = document.createElementNS("http://www.w3.org/2000/svg", "path")
    path.setAttribute("d", "M200-200v-560 560Zm80-400h400v-80H280v80Zm0 160h190q20-24 43.5-44.5T565-520H280v80Zm0 160h122q2-21 7.5-41t13.5-39H280v80Zm-80 160q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h560q33 0 56.5 23.5T840-760v223q-19-8-39-13.5t-41-7.5v-202H200v560h202q2 21 7.5 41t13.5 39H200Zm520 80q-73 0-127.5-45.5T524-200h62q13 44 49.5 72t84.5 28q58 0 99-41t41-99q0-58-41-99t-99-41q-29 0-54 10.5T622-340h58v60H520v-160h60v57q27-26 63-41.5t77-15.5q83 0 141.5 58.5T920-240q0 83-58.5 141.5T720-40Z");

    svg.appendChild(path);
    updateBtn.appendChild(svg);

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
    deleteBtn.classList.add("book-btn");
    deleteBtn.classList.add("delete-book-btn");

    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("xmlns", "http://www.w3.org/2000/svg");
    svg.setAttribute("height", "24");
    svg.setAttribute("viewBox", "0 -960 960 960");
    svg.setAttribute("width", "24");

    const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
    path.setAttribute("d", "m376-300 104-104 104 104 56-56-104-104 104-104-56-56-104 104-104-104-56 56 104 104-104 104 56 56Zm-96 180q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520Zm-400 0v520-520Z");

    svg.appendChild(path);
    deleteBtn.appendChild(svg);
    
    bookCard.appendChild(deleteBtn); 
    deleteBtn.addEventListener("click", () => {
        deleteBook(bookCard);
    });
}

function createProgressBar(bookCard, progressPagesRead, progressPages) {
    const progressBar = document.createElement('div');
    progressBar.classList.add("progress-bar");
    const progressBarTotal = document.createElement('div');
    progressBarTotal.classList.add("progress-total");
    progressBarTotal.style.height = "100%";
    let totalProgressPercent = percentage(progressPagesRead, progressPages) + "%";
    progressBarTotal.style.width = totalProgressPercent;
    
    function percentage(progressPagesRead, progressPages) {
        let num1 = parseInt(progressPagesRead);
        let num2 = parseInt(progressPages);
        let totalProgress = parseInt((num1 * 100) / num2);
        return(totalProgress);
    }

    progressBar.appendChild(progressBarTotal);
    bookCard.appendChild(progressBar);
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

    createProgressBar(bookCard, book.pagesRead, book.pages);
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