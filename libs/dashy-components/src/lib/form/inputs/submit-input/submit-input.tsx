import React from "react";
import { Button } from "../../../button";
import { ISubmitInputProps } from "./submit-input.types";

export const SubmitInput = ({ button }: ISubmitInputProps) => {
  return (
    <div className="submitInput">
      <label htmlFor="submitInput">
        <input id="submitInput" type={"submit"} datatype="button" hidden />
        <Button {...button} />
      </label>
    </div>
  );
};
