import { Meta, StoryObj } from "@storybook/react";
import Header from "@components/Header/Header";


const meta: Meta<typeof Header> = {
    title: "Components/Header",
    component: Header,
    argTypes: {
        isBlurred: { control: "boolean" },
    },
    tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        isBlurred: false,
    },
};

export const Blurred: Story = {
    args: {
        isBlurred: true,
    },
};
