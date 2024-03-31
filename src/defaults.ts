export const style = {
    borderStyle: 'dashed',
    borderColor: '#000',
    position: 'absolute',
    zIndex: '10', 
};

export type TotieSettings = {
    originX: number;
    originY: number;
    targetX: number;
    targetY: number;
    lineStroke: number;
    deleteButtonText: string;
    deleteButtonTitle: string;
    deleteButtonChildElement: HTMLElement | null;
    label: string;
    onRemove: () => void;
};

export const settings: TotieSettings = {
    originX: 0,
    originY: 0,
    targetX: 0,
    targetY: 0,
    lineStroke: 2,
    deleteButtonText: 'Delete',
    deleteButtonTitle: 'Delete Title',
    deleteButtonChildElement: null,
    label: 'Label',
    onRemove: () => {},
};

