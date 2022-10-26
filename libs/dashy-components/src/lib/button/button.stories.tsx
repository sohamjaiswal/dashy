import React from 'react';
import { Button } from './';
import { ComponentStory, Meta } from '@storybook/react';
import { Typography } from '../typography';
import { black, navyBlue, white } from '../../common/colors';

export default {
    title: 'components/Button',
    component: Button,
    argTypes: {},
} as Meta<typeof Button>;

const Template: ComponentStory<typeof Button> = (args) => <Button {...args} />;

export const Default = Template.bind({});
Default.args = {
    typography: {
        label: 'shit',
        color: white,
    },
};
