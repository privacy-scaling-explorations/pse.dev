import React from "react"

interface MySvgProps {
  color: "white" | "black"
}

export const ArrowRightUp = ({ color }: MySvgProps) => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill=""
      xmlns="http://www.w3.org/2000/svg"
    >
      <g id="arrow-right-up-line" clipPath="url(#clip0_3593_2234)">
        <path
          id="Vector"
          d="M16.0034 9.414L7.39642 18.021L5.98242 16.607L14.5884 8H7.00342V6H18.0034V17H16.0034V9.414Z"
          fill={color}
        />
      </g>
      <defs>
        <clipPath id="clip0_3593_2234">
          <rect width="24" height="24" fill={color} />
        </clipPath>
      </defs>
    </svg>
  )
}
