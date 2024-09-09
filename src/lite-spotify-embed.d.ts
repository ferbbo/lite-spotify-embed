interface ContentIframe {
    img: {
        height: number;
        width: number;
        url: string;
    };
    title: string;
    iframeURL: string;
    height: number;
}
declare class LiteSpotifyEmbed extends HTMLElement {
    private $wrapper;
    private $btnPlay;
    private _bgColor;
    private tokenId;
    private contentType;
    private content;
    [key: string]: any;
    constructor();
    get bgColor(): string;
    set bgColor(val: string);
    checkAttributteAndFetch(): void;
    insertGlobalStyles(): void;
    setDOM(): void;
    _fetchSpotify(): Promise<void>;
    updateBgColor(): void;
    updateFrameFake(): void;
    addIframe(): void;
    static get observedAttributes(): string[];
    connectedCallback(): void;
    attributeChangedCallback(property: string, oldValue: string | number | undefined, newValue: string | number | undefined): void;
}
