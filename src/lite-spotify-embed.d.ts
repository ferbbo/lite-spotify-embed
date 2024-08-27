declare class LiteSpotifyEmbed extends HTMLElement {
    private _bgColor;
    private _tokenId;
    private $wrapper;
    private $btnPlay;
    private episode;
    [key: string]: any;
    constructor();
    get bgColor(): string;
    set bgColor(val: string);
    get tokenId(): string;
    set tokenId(val: string);
    insertGlobalStyles(): void;
    setDOM(): void;
    fetchSpotify(): Promise<void>;
    updateBgColor(): void;
    updateFrame(): void;
    addIframe(): void;
    static get observedAttributes(): string[];
    connectedCallback(): void;
    attributeChangedCallback(property: string, oldValue: string | number | undefined, newValue: string | number | undefined): void;
}
