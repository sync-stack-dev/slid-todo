import type { Meta, StoryObj } from "@storybook/react";
import { NoteButton } from "../note-button";
import { TooltipProvider } from "@/components/ui/tooltip";

const meta = {
  title: "Components/ActionButtons/NoteButton",
  component: NoteButton,
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
} satisfies Meta<typeof NoteButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    onClick: () => alert("Note button clicked!"),
  },
};
