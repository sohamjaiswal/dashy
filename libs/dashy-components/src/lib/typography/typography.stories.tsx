import React from 'react';
import { Typography } from './';
import { ComponentStory, Meta } from '@storybook/react';

export default {
    title: 'components/Typography',
    component: Typography,
    argTypes: {},
} as Meta<typeof Typography>;

const Template: ComponentStory<typeof Typography> = (args) => (
    <Typography {...args} />
);

export const Default = Template.bind({});
Default.args = {
    label: 'lolerz',
    extraClassname: ['extra1', 'extra2'],
};
