import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

type TabType = "all" | "todo" | "done";

interface TodoFilterProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
}

const TodoFilter = ({ activeTab, onTabChange }: TodoFilterProps) => {
  return (
    <Tabs
      defaultValue={activeTab}
      className="w-full"
      onValueChange={(value) => onTabChange(value as TabType)}
    >
      <TabsList className="mb-4">
        <TabsTrigger value="all">All</TabsTrigger>
        <TabsTrigger value="todo">To do</TabsTrigger>
        <TabsTrigger value="done">Done</TabsTrigger>
      </TabsList>
    </Tabs>
  );
};

export default TodoFilter;
