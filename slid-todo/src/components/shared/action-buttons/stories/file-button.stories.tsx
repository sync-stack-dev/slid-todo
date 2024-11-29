import type { Meta, StoryObj } from "@storybook/react";
import { FileButton } from "../file-button";
import { TooltipProvider } from "@/components/ui/tooltip";

const meta = {
  title: "Components/ActionButtons/FileButton",
  component: FileButton,
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
} satisfies Meta<typeof FileButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    url: "https://example.com/sample.pdf",
  },
};
