import React, { useState } from 'react';
import { SubmitInput } from '.';
import { ComponentStory, Meta } from '@storybook/react';

export default {
    title: 'components/forms/inputs/SubmitInput',
    component: SubmitInput,
    argTypes: {},
} as Meta<typeof SubmitInput>;

const Template: ComponentStory<typeof SubmitInput> = (args) => (
    <SubmitInput {...args} />
);

export const Default = Template.bind({});
Default.args = {
    button: {
        onClick: () => null,
        typography: {
            label: 'shit',
            color: 'white',
        },
    },
};
