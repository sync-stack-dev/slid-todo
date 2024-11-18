// components/todo/todo-list/todo-header.tsx
interface TodoHeaderProps {
  totalCount: number;
}

const TodoHeader = ({ totalCount }: TodoHeaderProps) => {
  return (
    <div className="flex justify-between items-center mb-4">
      <h2 className="text-lg">모든 할 일 ({totalCount})</h2>
      <button className="text-blue-500 text-sm">+ 할일 추가</button>
    </div>
  );
};

export default TodoHeader;
