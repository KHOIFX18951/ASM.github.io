`use strict`;
// 1 TẠO BIẾN CHỨA CÁC GIÁ TRỊ ĐẦU VÀO

let idEL = document.querySelector(`#input-id`);
let nameEL = document.querySelector(`#input-name`);
let ageEL = document.querySelector(`#input-age`);
let typeEL = document.querySelector(`#input-type`);
let weightEL = document.querySelector(`#input-weight`);
let lengthEL = document.querySelector(`#input-length`);
let colorEL = document.querySelector(`#input-color-1`);
let breedEL = document.querySelector(`#input-breed`);
let vaccinEL = document.querySelector(`#input-vaccinated`);
let dewormEL = document.querySelector(`#input-dewormed`);
let sterilizedEL = document.querySelector(`#input-sterilized`);
let displayEL = document.querySelector(`#display`);

// 1.2 TẠO BIẾN CHƯA CÁC GIÁ TRỊ BTN

let btnSubmit = document.querySelector(`#submit-btn`);
let btnHealthy = document.querySelector(`#healthy-btn`);
let btnBmi = document.querySelector(`#bmi-btn`);

// 2 TẠO SỰ KIỆN CHO NÚT SUBMIT

// 2.2 TẠO MẢNG CHỨA OBJECT TỪ ĐẦU VÀO

let listPetArr = [];

btnSubmit.addEventListener("click", function () {
  // 2.1 TẠO OBJECT ĐỂ CHỨA GIÁ TRỊ ĐẦU VÀO
  // NOTE: CÁC HÀM,... CẦN SỬ DỤNG ĐẾN KEY VALUE CỦA OBJECT
  //PHẢI ĐƯỢC KHAI BÁO BÊN TRONG HÀM NÀY

  const data = {
    // .VALUE LẤY GÍ TRỊ ĐẦU VÀO VỚI TEXT OR NUMBER ...

    id: idEL.value,
    name: nameEL.value,
    age: ageEL.value,
    type: typeEL.value,
    weightPet: weightEL.value,
    lengthPet: lengthEL.value,
    color: colorEL.value,
    breed: breedEL.value,

    // .CHECKED LẤY GIÁ TRỊ ĐÃ CHỌN OPTION => CHO RA GIÁ TRỊ BOOLEAN

    vaccin: vaccinEL.checked,
    deworm: dewormEL.checked,
    sterilized: sterilizedEL.checked,
  };

  // CHECKED DATA

  console.log(data);

  // 2.2 ĐƯA GIÁ TRỊ ĐẦU VÀO VÔ MẢNG

  listPetArr.push(data);

  // CHECKED ARR

  console.log(listPetArr);

  // 2.3 CLEAR ĐẦU VÀO SAU KHI ẤN SUBMIT
  // SET CHO GIÁ TRỊ ELEMENT

  function clearinput() {
    idEL.value = ``;
    nameEL.value = ``;
    ageEL.value = ``;
    typeEL.value = `Select Type`;
    weightEL.value = ``;
    lengthEL.value = ``;
    breedEL.value = `Select Breed`;
    colorEL.value = `#000000`; // NHẬP HEX RÚT GỌN SẼ BỊ LỖI
    vaccinEL.checked = false;
    dewormEL.checked = false;
    sterilizedEL.checked = false;
  }

  // CHECKED CLEAR INPUT

  console.log(clearinput());

  // CHECKED OUTPUT

  console.log(output(listPetArr));
});

// 3 GỌI HÀM ĐƯA GIÁ TRỊ RA MÀN HÌNH
// => SỬ DỤNG DỮ LIỆU TỪ MẢNG

function output(listPetArr) {
  // XÓA CODE HTML CỦA BỘ CHỌN DISPLAY

  displayEL.innerHTML = "";

  // DÙNG VÒNG LẶP ĐỂ DÙNG CHO NHIỀU GIÁ TRỊ TRONG MẢNG
  for (let i = 0; i < listPetArr.length; i++) {
    // 3.1 TẠO TABLE HTML TỪ JAVASCRIPT

    let pet = listPetArr[i];

    // GỌI BIẾN ĐỂ TẠO 1 HÀNG CHO TABLE

    const row = document.createElement(`tr`);

    // THÊM PHẦN TỬ HTML VÀO BIẾN

    row.innerHTML = `  
  <th scope="row">${pet.id}</th>
  <td>${pet.name}</td>
  <td>${pet.age}</td>
  <td>${pet.type}</td>
  <td>${pet.weightPet} kg</td>
  <td>${pet.lengthPet} cm</td>
  <td>${pet.breed}</td>
  <td>
    <i class="bi bi-square-fill" style="color: ${pet.color}"></i>
  </td>
  <td>${biCheck(pet.vaccin)}</td>
  <td>${biCheck(pet.deworm)}</td>
  <td>${biCheck(pet.sterilized)}</td>
  <td></td>
  <td>01/03/2022</td>
  <td>
    <button type="button" class="btn btn-danger" onclick="deletePet('${
      pet.id
    }')">Delete</button>
  </td>`;
    displayEL.appendChild(row);
  }

  // 3.2 TẠO HÀM ĐỂ TRÁNH LẶP LẠI

  function biCheck(pet) {
    return pet
      ? `<i class="bi bi-check-circle-fill"></i>`
      : `<i class="bi bi-x-circle-fill"></i>`;
  }
}

// 4 TẠO NÚT DELETE CHO TỪNG PET

// 4.1 TẠO HÀM XÁC ĐỊNH ID PET
//=> ID PET KHÔNG TRÙNG NHAU NÊN DÙNG ID XÁC ĐỊNH PET LÀ HỢP LÝ

function checkID(petID) {
  // arr.findIndex(gọi hàm có tham số (x)
  // ứng với mỗi phần tử để so sánh với điều kiện)
  // .findIndex() trả về vị trí của giá trị đầu tiên
  // thỏa mãn điều kiện
  return listPetArr.findIndex((id) => {
    id.id === petID;
  });
}
// arr.splice() thuộc tính xóa giá trị ở vị trí xác định
function deletePet(petID) {
  // confirm(`Are you sure?`);
  if (confirm(`Are you sure?`)) {
    listPetArr.splice(checkID(petID), 1);
    output(listPetArr);
  }
}
