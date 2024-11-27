import type { Meta, StoryObj } from "@storybook/react";
import { CreateNoteButton } from "../create-note-button";
import { TooltipProvider } from "@/components/ui/tooltip";
const meta = {
  title: "Components/ActionButtons/CreateNoteButton",
  component: CreateNoteButton,
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
} satisfies Meta<typeof CreateNoteButton>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {
  args: {
    onClick: () => alert("Create note button clicked!"),
  },
};
