import type { Meta, StoryObj } from "@storybook/react";
import { Input } from "./input";

const meta = {
  title: "Components/Input",
  component: Input,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    placeholder: "Enter text here...",
  },
};

export const Disabled: Story = {
  args: {
    placeholder: "Disabled input",
    disabled: true,
  },
};

export const WithLabel: Story = {
  render: (args) => (
    <div className="grid w-full max-w-sm gap-1.5">
      <label htmlFor="email" className="text-sm font-medium">
        Email
      </label>
      <Input id="email" type="email" placeholder="Email" {...args} />
    </div>
  ),
};

export const WithError: Story = {
  render: (args) => (
    <div className="grid w-full max-w-sm gap-1.5">
      <label htmlFor="error" className="text-sm font-medium">
        Error Input
      </label>
      <Input
        id="error"
        placeholder="Error state"
        className="border-red-500 focus-visible:ring-red-500"
        {...args}
      />
      <p className="text-sm text-red-500">This field is required</p>
    </div>
  ),
};

export const FileInput: Story = {
  args: {
    type: "file",
  },
};

export const Password: Story = {
  args: {
    type: "password",
    placeholder: "Enter password...",
  },
};
