import React from "react";
import { IBoxProps } from "./box.types";

import "./box.scss";

export const Box = ({ children, ...props }: IBoxProps) => {
  return (
    <div {...props} className="box">
      {children}
    </div>
  );
};
