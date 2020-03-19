BOOKS_URL = 'http://localhost:3000/books';
const panel = document.querySelector("#show-panel");
const currentUser = { id: 1, username: "pouros" };

document.addEventListener("DOMContentLoaded", loadBooks);

//this function is called to load a new book information
async function loadBooks(){
    const response = await fetch(BOOKS_URL);
    const data = await response.json();
    const ul = document.querySelector("#list");
    data.forEach(book => addBook(book,ul));
}

//add a new book to the list
function addBook(book, ul){
    const li = document.createElement("li");
    li.innerText = book.title;
    li.addEventListener("click", showBookInformation);
    li.id = `book_${book.id}`;
    ul.appendChild(li);
}

function showBookInformation(e){
    panel.innerHTML = "";
    const id = this.id.split("_")[1];
    getIndividualBook(id).then(book => {
        
        const img_tag = document.createElement("img");
        img_tag.src = book["img_url"];
        const name = document.createElement("h2");
        name.id = "book-title";
        name.innerText = book["title"];
        const description = document.createElement("p");
        description.innerText = book["description"];
        const userLikes = document.createElement("ul");
        userLikes.id = "users-like";
        
        book.users.forEach(user => {
            const li = document.createElement("li");
            li.innerText = user.username;
            userLikes.appendChild(li);
        });

        const btn = document.createElement("button");
        btn.innerText = "Like Book";
        btn.addEventListener("click", (e) => likeBook(e, book, userLikes));
        panel.append(name, img_tag, description, userLikes, btn);
    })
    
    
}

async function getIndividualBook(id){
    const response = await fetch(`${BOOKS_URL}/${id}`);
    const data = await response.json();
    return data;
}

function likeBook(e, book, ul){
    console.log(e);
    console.log(book.users);

    const li = document.createElement("li");
    li.innerText = currentUser.username;
    ul.append(li);
    book.users.push(currentUser);
    console.log(book.users);
    
    fetch(`${BOOKS_URL}/${book.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify(book)})
    
}