const nonSupportedBrowsers = [
    'MSIE',
    'Firefox',
    'Opera',
];

function browserIsSupported(browser: string): boolean {
    return navigator.userAgent.indexOf(browser) !== -1;
}

function isIE(): boolean {
    return browserIsSupported('MSIE');
}

function isFirefox(): boolean {
    return browserIsSupported('Firefox');
}

function isOpera(): boolean {
    return browserIsSupported('Opera') || browserIsSupported('OPR');
}

function constructorIsSupported(): boolean {
    return !!window.webkitSpeechRecognition || !!window.SpeechRecognition;
}

const supportsSpeechRecognition: boolean =
    !isIE() &&
    !isFirefox() &&
    !isOpera() &&
    constructorIsSupported();

export { supportsSpeechRecognition, nonSupportedBrowsers };
