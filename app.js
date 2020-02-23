const BASE_URL = "https://dogs-backend.herokuapp.com/dogs";
const dogsContainer = document.querySelector(".dogs-container");
const dogForm = document.querySelector(".dog-form");

fetch(BASE_URL)
  .then(response => response.json())
  .then(dogs => {
    console.log(dogs);
    dogs.map(createDogCard);
  })
  .catch(console.error);

function createDogCard(dog) {
  const dogCard = document.createElement("div");
  dogCard.className = "card";
  dogCard.innerHTML = `
      <img src="${dog.image}" class="card-img-top" alt="${dog.name}">
      <div class="card-body">
          <h5 class="card-title">${dog.name}</h5>
          <p class="card-text">${dog.breed}</p>
          <p class="card-text">${dog.age}</p>
      </div>
    `;

  const editDog = document.createElement("form");
  editDog.innerHTML = `
    <input type="number" id="dog${dog.id}" name="age" value=${dog.age} />
    `;

  editDog.addEventListener("submit", () => {
    event.preventDefault();
    const age = document.getElementById(`dog${dog.id}`).value;
    console.log(age);
    fetch(`${BASE_URL}/${dog.id}`, {
      method: "PATCH",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ age })
    });
  });

  const deleteButton = document.createElement("button");
  deleteButton.textContent = "DELETE";
  dogCard.append(deleteButton, editDog);

  deleteButton.addEventListener("click", () => {
    event.target.parentNode.remove();
    fetch(`${BASE_URL}/${dog.id}`, {
      method: "DELETE"
    });
  });

  dogsContainer.append(dogCard);
}

dogForm.addEventListener("submit", () => {
  event.preventDefault();

  const formData = new FormData(dogForm);
  const name = formData.get("name");
  const breed = formData.get("breed");
  const image = formData.get("image");
  const age = formData.get("age");
  console.log(name, breed, image, age);

  createDogCard({ name, breed, image, age });

  fetch(BASE_URL, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ name, breed, image, age })
  }).then(dogForm.reset());
});

// options object, made form data to put in as an object into our options object with a method header and body.
