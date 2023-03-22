export type TtsInstance = HTMLAudioElement;

type TtsEventHandler = {
    eventName:
        | 'abort'
        | 'canplay'
        | 'canplaythrough'
        | 'durationchange'
        | 'emptied'
        | 'ended'
        | 'error'
        | 'loadeddata'
        | 'loadedmetadata'
        | 'loadstart'
        | 'pause'
        | 'play'
        | 'playing'
        | 'progress'
        | 'ratechange'
        | 'seeked'
        | 'seeking'
        | 'stalled'
        | 'suspend'
        | 'timeupdate'
        | 'volumechange'
        | 'waiting';
    callback: (
        this: TtsInstance,
        e: Event
    ) => void
}

export type TtsParams = {
    url: string;
    eventHandlers?: TtsEventHandler[];
}

export function useTts(params: TtsParams): TtsInstance {
    const audio = new Audio(params.url);

    if (params.eventHandlers) {
        for (const eventHandler of params.eventHandlers) {
            audio['on' + eventHandler.eventName] = eventHandler.callback;
        }
    }

    if ('preservesPitch' in audio) {
        audio.playbackRate = 1.1;
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        audio.preservesPitch = false;
    }

    return audio;
}
