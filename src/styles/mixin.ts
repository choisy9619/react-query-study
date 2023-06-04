import { css } from '@emotion/react';

export const $size = (width: string, height?: string) => css`
    height: ${height ?? width};
    width: ${width};
`;
