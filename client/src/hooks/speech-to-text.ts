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
    callback: (
        this: SttInstance,
        e?: Event
    ) => void
}

export function isSpeechRecognitionEvent(event): event is SpeechRecognitionEvent {
    return 'results' in event;
}

export function isSpeechRecognitionErrorEvent(event): event is SpeechRecognitionErrorEvent {
    return event.type === SpeechRecognitionErrorEvent;
}

export type SttParams = {
    continuous: boolean;
    interimResults: boolean;
    lang: string;
    maxAlternatives?: number;
    eventHandlers?: SttEventHandler[]
}

export function useStt(params: SttParams): SttInstance {
    const instance = new webkitSpeechRecognition();

    if (params.eventHandlers) {
        for (const eventHandler of params.eventHandlers) {
            instance['on' + eventHandler.eventName] = eventHandler.callback;
        }
    }

    instance.continuous = params.continuous || true;
    instance.interimResults = params.interimResults || false;
    instance.lang = params.lang || navigator.language;
    instance.maxAlternatives = params.maxAlternatives || 1;

    return instance;
}
