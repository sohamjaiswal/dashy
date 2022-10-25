import React from "react";
import { Banner } from "./";
import { ComponentStory, Meta } from "@storybook/react";

export default {
  title: "components/Banner",
  component: Banner,
  argTypes: {},
} as Meta<typeof Banner>;

const Template: ComponentStory<typeof Banner> = (args) => <Banner {...args} />;

export const Default = Template.bind({});
Default.args = {
  image: "https://wallpapercave.com/wp/wp3790967.jpg",
  size: 20,
};
