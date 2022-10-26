import React from 'react';
import { Box } from './';
import { ComponentStory, Meta } from '@storybook/react';
import { Typography } from '../typography';

export default {
    title: 'components/Box',
    component: Box,
    argTypes: {},
} as Meta<typeof Box>;

const Template: ComponentStory<typeof Box> = (args) => <Box {...args} />;

export const Default = () => {
    return (
        <Box>
            <Typography label="Lorem do pariatur id eu est irure qui non enim nisi anim. Exercitation id tempor aute sunt nisi ut et excepteur. Nulla esse ea nisi nulla amet do duis." />
            <Typography label="Lorem do pariatur id eu est irure qui non enim nisi anim. Exercitation id tempor aute sunt nisi ut et excepteur. Nulla esse ea nisi nulla amet do duis." />
        </Box>
    );
};
