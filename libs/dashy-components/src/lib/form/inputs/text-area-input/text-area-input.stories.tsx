import React, { useState } from 'react';
import { TextAreaInput } from '.';
import { ComponentStory, Meta } from '@storybook/react';

export default {
    title: 'components/forms/inputs/TextAreaInput',
    component: TextAreaInput,
    argTypes: {},
} as Meta<typeof TextAreaInput>;

const Template: ComponentStory<typeof TextAreaInput> = (args) => (
    <TextAreaInput {...args} />
);

export const Default = Template.bind({});
Default.args = {
    label: 'lol',
    onChange: () => null,
};

export const Functional = () => {
    const [text, changeText] = useState('Bio: Enter something about yourself!');
    return <TextAreaInput label={text} onChange={changeText} />;
};
