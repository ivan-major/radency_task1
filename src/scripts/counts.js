"use strict";
// Rendering table of note`s categories count

export const countsTask = (tasks) => {
  const categories = tasks.map((el) => el.category);
  const taskCategory = [...new Set(categories)];

  const countCategoryActive = (category, array) => {
    let countActive = 0;

    for (let item in array) {
      if (category === array[item].category && array[item].type === "active") {
        countActive++;
      }
    }

    return countActive;
  };

  const countCategoryArchive = (category, array) => {
    let countArchive = 0;

    for (let item in array) {
      if (category === array[item].category && array[item].type === "archive") {
        countArchive++;
      }
    }

    return countArchive;
  };

  const bodyTable = document.querySelector("#counts");

  for (let i = 0; i < taskCategory.length; i++) {
    const active = countCategoryActive(taskCategory[i], tasks);
    const archive = countCategoryArchive(taskCategory[i], tasks);

    const row = document.createElement("tr");

    for (let j = 1; j <= 3; j++) {
      const cell = document.createElement("td");

      switch (j) {
        case 1:
          cell.textContent = taskCategory[i];
          cell.classList.add("task__item");
          break;

        case 2:
          cell.textContent = active;
          cell.classList.add("task__item", "task__item_count");
          break;

        case 3:
          cell.textContent = archive;
          cell.classList.add("task__item", "task__item_count");
          break;

        default:
          break;
      }

      row.classList.add("hometask__item");
      row.append(cell);
    }

    if (active !== 0 || archive !== 0) {
      bodyTable.append(row);
    }
  }
};
