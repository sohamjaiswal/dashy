import React, { ChangeEvent, FocusEventHandler, MouseEvent } from "react";
import { Box } from "../../../box";
import { ITextAreaInputProps } from "./text-area-input.types";

import "./text-area-input.scss";
import { Typography } from "../../../typography";
import { okColor, errorColor } from "../../../../common/default-color";
import { TEXT_AREA_LIMT } from "../../../../common/global";

export const TextAreaInput = ({
  rows = 5,
  label,
  onChange,
  maxlength = TEXT_AREA_LIMT,
  placeholder = "",
  required,
}: ITextAreaInputProps) => {
  const textLengthColor = label.length < maxlength ? okColor : errorColor;

  return (
    <div className="textAreaInput">
      <Box>
        <textarea
          value={label}
          rows={rows}
          onFocus={(e) => e.target.select()}
          onChange={(e) => onChange(e.target.value)}
          maxLength={maxlength}
          placeholder={placeholder}
          required={required}
        />
        <div className="counter">
          <Typography
            label={`${label.length}/${maxlength}`}
            color={textLengthColor}
          />
        </div>
      </Box>
    </div>
  );
};
