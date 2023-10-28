

import { getAllCars, postCar, deleteCar, updateCar } from './api.js';

let cars = [];
let indexOfEditedCar = null;


const nameInput = document.getElementById("name");
const descriptionInput = document.getElementById("description");
const priceInput = document.getElementById("price");
const typeSelect = document.getElementById("type");
const submitButton = document.getElementById("submit_button");
const editModal = document.getElementById("myModal");
const editNameInput = document.getElementById("edit-name");
const editDescriptionInput = document.getElementById("edit-description");
const editPriceInput = document.getElementById("edit-price");
const editTypeInput = document.getElementById("edit-type");
const saveButton = document.getElementById("save_button");
const cancelButton = document.getElementById("cancel_button");


submitButton.addEventListener("click", createCar);
saveButton.addEventListener("click", updateCarInfo);
cancelButton.addEventListener("click", cancelEdit);


getAllCars()
  .then((data) => {
    cars = data;
    displayCars();
  })
  .catch((error) => {
    console.error("Error fetching cars:", error);
  });

function createCar() {

  const name = nameInput.value;
  const description = descriptionInput.value;
  const price = parseFloat(priceInput.value);
  const type = typeSelect.value;

  
  if (!name || isNaN(price) || price < 0 || !type) {
    alert("Please fill in all required fields and enter a valid price.");
    return;
  }

  
  const car = {
    name: name,
    description: description,
    price: price,
    type: type,
  };

  postCar(car)
  .then(async (newCar) => {
    console.log(await newCar.json());
    cars.push(newCar);
    refetchAllCars();
    resetInputs(); 
  })
  .catch((error) => {
    console.error("Error creating car:", error);
  });
}

function displayCars() {

  const carList = document.getElementById("car_list");
  carList.innerHTML = "";

  cars.forEach((car, index) => {
    const carDiv = document.createElement("div");
    carDiv.classList.add("car-item");

    
    const carInfo = `
      <h3>${car.name}</h3>
      <p>Description: ${car.description}</p>
      <p>Price: $${parseFloat(car.price).toFixed(2)}</p>
      <p>Type: ${car.type}</p>
    `;

    carDiv.innerHTML = carInfo;

    
    const deleteButton = document.createElement("button");
    deleteButton.classList.add("delete_button");
    deleteButton.textContent = "Delete";
    deleteButton.addEventListener("click", () => {
      deleteCarItem(index);
    });

    const editButton = document.createElement("button");
    editButton.classList.add("edit_button");
    editButton.textContent = "Edit";
    editButton.addEventListener("click", () => {
      openEditModal(index);
    });

    carDiv.appendChild(editButton);
    carDiv.appendChild(deleteButton);
    carList.appendChild(carDiv);
  });
}

function openEditModal(index) {
  indexOfEditedCar = index;
  const carToEdit = cars[indexOfEditedCar];

  editNameInput.value = carToEdit.name;
  editDescriptionInput.value = carToEdit.description;
  editPriceInput.value = carToEdit.price;
  editTypeInput.value = carToEdit.type;

  
  editModal.style.display = "block";
}

function updateCarInfo() {
  if (indexOfEditedCar !== null) {
    const carId = cars[indexOfEditedCar].id;

    const editedCar = {
      id: carId,
      name: editNameInput.value,
      description: editDescriptionInput.value,
      price: parseFloat(editPriceInput.value),
      type: editTypeInput.value,
    };

    if (!editedCar.name || isNaN(editedCar.price) || editedCar.price < 0 || !editedCar.type) {
      alert("Будь ласка, заповніть усі необхідні поля.");
      return;
    }

    updateCar(carId, editedCar)
      .then(async (updatedCar) => {
        // console.log(await updatedCar.json());
        cars = await updatedCar.json();
        console.log({ cars });
        displayCars();
        
        
        closeEditModal();
      })
      .catch((error) => {
        console.error("Помилка при оновленні автомобіля:", error);
      });
  }
}



function refetchAllCars() {
  getAllCars()
    .then((data) => {
      cars = data;
      displayCars();
    })
    .catch((error) => {
      console.error("Error fetching cars:", error);
    });
}

function deleteCarItem(index) {
  
  if (index >= 0 && index < cars.length) {
    const carId = cars[index].id;

    deleteCar(carId)
      .then(() => {
        cars.splice(index, 1);
        displayCars();
      })
      .catch((error) => {
        console.error("Error deleting car:", error);
      });
  }
}

function cancelEdit() {
  closeEditModal();
}

function closeEditModal() {
  editNameInput.value = "";
  editDescriptionInput.value = "";
  editPriceInput.value = "";
  editTypeInput.value = "";
  editModal.style.display = "none";
}

function resetInputs() {

  nameInput.value = "";
  descriptionInput.value = "";
  priceInput.value = "";
  typeSelect.value = "";
} 
