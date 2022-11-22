let listData = [];

let pet1 = {
  id: 1,
  name: `mèo`,
  age: 2,
};

let pet2 = {
  id: 2,
  name: "chó",
  age: 5,
};
let pet3 = {
  id: 3,
  name: "chó",
  age: 5,
};
let pet4 = {
  id: 4,
  name: "chó",
  age: 5,
};

listData.push(pet1, pet2, pet3, pet4);

console.log(listData);

let result = listData.findIndex((id) => id.id === 3);
let deletePet = listData.splice(result, 1);
console.log(result - 1);

console.log(typeof result);
console.log(listData);
console.log(deletePet);
