import React, { useState } from 'react';
import { ImageInput } from '.';
import { ComponentStory, Meta } from '@storybook/react';

export default {
    title: 'components/forms/inputs/ImageInput',
    component: ImageInput,
    argTypes: {},
} as Meta<typeof ImageInput>;

const Template: ComponentStory<typeof ImageInput> = (args) => (
    <ImageInput {...args} />
);

export const Default = Template.bind({});
Default.args = {
    image: 'https://i.pinimg.com/550x/a8/47/9a/a8479a922b151b03df56a6db105dc5dd.jpg',
    onChange: () => null,
};

export const Functional = () => {
    const [image, changeImage] = useState(
        'https://i.pinimg.com/550x/a8/47/9a/a8479a922b151b03df56a6db105dc5dd.jpg'
    );
    return <ImageInput image={image} onChange={changeImage} />;
};
