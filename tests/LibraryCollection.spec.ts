import { describe, it, expect, beforeEach } from "vitest";
import { LibraryCollection } from "../src/LibraryCollection";

describe("LibraryCollection", () => {
  let library: LibraryCollection;

  beforeEach(() => {
    library = new LibraryCollection();
  });

  describe("addBook", () => {
    it("should add a book and return its id", () => {
      const result = library.addBook("Js-react", "KATA Academy");
      expect(typeof result).toBe("string");
      expect(library.getBooksCount()).toBe(1);
    });
    it("should return error when add duplicate title", () => {
      library.addBook("Мастер и Маргарита", "Михаил Булгаков");
      const result = library.addBook("Мастер и Маргарита", "Неизыестный Автор");
      expect(result).toBeInstanceOf(Error);
      expect(library.getBooksCount()).toBe(1);
    });
  });

  describe("removeBook", () => {
    it("should remove a book by id", () => {
      const id = library.addBook("rap", "African Americans(Black)") as string;
      library.removeBook(id);
      expect(library.getBooksCount()).toBe(0);
    });

    it("should do nothing when removing non id", () => {
      library.addBook("Т", "В. О. Пелевин");
      library.removeBook("not-exist-id");
      expect(library.getBooksCount()).toBe(1);
    });
  });

  describe("getBookInfo", () => {
    it("should return book info for in stock book", () => {
      const id = library.addBook("Мы", "Евгений Замятин") as string;
      const info = library.getBookInfo(id);
      expect(info).toEqual({
        title: "Мы",
        author: "Евгений Замятин",
      });
    });

    it("should return null for not stock book", () => {
      const info = library.getBookInfo("not-exist-id");
      expect(info).toBeNull();
    });
  });

  describe("getAllBooks", () => {
    it("should return all books", () => {
      const id1 = library.addBook("Book 1", "Author 1") as string;
      const id2 = library.addBook("Book 2", "Author 2") as string;

      const books = library.getAllBooks();
      expect(books).toEqual([
        { id: id1, title: "Book 1", author: "Author 1" },
        { id: id2, title: "Book 2", author: "Author 2" },
      ]);
    });

    it("should return empty array for empty collection", () => {
      expect(library.getAllBooks()).toEqual([]);
    });
  });

  describe("getBoolCount", () => {
    it("should return correct count", () => {
      expect(library.getBooksCount()).toBe(0);
      library.addBook("Book 1", "Author 1");
      expect(library.getBooksCount()).toBe(1);
      library.addBook("Book 2", "Author 2");
      expect(library.getBooksCount()).toBe(2);
    });
  });
});
