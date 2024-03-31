export const merge = (origin, target, shallow = true) => {
    return {
        ...origin,
        ...target,
    }
};

export const getDistanceBetweenPoints = (x1, x2, y1, y2) => {
    return Math.sqrt(((x1 - x2) * (x1 - x2)) + ((y1 - y2) * (y1 - y2)));
};

export const getAxis = (x1, x2, y1, y2) => {
    return {
        left: (x1 + x2) / 2,
        top: (y1 + y2) / 2,
    };
};

export const getRadians = (x1, x2, y1, y2) => {
    return Math.atan2(y1 - y2, x1 - x2);
};

export const getDegrees = (radians) => {
    return (radians * 180) / Math.PI;
};

