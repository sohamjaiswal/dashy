import React from 'react';
import { Avatar } from './';
import { ComponentStory, Meta } from '@storybook/react';

export default {
    title: 'components/Avatar',
    component: Avatar,
    argTypes: {},
} as Meta<typeof Avatar>;

const Template: ComponentStory<typeof Avatar> = (args) => <Avatar {...args} />;

export const Default = Template.bind({});
Default.args = {
    image: 'https://thicc.mywaifulist.moe/waifus/378/21ed3f61704ead7f7c9ed4fff0d0d3578e45f06ad160131e917fcb5442241101_thumb.jpg',
    size: 10,
    border: 1,
};
