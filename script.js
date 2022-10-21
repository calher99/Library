

let myLibrary =[];

function book(title, author, pages, read){
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}
book.prototype.info = function() {
    console.log(this.read);
    if(this.read===1){
        return (`The book ${this.title} by ${this.author} has ${this.pages} pages and it is read. `); 
    }else{
        return (`The book ${this.title} by ${this.author} has ${this.pages} pages and it is not read. `); 
    }  
} 

function addBookToLibrary(title, author, pages, read){
    myLibrary.push(new book(title, author, pages, read));
}

function findBook(titleSearched) {
    const foundBook = myLibrary.find((book) => {
       return book.title === titleSearched;
    });
    return foundBook;
}


addBookToLibrary(`Eragon`, `Christopher Nolan`,`299`,0);
addBookToLibrary(`Lord of the Rings`, `Tolkien`,`869`,1);
addBookToLibrary(`It`, `Stephen King`,`1328`,1);

//DOM MANIPULATION

//DEFINE INPUTS


const buttonAdd = document.querySelector('#addBook');
const title = document.querySelector('#title');
const author = document.querySelector('#author');
const numpages = document.querySelector('#numpages');
const read = document.querySelectorAll('input[name="checkread"]');

printLibrary();


//PRINT LIBRARY

function printLibrary(){
    //delete all table

    myLibrary.forEach(book => {
        createRow(book.title, book.author, book.pages, book.read);
    })
}



//SAVE DATA NEW BOOK


buttonAdd.addEventListener(`click`, addBook );

function addBook() {

    let readArray=Array.from(read);
    const readValue = getRadio(readArray);
    console.log(`Book is read ${readValue}`)
    addBookToLibrary(title.value, author.value,numpages.value,readValue);
    createRow(title.value, author.value,numpages.value,readValue);
    myLibrary.forEach(book => {console.log(book.info())})
    resetInputs();
    
}


//RESET InpUTS

function resetInputs(){
    title.value = null;
    author.value = null;
    numpages.value = null;
    
}

//Radio button check

function getRadio (array){
    
    const checkedButton = array.filter(array => array.checked);
    // Did not understand why cant access with checkedButton.value
    return parseInt(checkedButton[0].value);
} 

//Populate table

function createRow (title,author,pages,read){
    const tableBody = document.querySelector('tbody');
    const tr = document.createElement('tr');
    const td1 = document.createElement('td');
    const td2 = document.createElement('td');
    const td3 = document.createElement('td');
    const td4 = document.createElement('td');
    const td5 = document.createElement('td');
    const btn = document.createElement('button');

    td1.textContent =title;
    td2.textContent =author;
    td3.textContent =pages;
    td4.textContent =read;

    const first = title.replace( /\s/g, '-'); 
    console.log(first);


    btn.classList.add(first);
    td5.appendChild(btn);

    tr.classList.add(first);
    tr.appendChild(td1);
    tr.appendChild(td2);
    tr.appendChild(td3);
    tr.appendChild(td4);
    tr.appendChild(td5);

    tableBody.appendChild(tr)

}

//CLICK & REMOVE

const buttonTest = document.querySelectorAll('.bookList button');
console.log(buttonTest);
buttonTest.forEach(button => {
    button.addEventListener('click', trial)
})
function trial(e){
    
    const titleToRemove = e.target.classList.value.replaceAll( '-', ' ')
    removeFromLibrary(titleToRemove);
    printLibrary();

}


//FUNCTION TO REMOVE

function removeFromLibrary (title) {
    const bookRemove = findBook(title);
    const index = myLibrary.indexOf(bookRemove);
    myLibrary.splice(index, 1);
    myLibrary.forEach(book => {console.log(book.info())})
}

