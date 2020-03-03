const clockContainer = document.querySelector(".js-clock"),
  clockTitle = clockContainer.querySelector("h1");
//두개의 변수를 생성한다.

function getTime() {
  const date = new Date();
  //여기서 Date는 객체라고 생각하고 넘어가기
  const minutes = date.getMinutes();
  const hours = date.getHours();
  const seconds = date.getSeconds();
  clockTitle.innerText = `${hours < 10 ? `0${hours}` : hours}: ${
    minutes < 10 ? `0${minutes}` : minutes
  } :${seconds < 10 ? `0${seconds}` : seconds}`;
}
//html태그의 텍스트 삽입하기

/* setInterval (fn, 1000);
시간의 흐름에 따라 함수를 실행해주는 멋진 함수
첫번째 인자는 함수, 얼마나 자주 이 함수를 실행해줘야하는지의 시간간격이다.
1000밀리초 = 1초  
*/

function init() {
  getTime();
  setInterval(getTime, 1000);
}

init();
