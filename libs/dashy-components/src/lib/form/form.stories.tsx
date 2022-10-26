import React, { SyntheticEvent, useState } from 'react';
import { Form } from '.';
import { ComponentStory, Meta } from '@storybook/react';
import { TextInput } from './inputs/text-input';
import { Typography } from '../typography';
import { SubmitInput } from './inputs/submit-input';

export default {
    title: 'components/forms/Form',
    component: Form,
    argTypes: {},
} as Meta<typeof Form>;

const Template: ComponentStory<typeof Form> = (args) => <Form {...args} />;

export const Default = () => {
    const [username, setUsername] = useState('');
    const handleSubmit = (e: SyntheticEvent) => {
        e.preventDefault();
        console.log(username);
    };
    return (
        <Form onSubmit={handleSubmit}>
            <Typography label="Check console Cyka" weight={800} size={3} />
            <TextInput label={username} onChange={setUsername} />
            <SubmitInput button={{ onClick: () => null }} />
        </Form>
    );
};
