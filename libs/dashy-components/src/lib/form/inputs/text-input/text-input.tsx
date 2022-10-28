import React, { ChangeEvent, FocusEventHandler, MouseEvent } from 'react';
import { Box } from '../../../box';
import { ITextInputProps } from './text-input.types';

import styles from './text-input.module.scss';

export const TextInput = ({
    required,
    label,
    onChange,
    placeholder,
    maxLength = 100,
    type = 'text',
}: ITextInputProps) => {
    return (
        <div className={styles['textInput']}>
            <Box className={styles['textInputBox']}>
                <input
                    required={required}
                    value={label}
                    onFocus={(e) => e.target.select()}
                    onChange={(e) => onChange(e.target.value)}
                    type={type}
                    placeholder={placeholder}
                    maxLength={maxLength}
                />
            </Box>
        </div>
    );
};
