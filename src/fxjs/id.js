let observableId = 0;
let streamId = 0;
let valueId = 0;
let timeId = 0;

export const currentObservable = () => observableId;
export const nextObservable = () => observableId++;

export const currentStream = () => streamId;
export const nextStream = () => streamId++;

export const currentValue = () => valueId;
export const nextValue = () => valueId++;

export const currentTime = () => timeId;
export const nextTime = () => timeId++;
