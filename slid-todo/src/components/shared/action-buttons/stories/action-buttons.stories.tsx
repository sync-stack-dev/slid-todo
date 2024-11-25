import type { Meta, StoryObj } from "@storybook/react";
import { ActionButtons } from "..";
import { TooltipProvider } from "@/components/ui/tooltip";

const meta = {
  title: "Components/ActionButtons/ActionButtons",
  component: ActionButtons,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <TooltipProvider>
        <Story />
      </TooltipProvider>
    ),
  ],
} satisfies Meta<typeof ActionButtons>;

export default meta;
type Story = StoryObj<typeof meta>;

// 모든 버튼이 표시되는 케이스
export const AllButtons: Story = {
  args: {
    linkUrl: "https://example.com",
    fileUrl: "https://example.com/sample.pdf",
    hasNote: true,
    onNoteClick: () => alert("Note button clicked!"),
  },
};

// 링크 버튼만 있는 케이스
export const LinkOnly: Story = {
  args: {
    linkUrl: "https://example.com",
  },
};

// 파일 버튼만 있는 케이스
export const FileOnly: Story = {
  args: {
    fileUrl: "https://example.com/sample.pdf",
  },
};

// 노트 버튼만 있는 케이스
export const NoteOnly: Story = {
  args: {
    hasNote: true,
    onNoteClick: () => alert("Note button clicked!"),
  },
};

// 링크와 파일 버튼만 있는 케이스
export const LinkAndFile: Story = {
  args: {
    linkUrl: "https://example.com",
    fileUrl: "https://example.com/sample.pdf",
  },
};
