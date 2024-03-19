"use strict";
const dataTime = [];
const dataNumber = [];
const dataTimeTeor = [];
const inputMaxValue = document.querySelector("#input");
const btn = document.querySelector(".btn");
const btnCanvas = document.querySelector(".btn-canvas");
const canvas = document.querySelector(".canvas");
const canva2 = document.querySelector(".canvas2");
const moduleResult = document.querySelector(".module-result");
const textEntry = document.querySelector(".entry");
const textResult = document.querySelector(".result");
const buttonResult = document.querySelector(".btn-result");
const closeModule = document.querySelector(".close-module");
canvas.classList.add("hidden");
canva2.classList.add("hidden");
moduleResult.classList.add("hidden");
function countSort(maxValue, arrLength) {
  const arr = new Array(arrLength)
    .fill(0)
    .map(() => Math.floor(Math.random() * maxValue) + 1);
  const countArray = new Array(maxValue + 1).fill(0);
  // Початок відліку сортування
  const startTime = performance.now();
  for (let i = 0; i < arrLength; i++) {
    countArray[arr[i]]++;
  }

  for (let i = 1; i <= maxValue; i++) {
    countArray[i] += countArray[i - 1];
  }

  const outputArray = new Array(arrLength);
  for (let i = arrLength - 1; i >= 0; i--) {
    outputArray[countArray[arr[i]] - 1] = arr[i];
    countArray[arr[i]]--;
  }
  const endTime = performance.now();
  return { arrey: arr, result: outputArray, timeToDo: endTime - startTime };
}
document.querySelector(".btn").addEventListener("click", () => {
  if (
    inputMaxValue.value === "" ||
    Number(inputMaxValue.value) <= 0 ||
    inputMaxValue.value > 100000 ||
    isNaN(inputMaxValue.value) ||
    inputMaxValue.value.includes(".") ||
    inputMaxValue.value.includes(",")
  ) {
    alert("Введіть коректне значення!");
    return;
  }
  for (let i = 1; i <= 10; i++) {
    const number = i * 10000;
    const { arrey, result, timeToDo } = countSort(
      Number(inputMaxValue.value),
      number
    );
    if (i === 1) {
      textEntry.textContent = `${arrey.join(" ")}`;
      textResult.textContent = `${result.join(" ")}`;
    }
    console.log(result, timeToDo);
    const timeToDoTeor = number + Number(inputMaxValue.value);
    dataTimeTeor.push(timeToDoTeor);
    dataTime.push(timeToDo);
    dataNumber.push(number);
  }
  btn.disabled = true;
  btnCanvas.classList.add("active");
  buttonResult.classList.add("active");
});

document.querySelector(".btn-canvas").addEventListener("click", () => {
  canvas.classList.remove("hidden");
  canva2.classList.remove("hidden");
  btnCanvas.disabled = true;
  const ctx = document.querySelector("#diagram").getContext("2d");
  const ctx2 = document.querySelector("#diagram2").getContext("2d");
  new Chart(ctx, {
    type: "line",
    data: {
      labels: dataNumber,
      datasets: [
        {
          label: "Count Sort",
          data: dataTime,
          borderColor: "rgba(255, 99, 132, 1)",
          borderWidth: 2,
        },
      ],
    },
    options: {
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
  });
  new Chart(ctx2, {
    type: "line",
    data: {
      labels: dataNumber,
      datasets: [
        {
          label: "Count Sort Teor",
          data: dataTimeTeor,
          borderColor: "rgba(54, 162, 235, 1)",
          borderWidth: 2,
        },
      ],
    },
    options: {
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
  });
});

document.querySelector(".btn-clear").onclick = () => {
  window.location.reload();
};
buttonResult.addEventListener("click", () => {
  moduleResult.classList.remove("hidden");
});
closeModule.addEventListener("click", () => {
  moduleResult.classList.add("hidden");
});
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    if (!moduleResult.classList.contains("hidden")) {
      moduleResult.classList.add("hidden");
    }
  }
});
