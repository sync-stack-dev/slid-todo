export const devLog = (...args: any[]) => {
  if (process.env.NODE_ENV === "development") {
    console.log(...args);
  }
};

// 사용 예시
// devLog("찍고 싶은 콘솔 값 :", todo.id, checked);
