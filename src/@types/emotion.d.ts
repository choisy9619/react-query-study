import '@emotion/react';
import type { CustomThemeType } from '@styles/theme';

declare module '@emotion/react' {
    export interface Theme extends CustomThemeType {}
}
