import type { Meta, StoryObj } from "@storybook/react";
import LaunchList from "./LaunchList";
import { within } from "@storybook/testing-library";
import {expect} from "@storybook/test";

const meta: Meta<typeof LaunchList> = {
    title: "Components/LaunchList",
    component: LaunchList,
    tags: ["autodocs"],
    parameters: {
        a11y: {
            element: "#root",
            config: {},
            options: {},
        },
    },
};

export default meta;
type Story = StoryObj<typeof LaunchList>;

const mockData = {
    launchesPast: [
        { mission_name: "Starlink 15", launch_date_utc: "2023-06-10T20:00:00Z", rocket: { rocket_name: "Falcon 9" } },
        { mission_name: "Crew-3", launch_date_utc: "2023-07-21T14:00:00Z", rocket: { rocket_name: "Falcon 9" } },
        { mission_name: "GPS III SV05", launch_date_utc: "2023-08-12T22:30:00Z", rocket: { rocket_name: "Falcon 9" } },
    ],
};

export const Default: Story = {
    args: { data: mockData },
};

export const EmptyState: Story = {
    args: { data: { launchesPast: [] } },
};

export const ScreenshotTest: Story = {
    args: { data: mockData },
    parameters: {
        chromatic: { disableSnapshot: false },
    },
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement);
        expect(await canvas.findByText("Starlink 15")).toBeInTheDocument();
        expect(await canvas.findAllByText("🚀 Falcon 9")).toHaveLength(3);
    },
};

export const InteractiveTest: Story = {
    args: { data: mockData },
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement);
        const mission = await canvas.findByText("Starlink 15");
        expect(mission).toBeInTheDocument();

        // Симуляція кліку по першій місії
        await mission.click();

        // Перевірка, чи місія не зникла після кліку
        expect(await canvas.findByText("Starlink 15")).toBeInTheDocument();
    },
};

export const AccessibilityTest: Story = {
    args: { data: mockData },
    parameters: {
        a11y: {
            element: "#root",
            config: {},
            options: {},
        },
    },
};