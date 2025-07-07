"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LibraryCollection = void 0;
class LibraryCollection {
    books = [];
    generateId() {
        return Math.random().toString(15).substring(4, 14);
    }
    addBook(title, author) {
        const bookExists = this.books.some((book) => book.title.toLowerCase() === title.toLocaleLowerCase());
        if (bookExists) {
            return new Error("Книга с таким названием уже существует");
        }
        const newBook = {
            id: this.generateId(),
            title,
            author,
        };
        this.books.push(newBook);
        return newBook.id;
    }
    removeBook(id) {
        this.books = this.books.filter((book) => book.id !== id);
    }
    getBookInfo(id) {
        const book = this.books.find((book) => book.id === id);
        return book ? { title: book.title, author: book.author } : null;
    }
    getAllBooks() {
        return [...this.books];
    }
    getBooksCount() {
        return this.books.length;
    }
}
exports.LibraryCollection = LibraryCollection;
