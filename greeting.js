const form = document.querySelector(".js-form"),
  input = form.querySelector("input"),
  greeting = document.querySelector(".js-greetings");

const USER_LS = "currentUser",
  SHOWING_CN = "showing";

function saveName(text) {
  localStorage.setItem(USER_LS, text);
}

function handleSubmit(event) {
  event.preventDefault();
  const currentValue = input.value;
  paintGreeting(currentValue);
  saveName(currentValue);
}

function askForName() {
  form.classList.add(SHOWING_CN);
  addEventListener("submit", handleSubmit);
}

function paintGreeting(text) {
  greeting.classList.add(SHOWING_CN);
  form.classList.remove(SHOWING_CN);
  greeting.innerText = `Hello ${text}`;
}

function loadName() {
  const currentUser = localStorage.getItem(USER_LS);
  if (currentUser === null) {
    // There is no one.
    askForName();
  } else {
    // There she is.
    paintGreeting(currentUser);
  }
}

/// 로컬 스토리지 (local storage): 자바스크립트의 작은 정보를 유저 브라우저에 저장하는 방법.

function init() {
  loadName();
}

init();
