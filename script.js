

let myLibrary =[];

class Book {
    constructor(title, author, pages, read){
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = read;
    }

    setRead(){
        if(this.read ==="read"){
            this.read = "unread";
        }else{
            this.read = "read";
        }
    }
    info () {
        if(this.read==="read"){
            return (`The book ${this.title} by ${this.author} has ${this.pages} pages and it is read. `); 
        }else{
            return (`The book ${this.title} by ${this.author} has ${this.pages} pages and it is not read. `); 
        }  
    }




}
//OLD CODE WITH OBJECT CONSTRUCTORS HAS BEEN CHANGED TO CLASSES

// function book(title, author, pages, read){
//     this.title = title;
//     this.author = author;
//     this.pages = pages;
//     this.read = read;
// }
// book.prototype.info = function() {
   
//     if(this.read==="read"){
//         return (`The book ${this.title} by ${this.author} has ${this.pages} pages and it is read. `); 
//     }else{
//         return (`The book ${this.title} by ${this.author} has ${this.pages} pages and it is not read. `); 
//     }  
// } 

// book.prototype.setRead = function() {
    
//     if(this.read ==="read"){
//         this.read = "unread";
//     }else{
//         this.read = "read";
//     }
// }

function addBookToLibrary(title, author, pages, read){
    myLibrary.push(new Book(title, author, pages, read));
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
addBookToLibrary(`Clau Te Quiere`, `Cupido`,`1500`,'read');

// --------------------------------------------------------------------------------
//DOM MANIPULATION

//DEFINE INPUTS


const buttonAdd = document.querySelector('#addBook');
const title = document.querySelector('#title');
const author = document.querySelector('#author');
const numpages = document.querySelector('#numpages');
const read = document.querySelectorAll('input[name="checkread"]');
//NOT WORKING FOR NEW BOOKS BC THE DYNAMICALLY CREATED ELEMENTS ARE NOT FOUND BY EVENT LISTENER
// WE NEED TO USE EVENT DELEGATION

// let buttonTest = document.querySelectorAll('.bookList button');

// buttonTest.forEach(button => {
//     button.addEventListener('click', removeBook);
// })

//Activate buttons to remove a book
const tBody= document.querySelector('tBody');

tBody.addEventListener('click' , eventDelegation);
printLibrary();

function eventDelegation(e){
   
    if(e.target.matches('button')){
        removeBook(e);
    }else if (e.target.classList[1] === "read"){
        modifyRead(e);
    }
}


function printLibrary(){

    myLibrary.forEach(book => {
        createRow(book.title, book.author, book.pages, book.read);
    })
}


//SAVE DATA NEW BOOK


buttonAdd.addEventListener(`click`, () => {
    // Here now we need to check each value of the inputs
    // const valid = checkInputValidity()
    if(checkTitle() || checkAuthor() || checkPages()){
        //If any of them is 1 means that there is a field incorrect

    }else{
        clearErrors()
        addBook()
    }
    
    // Also need to create classes to display error
    // Also need to create an event listener type input for eah input to detect
    // each time we type anything
    
});

function checkTitle () {
    if (!title.validity.valid) {
        showTitleError()
        return true;
    }else{
        return false;
    }
}

function showTitleError() {
    const errorTitle = document.querySelector('#error-title')
    if (title.validity.valueMissing) {
        // If the field is empty,
        // display the following error message.
        errorTitle.textContent = "You need to enter a book title";
      } else if (title.validity.tooLong) {
        // If the data is too long,
        // display the following error message.
        errorTitle.textContent = `Title should be at least ${title.minLength} characters; you entered ${title.value.length}.`;
      } 
}

function checkAuthor() {
    if (!author.validity.valid) {
        showAuthorError()
        return true;
    }else{
        return false;
    }
}

function showAuthorError() {
    const errorAuthor = document.querySelector('#error-author')
    if (author.validity.valueMissing) {
        errorAuthor.textContent = "You need to enter a book Author";
      } else if (author.validity.tooLong) {
        errorAuthor.textContent = `Title should be at least ${title.minLength} characters; you entered ${title.value.length}.`;
      } else if (author.validity.patternMismatch) {
        errorAuthor.textContent = 'A name does not contain numbers!';
      } 
}

function checkPages() {
    if (!numpages.validity.valid) {
        showPagesError()
        return true;
    }else{
        return false;
    }
}

function showPagesError() {
    const errorPages = document.querySelector('#error-pages')
    if (numpages.validity.rangeUnderflow) {
        errorPages.textContent = "A book cannot have negarive pages!";
      } else if (numpages.validity.valueMissing) {
        errorPages.textContent = 'Please enter the field';
      } 
}

function clearErrors () {
    const errorPages = document.querySelector('#error-pages');
    const errorAuthor = document.querySelector('#error-author');
    const errorTitle = document.querySelector('#error-title');
}

function addBook() {
    //To get value from radio button
    
    let readArray=Array.from(read);
    const readValue = getRadio(readArray);

    addBookToLibrary(title.value, author.value,numpages.value,readValue);
    createRow(title.value, author.value,numpages.value,readValue);
    resetInputs();
}

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
    btn.textContent="Delete"
    


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
    const titleToRemove = e.target.classList.value.replaceAll( '-', ' ');
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

