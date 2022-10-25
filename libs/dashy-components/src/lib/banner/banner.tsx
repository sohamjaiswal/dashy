import React from "react";
import { IBannerProps } from "./banner.types";

export const Banner = ({ image, size = 5 }: IBannerProps) => {
  return (
    <div
      className="banner"
      style={{
        height: `${size}rem`,
        width: "100%",
        background: `url(${image})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
    ></div>
  );
};
