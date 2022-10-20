let myLibrary =[];

function book(title, author, pages, read){
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}
book.prototype.info = function() {
    if(this.read){
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


addBookToLibrary(`eragon`, `Christopher Nolan`,`299`,0);
addBookToLibrary(`Lord of the Rings`, `Tolkien`,`869`,1);

//GET DATA FROM INPUTS


const buttonAdd = document.querySelector('#addBook');
const title = document.querySelector('#title');
const author = document.querySelector('#author');
const numpages = document.querySelector('#numpages');




buttonAdd.addEventListener(`click`, addBook );

function addBook() {
    
    addBookToLibrary(title.value, author.value,numpages.value,1);
    myLibrary.forEach(book => {console.log(book.info())})
    resetInputs();
}


//RESET InpUTS

function resetInputs(){
    title.value = null;
    author.value = null;
    numpages.value = null;
}