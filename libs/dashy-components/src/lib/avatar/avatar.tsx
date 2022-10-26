import React from 'react';
import { IAvatarProps } from './avatar.types';
import './avatar.scss';

export const Avatar = ({
    size = 1,
    image,
    border = 0,
    shadow,
}: IAvatarProps) => {
    const extraClassNames = ['avatar', shadow ? 'shadow' : null].join(' ');
    return (
        <div
            className={extraClassNames}
            style={{
                height: `${size}rem`,
                width: `${size}rem`,
                borderRadius: '50%',
                backgroundImage: `url(${image})`,
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center center',
                border: `solid black ${border}rem`,
            }}
        ></div>
    );
};
