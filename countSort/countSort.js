"use strict";
const dataTime = [];
const dataNumber = [];
const inputMaxValue = document.querySelector("#input");
const btn = document.querySelector(".btn");
const btnCanvas = document.querySelector(".btn-canvas");
const canvas = document.querySelector(".canvas");
canvas.classList.add("hidden");
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
  console.log(startTime, endTime, endTime - startTime);
  // Закінчення відліку сортування
  return { result: outputArray, timeToDo: endTime - startTime };
}
document.querySelector(".btn").addEventListener("click", () => {
  if (
    inputMaxValue.value === "" ||
    Number(inputMaxValue.value) <= 0 ||
    inputMaxValue.value > 1000000 ||
    isNaN(inputMaxValue.value) ||
    inputMaxValue.value.includes(".") ||
    inputMaxValue.value.includes(",")
  ) {
    alert("Введіть коректне значення!");
    return;
  }
  for (let i = 1; i <= 10; i++) {
    const number = i * 10000;
    const { result, timeToDo } = countSort(inputMaxValue, number);
    dataTime.push(timeToDo);
    dataNumber.push(number);
  }
  btn.disabled = true;
  btnCanvas.classList.add("active");
});

document.querySelector(".btn-canvas").addEventListener("click", () => {
  canvas.classList.remove("hidden");
  btnCanvas.disabled = true;
  const ctx = document.querySelector("#diagram").getContext("2d");
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
});

document.querySelector(".btn-clear").onclick = () => {
  window.location.reload();
};
