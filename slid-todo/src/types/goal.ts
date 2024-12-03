export interface Goal {
  id: number;
  title: string;
  createdAt: string;
  updatedAt: string;
}

// 프로그레스 추가로 커스텀한 타입
interface dashBoardGoal {
  id: number; // 'string' 대신 'number'로 변경
  title: string;
  progress: number;
  createdAt: string; // 추가 속성 정의 (필요 시)
  updatedAt: string;
  userId: number;
  teamId: string;
}
