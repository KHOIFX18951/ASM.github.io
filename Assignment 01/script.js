"use strict";

// ADD ELEMENT

const inId = document.getElementById("input-id");
const inName = document.getElementById("input-name");
const inAge = document.getElementById("input-age");
const inType = document.getElementById("input-type");
const inWeight = document.getElementById("input-weight");
const inLength = document.getElementById("input-length");
const inColor1 = document.getElementById("input-color-1");
const inBreed = document.getElementById("input-breed");
const inVaccin = document.getElementById("input-vaccinated");
const inDewormed = document.getElementById("input-dewormed");
const inSterilized = document.getElementById("input-sterilized");
const btnSubmit = document.getElementById("submit-btn");
const btnHealthy = document.getElementById("healthy-btn");
const tbody = document.getElementById("display");
const btnBMI = document.getElementById("bmi-btn");

// ADD ARRAY

let listData = [];

// XÁC ĐỊNH LÀ XÓA PET NÀO => PHỤ THUỘC VÀO ID CỦA PET ĐÓ
// THUỘC TÍNH .findIndex TÌM GIÁ TRỊ ĐẦU TIÊN THỎA MÃN ĐIỀU KIỆN
// Cách 1 gọi biểu thức hàm
const checkId = function (petDataID) {
  listData.findIndex((pet) => pet.id === petDataID);
};

// ADD DELETED BTN

const deletePet = (petDataID) => {
  // Confirm before deletePet

  // Cách 2 làm trực tiếp
  if (confirm("Are you sure?")) {
    // listData.splice(
    //   listData.findIndex((pet) => pet.id === petDataID),
    //   1
    // );

    listData.splice(checkId(petDataID), 1);
    renderTableData(listData);
  }
};

// CREAT RENDER TABLE

function renderTableData(listData) {
  // document.addEventListener("click", function (e) {
  //   if (e.target && e.target.id == "") {
  //     // id_tag là id của thẻ sẽ muốn gán sự kiện click , hoặc class hay gì đó tùy bạn
  //     //do something
  //     confirm("Are you sure?");
  //   }
  // });
  display.innerHTML = "";
  for (let i = 0; i < listData.length; i++) {
    let list = listData[i];
    const rowtb = document.createElement("tr");
    rowtb.innerHTML = `
  <th scope="row">${list.id}</th>
  <td>${list.name}</td>
  <td>${list.age}</td>
  <td>${list.type}</td>
  <td>${list.weight} kg</td>
  <td>${list.lengthP} cm</td>
  <td>${list.breed}</td>
  <td>
    <i class="bi bi-square-fill" style="color: ${list.color}"></i>
  </td>
  <td>${
    list.vaccin
      ? `<i class="bi bi-check-circle-fill"></i>`
      : `<i class="bi bi-x-circle-fill"></i>`
  }
    </td>
  <td>${
    list.dewormed
      ? `<i class="bi bi-check-circle-fill"></i>`
      : `<i class="bi bi-x-circle-fill"></i>`
  }</td>
  <td>${
    list.sterilized
      ? `<i class="bi bi-check-circle-fill"></i>`
      : `<i class="bi bi-x-circle-fill"></i>`
  }</td>
  <td>${list.bmi}</td>
  <td>${list.day.toLocaleDateString("vi-VI")}</td>
  <td>
  <td>
	<button class="btn btn-danger" onclick="deletePet('${list.id}')">Delete</button>
</td>
  
 
`;
    display.appendChild(rowtb);
  }
  return display;
}

// ADD EVENT SUBMIT BTN
// KHÔNG THỂ DÙNG BIẾN CỦA HÀM Ở BÊN NGOÀI HÀM

btnSubmit.addEventListener("click", function () {
  const petData = {
    // .VALUE DATATYPE: STRING

    id: inId.value,
    name: inName.value,
    age: inAge.value,
    type: inType.value,
    weight: inWeight.value,
    lengthP: inLength.value,
    color: inColor1.value,
    breed: inBreed.value,
    day: new Date(),
    bmi: `?`,

    // .CHECKED DATATYPE: BOOLEAN TRUE OR FALSE

    vaccin: inVaccin.checked,
    dewormed: inDewormed.checked,
    sterilized: inSterilized.checked,
  };
  console.log(petData);

  // ADD VALIDATE

  function validateData(data) {
    let isValidate = true;
    for (let i = 0; i < listData.length; i++) {
      if (petData.id === listData[i].id) {
        alert(`ID must unique!`);
        return false;
      }
    }
    if (petData.id === "") {
      alert(`Please input your pet ID! (Ex: T001)`);
      return false;
    }
    if (petData.name === "") {
      alert(`Please input your pet Name!`);
      return false;
    }
    if (petData.age > 15 || petData.age < 1) {
      alert(`Age must be between 1 and 15!`);
      return false;
    }
    if (petData.type === "Select Type") {
      alert(`Please select Type!`);
      return false;
    }
    if (petData.weight > 15 || petData.weight < 1) {
      alert(`Weight must be between 1 and 15!`);
      return false;
    }
    if (petData.lengthP > 100 || petData.lengthP < 10) {
      alert(`Length must be between 10 and 100!`);
      return false;
    }
    if (petData.breed === "Select Breed") {
      alert(`Please select Breed!`);
      return false;
    }
    return true;
  }

  // ADD CLEAR INPUT

  function clearInput() {
    inId.value = ``;
    inName.value = ``;
    inAge.value = ``;
    inWeight.value = ``;
    inLength.value = ``;
    inType.value = `Select Type`;
    inColor1.value = `#000000`;
    inBreed.value = `Select Breed`;
    inVaccin.checked = false;
    inDewormed.checked = false;
    inSterilized.checked = false;
  }

  const validate = validateData(petData);

  console.log(validate);

  if (validate) {
    listData.push(petData);
    clearInput();

    renderTableData(listData);
  }
});

// ADD HEALTHY BTN

let healthyCheck = false;
btnHealthy.addEventListener("click", function () {
  // HEALTHY PET CHECKED

  // LỌC MẢNG CÓ ĐIỀU KIỆN

  const healthyPet = listData.filter(
    (pet) => pet.vaccin && pet.dewormed && pet.sterilized
  );

  // SWITCH VALUE

  healthyCheck = healthyCheck ? false : true;

  if (healthyCheck) {
    renderTableData(healthyPet);
    btnHealthy.textContent = `Show Healthy Pet`;
  } else {
    renderTableData(listData);
    btnHealthy.textContent = `Show All Pet`;
  }
});

// ADD BMI BTN

btnBMI.addEventListener("click", function () {
  for (let i = 0; i < listData.length; i++) {
    if (listData[i].type === "Dog") {
      listData[i].bmi = (
        (listData[i].weight * 703) /
        listData[i].lengthP ** 2
      ).toFixed(2);
      renderTableData(listData);
    } else {
      listData[i].bmi = (
        (listData[i].weight * 886) /
        listData[i].lengthP ** 2
      ).toFixed(2);
      renderTableData(listData);
    }
  }
});
