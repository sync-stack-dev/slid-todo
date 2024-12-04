import React from "react";

interface LogoIconProps {
  width?: number;
  height?: number;
}

const LogoIcon = ({ width = 16, height = 19 }: LogoIconProps) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 16 19"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect x="12.3252" y="2.05469" width="3.59459" height="15.4054" rx="1.54054" fill="#1D4ED8" />
      <path
        d="M0 4.72879C0 3.76605 0.66866 2.93249 1.60847 2.72364L11.3652 0.555475C12.648 0.270412 13.8649 1.24654 13.8649 2.56062V16.5306C13.8649 17.8149 12.6996 18.7842 11.4368 18.5504L1.68003 16.7435C0.706415 16.5632 0 15.714 0 14.7238V4.72879Z"
        fill="#3B82F6"
      />
      <path
        d="M4.1084 8.98675L5.64894 10.784L8.73002 7.18945"
        stroke="#F8FAFC"
        strokeWidth="1.23243"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default LogoIcon;
