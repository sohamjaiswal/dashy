import React from 'react';
import { Typography } from '../typography';
import { ISectionProps } from './section.types';
import { darkGrey } from '../../common/colors';

import './section.scss';

export const Section = ({ heading, content }: ISectionProps) => {
    return (
        <div className="section">
            <Typography
                label={heading}
                weight={600}
                color={darkGrey}
                size={2}
            />
            <hr />
            {content}
        </div>
    );
};
