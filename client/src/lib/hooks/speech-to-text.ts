export type SttInstance = SpeechRecognition;

type SttEventHandler = {
    eventName:
        | 'audiostart'
        | 'audioend'
        | 'speechstart'
        | 'speechend'
        | 'soundstart'
        | 'soundend'
        | 'start'
        | 'end'
        | 'error'
        | 'nomatch'
        | 'result';
    callback: <T>(
        this: SttInstance,
        e: T
    ) => void
}

export type RecognitionEvent = Event | SpeechRecognitionEvent | SpeechRecognitionErrorEvent;

export type SttParams = {
    continuous: boolean;
    interimResults: boolean;
    lang: string;
    maxAlternatives?: number;
    eventHandlers?: SttEventHandler[]
}

export function useStt(params: SttParams): SttInstance {
    const instance = new webkitSpeechRecognition();

    instance.continuous = params.continuous || true;
    instance.interimResults = params.interimResults || false;
    instance.lang = params.lang || navigator.language;
    instance.maxAlternatives = params.maxAlternatives || 1;

    if (params.eventHandlers) {
        for (const eventHandler of params.eventHandlers) {
            instance['on' + eventHandler.eventName] = eventHandler.callback;
        }
    }

    return instance;
}
