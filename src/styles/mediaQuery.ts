import facepaint from 'facepaint';

export const breakpoints = {
    xs: 0,
    sm: 375,
    md: 768,
    lg: 1280,
    xl: 1440,
};

export const breakpointsArray = Object.keys(breakpoints);

export const media = (device: string) => {
    const breakpointsArray = Object.keys(breakpoints).map((key) => [
        key,
        breakpoints[key],
    ]);

    const [result] = breakpointsArray.reduce(
        (acc, [name, size]) =>
            device === name ? [...acc, `@media (min-width: ${size}px)`] : acc,
        [],
    );

    return result;
};

export const mediaArray = facepaint(
    breakpointsArray.map((device) => `@media (min-width: ${device}px)`),
    { literal: true, overlap: true },
);
