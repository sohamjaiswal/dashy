import React from "react";
import { IFileInputProps } from "./file-input.types";

import "./file-input.scss";

export const FileInput = ({ onChange }: IFileInputProps) => {
  return (
    <div className="fileInput">
      <input
        className="custom-file-input"
        id="imageInput"
        type={"file"}
        accept="image/*"
        style={{ marginLeft: "3rem" }}
        onChange={(e) => onChange(URL.createObjectURL(e.target.files[0]))}
      />
    </div>
  );
};
