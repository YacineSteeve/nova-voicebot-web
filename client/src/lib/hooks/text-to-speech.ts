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
    url: string;
    eventHandlers?: TtsEventHandler[];
}

export type TtsInstance = HTMLAudioElement;

export function useTts(params: TtsParams): TtsInstance {
    const audio = new Audio(params.url);
    audio.playbackRate = 1.1;
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    audio.preservesPitch = false;

    if (params.eventHandlers) {
        for (const eventHandler of params.eventHandlers) {
            audio['on' + eventHandler.eventName] = eventHandler.callback;
        }
    }

    return audio;
}
