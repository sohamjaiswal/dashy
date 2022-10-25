import React from "react";
import { Section } from ".";
import { ComponentStory, Meta } from "@storybook/react";
import { Typography } from "../typography";
import { darkGrey } from "../../common/colors";

export default {
  title: "components/Section",
  component: Section,
  argTypes: {},
} as Meta<typeof Section>;

const Template: ComponentStory<typeof Section> = (args) => (
  <Section {...args} />
);

export const Default = Template.bind({});
Default.args = {
  heading: "About",
  content: (
    <Typography
      label="Itsuki Nakano (中野 五月 Nakano Itsuki) is one of the tsundere characters in Gotoubun no Hanayome, along with her sister Nino Nakano. She is the fifth and youngest sister of the Nakano quintuplets and her love interest is Fuutarou Uesugi. She is serious and dilligent, yet also a glutton and crybaby."
      weight={500}
      size={1.5}
    />
  ),
};
