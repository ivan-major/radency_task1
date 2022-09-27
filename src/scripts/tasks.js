"use strict";
// Rendering of main table with notes

export const makeTable = (items, status) => {
  const bodyTable = document.querySelector("#items");

  for (let i = 0; i < items.length; i++) {
    const row = document.createElement("tr");
    const cellIcons = document.createElement("td");

    for (const key in items[i]) {
      if (key !== "id" && key !== "type") {
        const cell = document.createElement("td");

        if (key === "name") {
          cell.classList.add("task__item", "name");

          switch (items[i].category) {
            case "Task":
              cell.insertAdjacentHTML(
                "afterbegin",
                `
                  <div class="name__icon">
                    <svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="#fff">
                      <path d="M13 17c0 1.104 0.894 2 2 2 1.104 0 2-0.896 2-2 0-1.106-0.896-2-2-2-1.106 0-2 0.894-2 2zM3 17c0 1.104 0.895 2 2 2 1.103 0 2-0.896 2-2 0-1.106-0.897-2-2-2-1.105 0-2 0.894-2 2zM6.547 12.172l11.068-3.162c0.211-0.061 0.385-0.289 0.385-0.51v-5.5h-14v-1.6c0-0.22-0.181-0.4-0.399-0.4h-3.202c-0.219 0-0.399 0.18-0.399 0.4v1.6h2l1.91 8.957 0.090 0.943v1.649c0 0.219 0.18 0.4 0.4 0.4h13.2c0.22 0 0.4-0.182 0.4-0.4v-1.549h-11.248c-1.15 0-1.174-0.551-0.205-0.828z"></path>
                    </svg>
                  </div>
                  ${items[i][key]}
                `
              );
              break;
            case "Random Thought":
              cell.insertAdjacentHTML(
                "afterbegin",
                `
                  <div class="name__icon">
                    <svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="#fff">
                      <path d="M16 2c8.837 0 16 5.82 16 13s-7.163 13-16 13c-0.849 0-1.682-0.054-2.495-0.158-3.437 3.437-7.539 4.053-11.505 4.144v-0.841c2.142-1.049 4-2.961 4-5.145 0-0.305-0.024-0.604-0.068-0.897-3.619-2.383-5.932-6.024-5.932-10.103 0-7.18 7.163-13 16-13z"></path>
                    </svg>
                  </div>
                  ${items[i][key]}
                `
              );
              break;
            case "Idea":
              cell.insertAdjacentHTML(
                "afterbegin",
                `
                  <div class="name__icon">
                    <svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="20" height="32" viewBox="0 0 20 32" fill="#fff">
                      <path d="M10 4.008c3.311 0 6 2.699 6 6.016 0 1.895-0.863 3.637-2.373 4.773-2.258 1.707-3.17 3.594-3.484 5.18h-0.286c-0.313-1.586-1.228-3.473-3.484-5.18-1.508-1.137-2.375-2.879-2.375-4.773 0-3.317 2.691-6.016 6.002-6.016M10 0c-5.523 0-10 4.488-10 10.023 0 3.282 1.545 6.149 3.969 7.977 1.115 0.844 2.035 1.93 2.035 3.43v2.555h7.994v-2.555c0-1.5 0.92-2.586 2.033-3.43 2.426-1.828 3.969-4.695 3.969-7.977 0-5.535-4.477-10.023-10-10.023v0zM6 28h8v4h-8z"></path>
                    </svg>
                  </div>
                  ${items[i][key]}
                `
              );
              break;
            default:
              break;
          }
        } else if (key === "dates" && items[i][key]) {
          cell.textContent = `${items[i].created}, ${items[i][key]}`;
        } else {
          cell.textContent = items[i][key];
        }

        cell.classList.add("task__item");

        row.append(cell);
      }
    }

    cellIcons.insertAdjacentHTML(
      "afterbegin",
      `
        <button class="task__button icon icon_update"></button>
        ${
          items[i].type !== "archive"
            ? '<button class="task__button icon icon_archive"></button>'
            : "<span></span>"
        }
        <button class="task__button icon icon_delete"></button>
      `
    );

    cellIcons.classList.add("task__item", "task__item_icons");
    row.setAttribute("id", items[i].id);
    row.append(cellIcons);

    row.classList.add("hometask__item", "task");

    if (items[i].type !== "archive") {
      bodyTable.append(row);
    } else if (items[i].type === "archive" && status === "archive") {
      bodyTable.append(row);
    }
  }
};
