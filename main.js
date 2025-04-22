
function getStudents() {
  fetch("http://localhost:5500/students")
    .then((response) => response.json())
    .then((data) => renderStudents(data))
    .catch((error) => console.error("Помилка завантаження студентів:", error));
}


function renderStudents(students) {
  const tableBody = document.querySelector("#students-table tbody");
  tableBody.innerHTML = "";
  students.forEach((student) => {
    const row = document.createElement("tr");
    row.innerHTML = `
        <td>${student.id}</td>
        <td>${student.name}</td>
        <td>${student.age}</td>
        <td>${student.course}</td>
        <td>${student.skills.join(", ")}</td>
        <td>${student.email}</td>
        <td>${student.isEnrolled ? "Так" : "Ні"}</td>
        <td>
          <button onclick="updateStudent(${student.id})">Оновити</button>
          <button onclick="deleteStudent(${student.id})">Видалити</button>
        </td>
      `;
    tableBody.appendChild(row);
  });
}

function addStudent(e) {
  e.preventDefault();
  const student = {
    name: document.getElementById("name").value,
    age: parseInt(document.getElementById("age").value),
    course: document.getElementById("course").value,
    skills: document
      .getElementById("skills")
      .value.split(",")
      .map((skill) => skill.trim()),
    email: document.getElementById("email").value,
    isEnrolled: document.getElementById("isEnrolled").checked,
  };

  fetch("http://localhost:3000/students", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(student),
  })
    .then(() => getStudents())
    .catch((error) => console.error("Помилка", error));
}


function updateStudent(id) {
  const newName = prompt("Введіть нове імя студента:");
  if (newName) {
    fetch(`http://localhost:3000/students/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: newName }),
    })
      .then(() => getStudents())
      .catch((error) => console.error("Помилка", error));
  }
}

function deleteStudent(id) {
  if (confirm("видалити?")) {
    fetch(`http://localhost:3000/students/${id}`, {
      method: "DELETE",
    })
      .then(() => getStudents())
      .catch((error) => console.error("Помилка", error));
  }
}

document
  .getElementById("get-students-btn")
  .addEventListener("click", getStudents);
document
  .getElementById("add-student-form")
  .addEventListener("submit", addStudent);
