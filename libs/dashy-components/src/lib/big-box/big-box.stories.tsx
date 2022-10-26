import React from 'react';
import { BigBox } from '.';
import { ComponentStory, Meta } from '@storybook/react';
import { Typography } from '../typography';

export default {
    title: 'components/BigBox',
    component: BigBox,
    argTypes: {},
} as Meta<typeof BigBox>;

const Template: ComponentStory<typeof BigBox> = (args) => <BigBox {...args} />;

export const Default = () => {
    return (
        <div
            className="dummyParent"
            style={{
                height: '90vh',
                width: '100%',
                display: 'flex',
            }}
        >
            <BigBox>
                {Array(100)
                    .fill(0)
                    .map((e, i) => {
                        return <Typography label="abc" key={i} />;
                    })}
            </BigBox>
        </div>
    );
};
