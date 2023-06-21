import * as React from 'react'
const Cross = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={21} height={21} {...props}>
    <g
      fill={props?.fill ? props.fill : 'none'}
      fillRule="evenodd"
      strokeLinecap="round"
      strokeLinejoin="round"
      transform="translate(2 2)"
    >
      <circle cx={8.5} cy={8.5} r={8} stroke='#00000000' />
      <path d="m5.5 5.5 6 6M11.5 5.5l-6 6" />
    </g>
  </svg>
)
export default Cross
// import * as React from "react"
// const SvgComponent = (props) => (
//   <svg xmlns="http://www.w3.org/2000/svg" width={21} height={21} {...props}>
//     <g
//       fill="none"
//       fillRule="evenodd"
//       stroke="currentColor"
//       strokeLinecap="round"
//       strokeLinejoin="round"
//     >
//       <path d="m15.5 15.5-10-10zM15.5 5.5l-10 10" />
//     </g>
//   </svg>
// )
// export default SvgComponent
