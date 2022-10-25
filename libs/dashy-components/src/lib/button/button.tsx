import React from "react";
import { black, navyBlue, shadyOrange, white } from "../../common/colors";
import { IButtonProps } from "./button.types";
import { Typography } from "../typography";
import "./button.scss";

export const Button = ({
  typography = { label: "default", color: white },
  backgroundColor = navyBlue,
  onClick,
}: IButtonProps) => {
  return (
    <div
      datatype="button"
      className="button"
      style={{
        background: backgroundColor,
      }}
      onClick={() => onClick()}
    >
      <Typography {...typography} />
    </div>
  );
};
