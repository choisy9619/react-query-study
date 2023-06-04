import { css } from '@emotion/react';
import reset from 'react-style-reset';

import type { CustomThemeType } from '@styles/theme';

export const globalStyles = (props: CustomThemeType) => css`
    ${reset};

    * {
        box-sizing: border-box;
    }

    html {
        font-size: 62.5%;
    }

    body {
        min-width: 30rem;
        min-height: calc(var(--vh, 1vh) * 100);
        word-wrap: break-word;
        word-break: keep-all;
        font-family: ${props.fontFamily};
        font-size: ${props.fontSizes.size16};
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;

        @supports (-webkit-appearance: none) and (stroke-color: transparent) {
            min-height: -webkit-fill-available;
        }
    }

    a {
        text-decoration: none;
        color: inherit;

        &:active {
            color: inherit;
        }
    }

    button,
    input,
    textarea {
        font-family: inherit;

        &:focus {
            outline: none;
        }
    }

    button {
        border: 0;
        padding: 0;
        background: transparent;
        cursor: pointer;

        &:disabled {
            cursor: inherit;
        }

        &:focus-visible {
            outline: 0.2rem solid black;
        }

        &:-moz-focusring {
            outline: 0.1rem dotted black;
        }
    }

    label {
        outline: 0;

        &:active {
            border: 0;
        }

        &:focus-visible {
            outline: 0.2rem solid black;
        }

        &:-moz-focusring {
            outline: 0.1rem dotted black;
        }
    }
`;

export default globalStyles;
