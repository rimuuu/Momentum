const toDoForm = document.querySelector(".js-toDoForm"),
  toDoInput = toDoForm.querySelector("input"),
  toDoList = document.querySelector(".js-toDoList");

const TODOS_LS = "toDos"; //투두리스트 변수
const toDos = []; //투두는 여러개를 저장할 수 있어야하니까 배열을 사용한다.

function saveTodos() {
  localStorage.setItem(TODOS_LS, JSON.stringify(toDos)); //투두리스트변수와 투두배열을 로컬스토리지에 저장.
} //로컬스토리지는 자바스크립트의 모든 데이터를 저장할 수 없다. 오직 문자열만 저장가능.
//그래서 객체들을 문자열로 바꿔줘야하는데, 이걸 가능하게 하는건 JSON.stringify();
//JavaScriptObjectNotation: 자바스크립트에서 브라우저로 데이터를 주고받을때 자바스크립트가 그걸 다룰수 있도록 object로 바꿔주는 기능

function paintToDo(text) {
  const li = document.createElement("li");
  const delBtn = document.createElement("button");
  delBtn.innerText = "❌";
  const span = document.createElement("span");
  const newId = toDos.length + 1;
  span.innerText = text; //handleSubmit 함수에서 온 값
  li.appendChild(delBtn);
  li.appendChild(span); //appendChild: 뭔가를 그것의 father element안에 넣는것
  li.id = newId;
  toDoList.appendChild(li); //마지막으로 ul안에 li들을 넣는다.
  const toDoObj = {
    text: text,
    id: newId
    // id: toDos.length + 1 //빈배열의 길이에 1을 더해주면 1~n까지 넘버를 부여할수있다. (위로옮김 )
  };
  toDos.push(toDoObj); //빈배열에 객체를 만들때마다 푸쉬해서 넣어준다.
  saveTodos(); //꼭 푸쉬를 한 뒤에 로컬스토리지에 저장.

  //지금까지는 우리가 필요한걸 html에서 얻었다면 이제는 js에서 필요한걸 만들어볼거다.
}

function handleSubmit(event) {
  event.preventDefault();
  const currentValue = toDoInput.value;
  paintToDo(currentValue);
  toDoInput.value = "";
  //currentValue는 상수인데 값을 재정의해도 되는규?
}

function loadToDos() {
  const loadedToDos = localStorage.getItem(TODOS_LS);
  if (loadedToDos !== null) {
    const parsedToDos = JSON.parse(loadedToDos);
    //콘솔로깅을 했을때 문자열로 불러지는걸 볼 수 있음.
    //이걸 다시 객체로 바꾸기 위해 JSON.parse() 사용
    parsedToDos.forEach(function(toDo) {
      paintToDo(toDo.text);
    }); //forEach는 배열이 가지고 있는 기능인데 배열에 담겨있는 것들 각각에 한번씩 함수를 실행시켜준다.
    //forEach 안에 바로 함수를 만들어줘야지 배열에 담긴것들에 함수가 적용됨.
  }
}

function init() {
  loadToDos();
  toDoForm.addEventListener("submit", handleSubmit);
}

init();

/* 투두리스트만들기 로직정리
1.로컬스토리지에 저장할 변수 선언하고 지난강의와 비슷한 조건문 & 이벤트함수 만들기 (loadToDos) 
 주의: 로컬스트리지에 아무것도 없을때는 뭘 실행할 필요 없음.

2. appendChild 이용해서 투두가 등장할 화면 만들기
li, span, btn

3. [이번강의핵심] 투두리스트를 로컬스토리지에 저장 + 화면에 띄우기
3-1 로컬스토리지 저장 
1)투두리스트를 푸쉬할 빈배열 생성
2)투두리스트가 들어갈 형식으로 객체만들기. id는 length + 1(빈배열이라 길이가 0) / 리스트에도 같은 아이디값주기
3)객체 푸쉬해서 빈배열 toDos에 넣어주기  
4)saveTodos() 함수만들기. => 로컬스토리지에 객체저장하는데 JSON.stringify()이용해서 문자화하기 (로컬스토리지특징때문에)

3-2.화면에 띄우기
1)로컬스토리지가 빈값이 아니면 실행하는 함수 loadedToDos를 콘솔로깅해보면 문자열로 나오는데 다시 객체화해야함.
JSON.parse();
2)여기서 forEach(함수)를 이용해서 toDos에 있는 값들 중에서 .text만 가져온다.
3)그리고 이 값을 paintToDo에 넣어주면 비로소 화면에 나타난다! 


*/
