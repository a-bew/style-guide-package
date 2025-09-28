import React, { memo } from 'react'

interface ExclamationIconProps extends React.SVGProps<SVGSVGElement>{
    size?: number,
    color?: string
}
const ExclamationIcon = ({size=9, color = "#A14807", ...props}: ExclamationIconProps) => {
  return (
    <svg width={size} height={size} viewBox="0 0 9 9" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M8.78065 4.76923C8.78065 7.07043 6.91516 8.93592 4.61396 8.93592C2.31276 8.93592 0.447266 7.07043 0.447266 4.76923C0.447266 2.46803 2.31276 0.602539 4.61396 0.602539C6.91516 0.602539 8.78065 2.46803 8.78065 4.76923ZM4.61396 1.99144C4.86965 1.99144 5.07692 2.19871 5.07692 2.4544V5.69516C5.07692 5.95085 4.86965 6.15813 4.61396 6.15813C4.35827 6.15813 4.15099 5.95085 4.15099 5.69516L4.15099 2.4544C4.15099 2.19871 4.35827 1.99144 4.61396 1.99144ZM4.03525 6.96832C4.03525 7.28793 4.29435 7.54703 4.61396 7.54703C4.93357 7.54703 5.19267 7.28793 5.19267 6.96832C5.19267 6.64871 4.93357 6.38961 4.61396 6.38961C4.29435 6.38961 4.03525 6.64871 4.03525 6.96832Z" fill= {color}/>
</svg>

  )
}

export default memo(ExclamationIcon)