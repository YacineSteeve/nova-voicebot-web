type EventHandler = {
    eventName:
        | 'onaudiostart'
        | 'onaudioend'
        | 'onspeechstart'
        | 'onspeechend'
        | 'onsoundstart'
        | 'onsoundend'
        | 'onstart'
        | 'onend'
        | 'onerror'
        | 'onnomatch'
        | 'onresult';
    callback: (this: SpeechRecognition, e: Event) => any
}

export type SttParams = {
    continuous: boolean;
    interimResults: boolean;
    lang: string;
    maxAlternatives?: number;
    eventHandlers?: EventHandler[]
}

export type SttInstance = SpeechRecognition;

export function useStt(params: SttParams): SttInstance {
    const instance = new SpeechRecognition() || new webkitSpeechRecognition();

    instance.continuous = params.continuous || true;
    instance.interimResults = params.interimResults || false;
    instance.lang = params.lang || 'en-US';
    instance.maxAlternatives = params.maxAlternatives || 1;

    if (params.eventHandlers) {
        for (const eventHandler of params.eventHandlers) {
            instance[eventHandler.eventName] = eventHandler.callback;
        }
    }

    return instance;
}
