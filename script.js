

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

function displayBook(titleSearched) {
    const foundBook = myLibrary.find((book) => {
       return book.title === titleSearched;
    });
    return foundBook;
}


addBookToLibrary(`Eragon`, `Christopher Nolan`,`299`,0);
addBookToLibrary(`Lord of the Rings`, `Tolkien`,`869`,1);

//DOM MANIPULATION

//DEFINE INPUTS


const buttonAdd = document.querySelector('#addBook');
const title = document.querySelector('#title');
const author = document.querySelector('#author');
const numpages = document.querySelector('#numpages');
const read = document.querySelectorAll('input[name="checkread"]');

//PRINT LIBRARY

myLibrary.forEach(book => {

    createRow(book.title, book.author, book.pages, book.read);

})


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
    const table = document.querySelector('table');
    const tr = document.createElement('tr');
    const td1 = document.createElement('td');
    const td2 = document.createElement('td');
    const td3 = document.createElement('td');
    const td4 = document.createElement('td');

    td1.textContent =title;
    td2.textContent =author;
    td3.textContent =pages;
    td4.textContent =read;

    tr.appendChild(td1);
    tr.appendChild(td2);
    tr.appendChild(td3);
    tr.appendChild(td4);

    table.appendChild(tr)

}

//Test

const buttonTest = document.querySelector('button.testing');
buttonTest.addEventListener('click', trial);
function trial(e){
    console.log (e.path[2]); 
    console.log(e.target.classList.value);   
}




