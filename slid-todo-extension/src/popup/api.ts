import { config } from "../config/constants";
import { GoalsResponse, CreateTodoRequest, Todo } from "./types";

const { API_BASE_URL, TEAM_ID } = config;

async function getAuthToken() {
  const cookie = await chrome.cookies.get({
    url: "http://localhost:3000",
    name: "accessToken",
  });

  if (!cookie) {
    throw new Error("로그인이 필요합니다. localhost:3000에서 로그인해주세요.");
  }

  return cookie.value;
}

export async function getGoals(): Promise<GoalsResponse> {
  const token = await getAuthToken();
  const response = await fetch(`${API_BASE_URL}/${TEAM_ID}/goals`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("목표 목록을 가져오는데 실패했습니다.");
  }

  return response.json();
}

export async function createTodo(data: CreateTodoRequest): Promise<Todo> {
  const token = await getAuthToken();

  // 요청 데이터 로깅
  console.log("Creating todo with data:", data);

  const response = await fetch(`${API_BASE_URL}/${TEAM_ID}/todos`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    // 에러 응답 로깅
    const errorText = await response.text();
    console.error("Server error:", errorText);
    throw new Error("할 일 생성에 실패했습니다.");
  }

  return response.json();
}
