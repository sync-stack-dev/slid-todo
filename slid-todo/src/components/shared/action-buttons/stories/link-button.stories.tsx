import type { Meta, StoryObj } from "@storybook/react";
import { LinkButton } from "../link-button";
import { TooltipProvider } from "@/components/ui/tooltip";

const meta = {
  title: "Components/ActionButtons/LinkButton",
  component: LinkButton,
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
} satisfies Meta<typeof LinkButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    url: "https://example.com",
  },
};
