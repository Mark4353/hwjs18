async function getStudents() {
  try {
    const response = await fetch("http://localhost:3000/students");
    const data = await response.json();
    renderStudents(data);
  } catch (error) {
    console.error("Помилка:", error);   
  }
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

async function addStudent(e) {
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

  try {
    await fetch("http://localhost:3000/students", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(student),
    });
    getStudents();
  } catch (error) {
    console.error("Помилка",error);
  }
}

async function updateStudent(id) {
  const newName = prompt("Введіть ім'я студента");
  if (newName) {
    try {
      await fetch(`http://localhost:3000/students/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: newName }),
      });
      getStudents();
    } catch (error) {
      console.error("Помилка", error);
    }
  }
}

async function deleteStudent(id) {
  if (confirm("Видалити?")) {
    try {
      await fetch(`http://localhost:3000/students/${id}`, {
        method: "DELETE",
      });
      getStudents();
    } catch (error) {
      console.error("Помилка", error);
    }
  }
}

document
  .getElementById("get-students-btn")
  .addEventListener("click", getStudents);
document
  .getElementById("add-student-form")
  .addEventListener("submit", addStudent);
