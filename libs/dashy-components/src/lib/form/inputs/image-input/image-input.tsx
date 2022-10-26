import React, { useRef } from 'react';
import { IImageInputProps } from './image-input.types';

import './image-input.scss';
import { FileInput } from '../file-input/file-input';

export const ImageInput = ({
    image,
    previewHeight = '5rem',
    previewWidth = '5rem',
    border = 0,
    radius = '50%',
    shadow,
    onChange,
    extraClassnames,
}: IImageInputProps) => {
    const mainExtraClassNames = [
        'imageInput',
        extraClassnames ? extraClassnames.join(' ') : null,
    ].join(' ');
    const imageExtraClassNames = ['image', shadow ? 'shadow' : null].join(' ');
    return (
        <div className={mainExtraClassNames}>
            <div
                className={imageExtraClassNames}
                style={{
                    height: `${previewHeight}`,
                    width: `${previewWidth}`,
                    borderRadius: `${radius}`,
                    backgroundImage: `url(${image})`,
                    backgroundSize: 'cover',
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'center center',
                    border: `solid black ${border}rem`,
                }}
            ></div>
            <div
                className="edit"
                style={{
                    position: 'absolute',
                    top: `${previewHeight}`,
                    left: `${previewWidth}`,
                }}
            >
                <FileInput onChange={onChange} />
            </div>
        </div>
    );
};
