type TtsEventHandler = {
    eventName:
        | 'boundary'
        | 'end'
        | 'error'
        | 'mark'
        | 'pause'
        | 'resume'
        | 'start';
    callback: <T>(
        this: TtsInstance,
        e: T
    ) => void
}

export type TtsParams = {
    data: ArrayBuffer;
    eventHandlers: TtsEventHandler[];
}

export type TtsInstance = AudioBufferSourceNode;

export function useTts(params: TtsParams): TtsInstance {
    const context = new AudioContext();
    const source = context.createBufferSource();

    console.log('context', context);
    console.log('params', params.data);

    source.buffer = params.data;
    source.connect(context.destination);

    /*
    if (params.eventHandlers) {
        for (const eventHandler of params.eventHandlers) {
            audio['on' + eventHandler.eventName] = eventHandler.callback;
        }
    }
    */
    return source;
}
