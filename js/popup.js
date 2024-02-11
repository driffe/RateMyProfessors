document.addEventListener("DOMContentLoaded", () => {
  const screen = document.querySelector("#screen");
  const result = document.querySelector("#result");
  const percentage = document.querySelector("#percentage");

  let startTime; 
  let endTime; 
  let responseTime; 
  let records = []; 
  let timeoutId; 
  
  screen.addEventListener("click", () => {
    if (screen.classList.contains("waiting")) {
      screen.classList.replace("waiting", "ready");
      screen.textContent = "초록색이 되면 클릭하세요";

      timeoutId = setTimeout(() => {
        startTime = new Date();
        screen.classList.replace("ready", "now");
        screen.textContent = "클릭 하세요!";
      }, Math.floor(Math.random() * 1000) + 2000);
    } else if (screen.classList.contains("ready")) {
      clearTimeout(timeoutId);
      screen.textContent = '너무 성급합니다!';
      screen.classList.replace('ready', 'waiting')
    } else if (screen.classList.contains("now")) {
      endTime = new Date();
      responseTime = endTime - startTime; 
      records.push(responseTime);
      let Avg = records.reduce((acc, cur) => {return acc+cur}, 0) / records.length; 
      result.textContent = '현재: ' + Math.floor(responseTime) + " ms" + ' / ' + '평균 속도: ' + Math.floor(Avg) + " ms";
      ranking(Avg);
      screen.classList.replace("now", "waiting");
      screen.textContent = "클릭해서 시작하세요";
    }
  });

  function ranking(avg) {
    if(avg > 300) {
      percentage.textContent = "연습이 좀 필요하겠네요";
    } else if(avg > 250 && avg <= 300) {
      percentage.textContent = "일반인입니다.";
    } else if(avg > 190 && avg <= 250) {
      percentage.textContent = "일반인 이상입니다";
    } else if(avg > 150 && avg <= 190) {
      percentage.textContent = "프로게이머입니다";
    } else if(avg <= 150) {
      percentage.textContent = "천상계입니다";
    }
  }
});
