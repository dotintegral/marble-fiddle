let observableId = 0;
let streamId = 0;

export const currentObservable = () => observableId;
export const nextObservable = () => observableId++;

export const currentStream = () => streamId;
export const nextStream = () => streamId++;
