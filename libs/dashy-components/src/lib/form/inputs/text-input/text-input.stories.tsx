import React, { useState } from 'react';
import { TextInput } from '.';
import { ComponentStory, Meta } from '@storybook/react';

export default {
    title: 'components/forms/inputs/TextInput',
    component: TextInput,
    argTypes: {},
} as Meta<typeof TextInput>;

const Template: ComponentStory<typeof TextInput> = (args) => (
    <TextInput {...args} />
);

export const Default = Template.bind({});
Default.args = {
    required: true,
    label: 'lol',
    onChange: () => null,
};

export const Functional = () => {
    const [text, changeText] = useState('username');
    return <TextInput label={text} onChange={changeText} required />;
};
