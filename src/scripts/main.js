"use strict";
// import { tasksData } from "./data";
import { makeTable } from "./tasks";
import { countsTask } from "./counts";

let tasks = [
  {
    id: 1,
    name: "Shoping list",
    created: "4/21/2021",
    category: "Task",
    content: "Tomatoes, bread",
    dates: "",
    type: "active",
  },
  {
    id: 2,
    name: "The teory of evolution",
    created: "4/27/2021",
    category: "Random Thought",
    content: "The evolution",
    dates: "",
    type: "active",
  },
  {
    id: 3,
    name: "New Feature",
    created: "3/5/2021",
    category: "Idea",
    content: "Implement new feater",
    dates: "5/5/2021",
    type: "active",
  },
  {
    id: 4,
    name: "Shoping list",
    created: "5/6/2021",
    category: "Task",
    content: "Bread, milk, tomato",
    dates: "",
    type: "active",
  },
  {
    id: 5,
    name: "About React",
    created: "5/6/2021",
    category: "Random Thought",
    content: "React evolution",
    dates: "",
    type: "active",
  },
  {
    id: 6,
    name: "New Feature",
    created: "5/7/2021",
    category: "Idea",
    content: "Implement new script",
    dates: "5/8/2021",
    type: "active",
  },
];
let archivedTasks = [];
let status = "";

const options = {
  year: "numeric",
  month: "numeric",
  day: "numeric",
};

makeTable(tasks);
countsTask(tasks);

const tableTasks = document.querySelector("#items");
const tableCounts = document.querySelector("#counts");
const activeNotes = document.querySelector("#active");
const archiveNotes = document.querySelector("#archive");
const form = document.querySelector("#form");
const formChange = document.querySelector(".form_change");
const createNote = document.querySelector("#create-note");
const formClose = document.querySelectorAll(".form__close");

const clearTable = () => {
  tableTasks.innerHTML = "";
  tableCounts.innerHTML = "";
};

const updateTable = (item, status = "active") => {
  clearTable();
  makeTable(item);
  countsTask(item, status);
};

//Functionality of note changing
tableTasks.addEventListener("click", (event) => {
  if (event.target.matches(".delete")) {
    const item = event.target.closest(".task");

    tasks = tasks.filter((task) => task.id !== +item.id);
    archivedTasks = archivedTasks.filter((task) => task.id !== +item.id);
  }

  if (event.target.matches(".archive")) {
    const item = event.target.closest(".task");

    tasks.forEach((task) => {
      if (task.id === +item.id) {
        task.type = "archive";
        archivedTasks.push(task);
      }
    });
  }

  if (event.target.matches(".update")) {
    const item = event.target.closest(".task");

    formChange.classList.add("form_active");

    formChange.addEventListener("submit", (e) => {
      e.preventDefault();
      const formData = new FormData(formChange);

      const data = Object.fromEntries(formData.entries());

      tasks.forEach((el) => {
        if (el.id === +item.id) {
          el.content = data.content ? data.content : el.content;
          el.dates = data.dates
            ? new Date(data.dates).toLocaleString("en-us", options)
            : el.dates;
          el.type = data.type;

          if (data.type === "archive") {
            archivedTasks.push(el);
          }
        }

        updateTable(tasks);
      });

      archivedTasks.forEach((el, ind) => {
        if (el.id === +item.id) {
          el.content = data.content ? data.content : el.content;
          el.dates = data.dates
            ? new Date(data.dates).toLocaleString("en-us", options)
            : el.dates;
          el.type = data.type;

          if (data.type === "active") {
            archivedTasks.splice(ind, 1);
          }
        }

        clearTable();
        countsTask(tasks);
        makeTable(archivedTasks, status);
      });

      formChange.reset();
      formChange.classList.remove("form_active");
    });
  }

  if (!status) {
    updateTable(tasks);
  } else {
    clearTable();
    countsTask(tasks);
    makeTable(archivedTasks, status);
  }
});

//Functionality of showing active notes
activeNotes.addEventListener("click", () => {
  status = "";
  updateTable(tasks);
});

//Functionality of showing archive notes
archiveNotes.addEventListener("click", () => {
  status = "archive";

  clearTable();
  countsTask(tasks);
  makeTable(archivedTasks, status);
});

//Functionality of adding new note
form.addEventListener("submit", (event) => {
  event.preventDefault();
  const formData = new FormData(form);

  const data = Object.fromEntries(formData.entries());

  const newTask = {
    id: tasks[tasks.length - 1].id + 1,
    ...data,
    dates: "",
    type: "active",
  };

  const date = new Date(data.created).toLocaleString("en-us", options);

  tasks.push({ ...newTask, created: date });
  form.reset();
  form.classList.remove("form_active");

  updateTable(tasks);
});

createNote.addEventListener("click", () => {
  form.classList.add("form_active");
});

formClose.forEach((el) => {
  el.addEventListener("click", (event) => {
    const form = event.target.closest(".form");

    form.classList.remove("form_active");
  });
});
