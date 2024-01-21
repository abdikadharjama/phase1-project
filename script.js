document.addEventListener("DOMContentLoaded", function () {
    let toyData = null;

    const toyList = document.getElementById("toyList");
    const toyForm = document.getElementById("toyForm");

    // Function to display toys
    function displayToys(toys) {
        toyList.innerHTML = '';
        toys.forEach(function (toy) {
            const toyElement = document.createElement("div");
            toyElement.className = "toy";
            toyElement.innerHTML = `
                <h2>${toy.name}</h2>
                <img src="${toy.image}" alt="${toy.name}">
                <p>Likes: <span id="likes-${toy.id}">${toy.likes}</span></p>
                <button id="like-button-${toy.id}">Like</button>
                <button id="dislike-button-${toy.id}">Dislike</button>
                <button id="delete-button-${toy.id}">Delete</button>
            `;

            toyList.appendChild(toyElement);

            const likeButton = document.getElementById(`like-button-${toy.id}`);
            const dislikeButton = document.getElementById(`dislike-button-${toy.id}`);
            const likesCounter = document.getElementById(`likes-${toy.id}`);
            const deleteButton = document.getElementById(`delete-button-${toy.id}`);

            likeButton.addEventListener("click", function () {
                toy.likes++;
                likesCounter.textContent = toy.likes;
                updateToyInData(toy);
            });

            dislikeButton.addEventListener("click", function () {
                if (toy.likes > 0) {
                    toy.likes--;
                    likesCounter.textContent = toy.likes;
                    updateToyInData(toy);
                }
            });

            deleteButton.addEventListener("click", function () {
                const index = toyData.toys.findIndex(item => item.id === toy.id);
                if (index !== -1) {
                    toyData.toys.splice(index, 1);
                    updateToyList();
                }
            });
        });
    }

    // Function to update the toy list on the page
    function updateToyList() {
        displayToys(toyData.toys);
    }

    // Function to update a toy in the toyData array
    function updateToyInData(updatedToy) {
        const index = toyData.toys.findIndex(item => item.id === updatedToy.id);
        if (index !== -1) {
            toyData.toys[index] = updatedToy;
        }
    }

    // Function to add a new toy
    toyForm.addEventListener("submit", function (e) {
        e.preventDefault();

        const nameInput = document.getElementById("name");
        const imageInput = document.getElementById("image");

        const newToy = {
            id: Date.now(),
            name: nameInput.value,
            image: imageInput.value,
            likes: 0
        };

        nameInput.value = "";
        imageInput.value = "";

        toyData.toys.push(newToy);
        updateToyList();
    });

    // Load toy data from the JSON file
    fetch("toys.json")
        .then(response => response.json())
        .then(data => {
            toyData = data;
            displayToys(toyData.toys);
        })
        .catch(error => {
            console.error("Error loading JSON data:", error);
        });
});
