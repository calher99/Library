

let myLibrary =[];

function book(title, author, pages, read){
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}
book.prototype.info = function() {
   
    if(this.read==="read"){
        return (`The book ${this.title} by ${this.author} has ${this.pages} pages and it is read. `); 
    }else{
        return (`The book ${this.title} by ${this.author} has ${this.pages} pages and it is not read. `); 
    }  
} 

book.prototype.setRead = function() {
    
    if(this.read ==="read"){
        this.read = "unread";
    }else{
        this.read = "read";
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


addBookToLibrary(`Eragon`, `Christopher Nolan`,`299`,'read');
addBookToLibrary(`Lord of the Rings`, `Tolkien`,`869`,'unread');
addBookToLibrary(`It`, `Stephen King`,`1328`,'read');

// --------------------------------------------------------------------------------
//DOM MANIPULATION

//DEFINE INPUTS


const buttonAdd = document.querySelector('#addBook');
const title = document.querySelector('#title');
const author = document.querySelector('#author');
const numpages = document.querySelector('#numpages');
const read = document.querySelectorAll('input[name="checkread"]');

printLibrary();


//NOT WORKING FOR NEW BOOKS BC THE DYNAMICALLY CREATED ELEMENTS ARE NOT FOUND BY EVENT LISTENER
// WE NEED TO USE EVENT DELEGATION

// let buttonTest = document.querySelectorAll('.bookList button');

// buttonTest.forEach(button => {
//     button.addEventListener('click', removeBook);
// })

//Activate buttons to remove a book
const tBody= document.querySelector('tBody');

tBody.addEventListener('click' , eventDelegation)

function eventDelegation(e){
   
    if(e.target.matches('button')){
        removeBook(e);
    }else if (e.target.classList[1] === "read"){
        modifyRead(e);
    }
}


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
    addBookToLibrary(title.value, author.value,numpages.value,readValue);
    createRow(title.value, author.value,numpages.value,readValue);
    myLibrary.forEach(book => {console.log(book.info())})
    //As we create new book we need to update nodelist of removal buttons
    // buttonTest = document.querySelectorAll('.bookList button');
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
    return checkedButton[0].value;
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

    //Add button class with book title to loop and find in array later when clicking the button
    btn.classList.add(first);
    td4.classList.add(first , "read");
    td5.appendChild(btn);
    //add table row class to find it later for removal
    tr.classList.add(first);
    tr.appendChild(td1);
    tr.appendChild(td2);
    tr.appendChild(td3);
    tr.appendChild(td4);
    tr.appendChild(td5);

    tableBody.appendChild(tr)

}

//CLICK & REMOVE


function removeBook(e){
    //To use in DOM
    const classToRemove =e.target.classList.value;
    //To get the exact title to use in array
    const titleToRemove = e.target.classList.value.replaceAll( '-', ' ')
    removeFromLibrary(titleToRemove);
    removeFromTable(classToRemove);
   

}


//FUNCTIONS TO REMOVE

function removeFromLibrary (title) {
    const bookRemove = findBook(title);
    const index = myLibrary.indexOf(bookRemove);
    myLibrary.splice(index, 1);
    myLibrary.forEach(book => {console.log(book.info())})
}

function removeFromTable(className){

    const tableRow = document.querySelector(".".concat(className));
    while (tableRow.firstChild) {
      tableRow.removeChild(tableRow.lastChild);
    }
}


//Modify read status

function modifyRead (e) {
    

    //To get the exact title to use in array
    const titleToModify = e.target.classList[0].replaceAll( '-', ' ');
    modifyReadLibrary(titleToModify);
    
    if(e.target.textContent === "read"){
        e.target.textContent = "unread";
    }else{
        e.target.textContent = "read"
    }

    // Need to get title
    // Then get index with that title
    // Then call method to modify read status
    // Modify the table also.
}

function modifyReadLibrary (title) {
    const book = findBook(title);
    const index = myLibrary.indexOf(book);
    console.log(index);
    myLibrary[index].setRead();
}

