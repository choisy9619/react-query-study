const colors = {
    brightGray: '#eee',
    whiteGray: '#f5f5f5',
};

const fontFamily = `-apple-system,
    BlinkMacSystemFont, 'Apple SD Gothic Neo', 'Segoe UI', sans-serif,
    'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol'`;

const fontSizes = {
    size16: '1.6rem',
};

const theme = {
    colors,
    fontFamily,
    fontSizes,
};

export type CustomThemeType = typeof theme;

export default theme;
