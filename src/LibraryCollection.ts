type BookInfo = {
  id: string;
  title: string;
  author: string;
};

export class LibraryCollection {
  private books: BookInfo[] = [];

  private generateId(): string {
    return Math.random().toString(15).substring(4, 14);
  }

  addBook(title: string, author: string): string | Error {
    const bookExists = this.books.some(
      (book) => book.title.toLowerCase() === title.toLocaleLowerCase()
    );
    if (bookExists) {
      return new Error("Книга с таким названием уже существует");
    }

    const newBook: BookInfo = {
      id: this.generateId(),
      title,
      author,
    };

    this.books.push(newBook);
    return newBook.id;
  }

  removeBook(id: string): void {
    this.books = this.books.filter((book) => book.id !== id);
  }

  getBookInfo(id: string): { title: string; author: string } | null {
    const book = this.books.find((book) => book.id === id);
    return book ? { title: book.title, author: book.author } : null;
  }

  getAllBooks(): Array<{ id: string; title: string; author: string }> {
    return [...this.books];
  }

  getBooksCount(): number {
    return this.books.length;
  }
}
