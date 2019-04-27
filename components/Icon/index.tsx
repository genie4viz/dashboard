import React from 'react';

import glyphs from './glyphs';

export interface IIcon {
  className?: string;
  fill?: string;
  icon: {
    viewBox: string;
    data: React.ReactNode;
  };
  isAriaHidden?: boolean;
  size: {
    height: number;
    width: number;
  };
  viewBox?: string;
}

const Icon: React.FC<IIcon> = ({
  className,
  fill,
  size: { height, width },
  icon,
  isAriaHidden,
  viewBox,
}) => (
  <svg
    className={className}
    style={{ display: 'block' }}
    aria-hidden={isAriaHidden}
    fill={fill}
    height={height}
    role={!isAriaHidden ? 'img' : ''}
    version="1.1"
    viewBox={viewBox || icon.viewBox || '0 0 200 200'}
    width={width}
  >
    {icon.data}
  </svg>
);

export { Icon as default, glyphs };
