import type { Meta, StoryObj } from "@storybook/react";
import { CopyButton } from "../copy-button";

const meta = {
  title: "Components/ActionButtons/CopyButton",
  component: CopyButton,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof CopyButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
