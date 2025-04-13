(() => {
    const STORAGE_KEY = "BOOKSHELF_APP";
    let books = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
  
    function saveToLocalStorage() {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(books));
    }
  
    function renderBooks(filteredBooks = books) {
      const incompleteBookshelf = document.getElementById("incompleteBookList");
      const completeBookshelf = document.getElementById("completeBookList");
      incompleteBookshelf.innerHTML = "";
      completeBookshelf.innerHTML = "";
    
      filteredBooks.forEach((book) => {
        const bookItem = document.createElement("article");  
        bookItem.classList.add("book_item");
        bookItem.setAttribute("data-testid", "bookItem");
        bookItem.setAttribute("data-bookid", "bookItem");
        bookItem.setAttribute("data-bookid", book.id);
    
        const bookTitle = document.createElement("h3");
        bookTitle.textContent = book.title;
        bookTitle.setAttribute("data-testid", "bookItemTitle");
    
        const bookAuthor = document.createElement("p");
        bookAuthor.textContent = `Penulis: ${book.author}`;
        bookAuthor.setAttribute("data-testid", "bookItemAuthor");
    
        const bookYear = document.createElement("p");
        bookYear.textContent = `Tahun: ${book.year}`;
        bookYear.setAttribute("data-testid", "bookItemYear");
    
        const actionContainer = document.createElement("div");
        actionContainer.classList.add("action");
    
        const toggleButton = document.createElement("button");
        toggleButton.textContent = book.isComplete
          ? "Belum selesai dibaca"
          : "Selesai dibaca";
        toggleButton.classList.add(book.isComplete ? "green" : "blue");
        toggleButton.setAttribute("data-testid", "bookItemIsCompleteButton");
        toggleButton.addEventListener("click", () => toggleBookCompletion(book.id));
    
        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Hapus buku";
        deleteButton.classList.add("red");
        deleteButton.setAttribute("data-testid", "bookItemDeleteButton");
        deleteButton.addEventListener("click", () => removeBook(book.id));
    
        actionContainer.append(toggleButton, deleteButton);
        bookItem.append(bookTitle, bookAuthor, bookYear, actionContainer);
    
        if (book.isComplete) {
          completeBookshelf.append(bookItem);
        } else {
          incompleteBookshelf.append(bookItem);
        }
      });
    }
    
  
    function addBook(event) {
      event.preventDefault();
      const title = document.querySelector("#bookFormTitle").value;
      const author = document.querySelector("#bookFormAuthor").value;
      const year = document.querySelector("#bookFormYear").value;
      const isComplete = document.querySelector("#bookFormIsComplete").checked;

  
      const book = {
        id: +new Date(),
        title,
        author,
        year: parseInt(year),
        isComplete,
      };
  
      books.push(book);
      saveToLocalStorage();
      renderBooks();
      document.querySelector("#bookForm").reset();
    }
  

    function toggleBookCompletion(bookId) {
      const bookIndex = books.findIndex(book => book.id === bookId);
      if (bookIndex !== -1) {
          books[bookIndex].isComplete = !books[bookIndex].isComplete;
          saveToLocalStorage();
          renderBooks();
      }
  }
  
  function removeBook(bookId) {
    books = books.filter(book => book.id !== bookId);
    saveToLocalStorage();
    renderBooks();
}
  
    function searchBook(event) {
      event.preventDefault();
      const query = document
        .querySelector("#searchBookTitle")
        .value.toLowerCase();
      const filteredBooks = query
        ? books.filter((book) => book.title.toLowerCase().includes(query))
        : books;
      renderBooks(filteredBooks);
    }
  
    document.querySelector("#bookForm").addEventListener("submit", addBook);
    document.querySelector("#searchBook").addEventListener("submit", searchBook);
  
    
    window.addEventListener("load", () => {
      renderBooks();
  });
  })();
  