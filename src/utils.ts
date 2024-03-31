export const merge = (origin, target, shallow = true) => ({...origin,...target});

export const getDistanceBetweenPoints = (x1: number, x2: number, y1: number, y2: number) =>
    Math.sqrt(((x1 - x2) * (x1 - x2)) + ((y1 - y2) * (y1 - y2)));

export const getAxis = (x1: number, x2: number, y1: number, y2: number) =>({
    left: (x1 + x2) / 2,
    top: (y1 + y2) / 2,
});

export const getRadians = (x1: number, x2: number, y1: number, y2: number) => Math.atan2(y1 - y2, x1 - x2);

export const getDegrees = (radians: number) => (radians * 180) / Math.PI;

