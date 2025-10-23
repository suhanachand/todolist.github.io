// Dark/Light Mode Toggle
const themeToggle = document.getElementById("themeToggle");
themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark");
  localStorage.setItem("solunaTheme", document.body.classList.contains("dark") ? "dark" : "light");
});

// Load theme
if (localStorage.getItem("solunaTheme") === "dark") {
  document.body.classList.add("dark");
}

// Google Sign-in stub
const googleSign = document.getElementById("googleSign");
googleSign.addEventListener("click", () => {
  alert("Google login placeholder — connect Firebase auth here.");
});
