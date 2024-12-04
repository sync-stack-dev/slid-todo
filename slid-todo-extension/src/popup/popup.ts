import { getGoals, createTodo } from "./api";
import { Goal, CreateTodoRequest } from "./types";

document.addEventListener("DOMContentLoaded", async () => {
  const form = document.getElementById("todoForm") as HTMLFormElement;
  const titleInput = document.getElementById("title") as HTMLInputElement;
  const goalSelect = document.getElementById("goalSelect") as HTMLSelectElement;
  const currentUrlInput = document.getElementById(
    "currentUrl"
  ) as HTMLInputElement;

  try {
    // 현재 탭의 URL 가져오기
    const [tab] = await chrome.tabs.query({
      active: true,
      currentWindow: true,
    });
    if (tab.url) {
      // localhost:3000은 제외
      if (!tab.url.includes("localhost:3000")) {
        currentUrlInput.value = tab.url;
      }
    }

    // 목표 목록 가져오기
    const response = await getGoals();

    response.goals.forEach((goal: Goal) => {
      const option = document.createElement("option");
      option.value = goal.id.toString();
      option.textContent = goal.title;
      goalSelect.appendChild(option);
    });

    // 폼 제출 처리
    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      try {
        const todoData: CreateTodoRequest = {
          title: titleInput.value,
          goalId: parseInt(goalSelect.value, 10),
        };

        // URL이 있고 localhost가 아닌 경우에만 추가
        if (
          currentUrlInput.value &&
          !currentUrlInput.value.includes("localhost")
        ) {
          todoData.linkUrl = currentUrlInput.value;
        }

        // 데이터 유효성 검사
        if (!todoData.title) {
          alert("제목을 입력해주세요.");
          return;
        }
        if (!todoData.goalId) {
          alert("목표를 선택해주세요.");
          return;
        }

        console.log("Submitting todo:", todoData);
        await createTodo(todoData);
        window.close();
      } catch (error) {
        console.error("Todo 생성 실패:", error);
        alert("Todo 생성에 실패했습니다.");
      }
    });
  } catch (error) {
    console.error("초기화 실패:", error);
    alert("초기화에 실패했습니다. 로그인 상태를 확인해주세요.");
  }
});
