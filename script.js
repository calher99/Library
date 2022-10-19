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



console.log(myLibrary[1].info());

console.log(displayBook("erg"));