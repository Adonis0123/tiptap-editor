
declare module '*.svg' {
  import React from 'react'
  const SVG: React.FC<React.SVGProps<SVGSVGElement>>
  export default SVG
}

declare module '*.svg?svgr' {
  import React from 'react'
  const SVG: React.FC<React.SVGProps<SVGSVGElement>>
  export default SVG
}

declare module '*/theme.module.scss' {
  const primaryColor: string
  const primaryColorHover: string
  const secondaryColor: string
  const secondaryColorHover: string
  const displayColor: string
  const displayColorSecondary: string
  const displayColorTertiary: string
  const displayColorInverse: string
  const displayColorBorder: string
  const displayColorBorder2: string

  export {
    primaryColor,
    primaryColorHover,
    secondaryColor,
    secondaryColorHover,
    displayColor,
    displayColorSecondary,
    displayColorTertiary,
    displayColorInverse,
    displayColorBorder,
    displayColorBorder2,
  }

  const styles: Record<string, string>
  export default styles
}
