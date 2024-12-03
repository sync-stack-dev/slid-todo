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
      className="w-full dark:bg-slate-800"
      onValueChange={(value) => onTabChange(value as TabType)}
    >
      <TabsList className="mb-4 bg-transparent">
        <TabsTrigger
          value="all"
          className="data-[state=active]:bg-blue-500 data-[state=active]:text-white rounded-full dark:data-[state=active]:bg-blue-800 dark:data-[state=active]:text-white"
        >
          All
        </TabsTrigger>
        <TabsTrigger
          value="todo"
          className="data-[state=active]:bg-blue-500 data-[state=active]:text-white rounded-full dark:data-[state=active]:bg-blue-800 dark:data-[state=active]:text-white"
        >
          To do
        </TabsTrigger>
        <TabsTrigger
          value="done"
          className="data-[state=active]:bg-blue-500 data-[state=active]:text-white rounded-full dark:data-[state=active]:bg-blue-800 dark:data-[state=active]:text-white"
        >
          Done
        </TabsTrigger>
      </TabsList>
    </Tabs>
  );
};

export default TodoFilter;
