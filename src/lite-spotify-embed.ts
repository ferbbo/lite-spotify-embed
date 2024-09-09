/**
 * OBJECTIVE:
 * Load a lightweight version of the frame using a fakeFrame that utilizes minimal resources (styles, images) provided by Spotify.
 * Only when the frame is played, download all the necessary resources.
 **/

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

class LiteSpotifyEmbed extends HTMLElement {
  private $wrapper!: HTMLDivElement;
  private $btnPlay!: HTMLButtonElement;
  private _bgColor: string;
  private tokenId: string;
  private contentType: 'show' | 'track' | 'play-list' | 'episode' | null;
  private content!: ContentIframe;

  [key: string]: any;

  constructor() {
    super();
    this._bgColor = '#4d4f51';
    this.tokenId = '';
    this.contentType = null;
    this.setDOM();
  }

  get bgColor(): string {
    return this._bgColor;
  }

  set bgColor(val: string) {
    this._bgColor = val;
    this.updateBgColor();
  }

  checkAttributteAndFetch() {
    if (this.tokenId && this.contentType) {
      this._fetchSpotify();
    }
  }

  insertGlobalStyles() {
    if (document.getElementById('lite-spotify-embed-styles')) return;
    const styleElement = document.createElement('style');
    styleElement.id = 'lite-spotify-embed-styles';
    styleElement.textContent = `
        @font-face {
          font-family: CircularSp;
          font-weight: 400;
          font-display: swap;
          src: url('https://encore.scdn.co/fonts/CircularSp-Book-a00e99ef9996a3a157fb6b746856d04f.woff2') format('woff2');
        }
        @font-face {
          font-family: CircularSpBold;
          font-weight: 400;
          font-display: swap;
          src: url('https://encore.scdn.co/fonts/CircularSp-Arab-Bold-c638a17a6708a3bd51bd2422c3fedcfb.woff2') format('woff2');
        }
      `;
    document.head.appendChild(styleElement);
  }
  setDOM() {
    this.insertGlobalStyles();
    const shadowDOM = this.attachShadow({ mode: 'open' });
    shadowDOM.innerHTML = `
            <div id="wrapper">
                <div id="frame-fake">
                    <img src="#" class="thumb"loading="lazy" />
                    <div class="desc">
                    <span class="logo">
                        <svg data-encore-id="icon" role="img" 
                            aria-hidden="true" viewBox="0 0 24 24">
                            <path d="M12 1a11 11 0 1 0 0 22 11 11 0 0 0 0-22zm5.045 15.866a.686.686 0 0 1-.943.228c-2.583-1.579-5.834-1.935-9.663-1.06a.686.686 0 0 1-.306-1.337c4.19-.958 7.785-.546 10.684 1.226a.686.686 0 0 1 .228.943zm1.346-2.995a.858.858 0 0 1-1.18.282c-2.956-1.817-7.464-2.344-10.961-1.282a.856.856 0 0 1-1.11-.904.858.858 0 0 1 .611-.737c3.996-1.212 8.962-.625 12.357 1.462a.857.857 0 0 1 .283 1.179zm.116-3.119c-3.546-2.106-9.395-2.3-12.78-1.272a1.029 1.029 0 0 1-.597-1.969c3.886-1.18 10.345-.952 14.427 1.471a1.029 1.029 0 0 1-1.05 1.77z"></path>
                        </svg>
                    </span>
                        <p class="title"></p>
                        <button class="btn-play" aria-label="Reproducir" disabled>
                            <svg data-encore-id="icon" role="img" aria-hidden="false" 
                                viewBox="0 0 24 24">
                                <title>Reproducir</title>
                                <path d="M1 12C1 5.925 5.925 1 12 1s11 4.925 11 11-4.925 11-11 11S1 18.075 1 12zm8.75-4.567a.5.5 0 0 0-.75.433v8.268a.5.5 0 0 0 .75.433l7.161-4.134a.5.5 0 0 0 0-.866L9.75 7.433z"></path>
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
            <style>
                #wrapper {
                    position: relative;
                    & > * {
                      box-sizing: border-box;
                    }
                }
                
                #frame-fake {
                    background-color: ${this._bgColor};
                    border-radius: 12px;
                    padding: 16px;
                    display: flex;
                    gap: 20px;
                    .thumb {
                      min-width: 120px;
                      min-height: 120px;
                      border-radius: 12px;
                      object-fit: cover;
                      transition: width .3s ease, height .3s ease ;
                      box-shadow: 0 9px 9px 0 #0000001a, 0 0 29px 0 #0000001a;
                    }
                    .desc {
                        display: flex;
                        justify-content: space-between;
                        width: 100%;
                        flex-direction: column;
                        color: #fff;
                        overflow: hidden;
                        .title {
                            font-family: CircularSp,CircularSpBold,sans-serif;
                            margin: 0;
                            font-size: 0.875rem;
                            display: initial;
                            white-space: nowrap;
                            overflow-x: hidden;
                            &:hover {
                                text-decoration: underline;
                            }
                        }
                        svg {
                            width:100%;
                            height: 100%;
                            fill: #fff;
                        }
                        .btn-play {
                            border: 0;
                            background-color: transparent;
                            outline: 0;
                            margin-left: auto;
                            width: 1.938rem;
                            height: 1.938rem;
                            padding: 0;
                            transition: transform .3s ease;
                            cursor: pointer;
                            &:hover {
                                transform: scale(1.1);
                            }
                            &:disabled svg {
                              fill: #9d9d9dc4;
                            }
                        }
                        .logo {
                            margin-left: auto;
                            width: 1.5rem;
                            height: 1.5rem;
                           
                        }
                    }
                }

                @media screen and (max-width: 524px) {
                     #frame-fake  {
                        .desc {
                            width: calc(100%);
                            .title  {
                                text-align: center;
                                
                            }
                        }
                    }                     
                }
                @media screen and (max-height: 351px) {
                  #frame-fake .thumb {
                    width: 200px;
                    height: 200px;
                  }
                }
                @media screen and (max-height: 231px) {
                  #frame-fake .thumb {
                    width: 120px;
                    height: 120px;
                  }
                }
            </style>
        `;
    this.$wrapper = shadowDOM.querySelector('#wrapper')!;
    this.$btnPlay = shadowDOM.querySelector('.btn-play')!;
  }
  async _fetchSpotify() {
    try {
      const response = await fetch(
        `https://open.spotify.com/oembed?url=https%3A%2F%2Fopen.spotify.com%2F${this.contentType}%2F${this.tokenId}`,
      );
      if (!response.ok) throw new Error(response.statusText);
      const data = await response.json();
      this.content = {
        img: {
          url: data.thumbnail_url,
          height: data.thumbnail_height,
          width: data.thumbnail_width,
        },
        title: data.title,
        iframeURL: data.iframe_url,
        height: data.height,
      };
      this.updateFrameFake();
    } catch (err) {
      alert('Error to load resource iframe: ' + err);
    }
  }
  updateBgColor() {
    this.$wrapper.querySelector<HTMLDivElement>(
      '#frame-fake',
    )!.style.backgroundColor = this.bgColor;
  }
  updateFrameFake() {
    if (this.content.img.url) {
      const $thumb =
        this.$wrapper.querySelector<HTMLImageElement>('#frame-fake .thumb');
      $thumb!.src = this.content.img.url;
    }
    if (this.content.title) {
      this.$wrapper.querySelector<HTMLParagraphElement>(
        '#frame-fake .title',
      )!.textContent = this.content.title;
    }
    if (this.content.iframeURL) {
      this.$wrapper.querySelector<HTMLButtonElement>(
        '#frame-fake .btn-play',
      )!.disabled = false;
    }
    if (this.content.height) {
      this.$wrapper.querySelector<HTMLDivElement>('#frame-fake')!.style.height =
        `${this.content.height}px`;
    }
  }

  addIframe() {
    const $iframeHTML = `
			<iframe 
			style="border-radius: 12px; position: absolute; z-index: 1; left: 0;top:0;" 
      src="${this.content.iframeURL}" 
      width="100%" height="${this.content.height}" 
      frameBorder="0" 
      allowfullscreen="" 
      allow="autoplay; 
      clipboard-write; 
      encrypted-media;
      fullscreen;picture-in-picture" 
      loading="lazy"></iframe>
			`;
    this.$wrapper.insertAdjacentHTML('beforeend', $iframeHTML);
  }
  static get observedAttributes() {
    return ['bg-color', 'token-id', 'content-type'];
  }

  connectedCallback() {
    this.$btnPlay.addEventListener('click', evt => {
      evt.preventDefault();
      this.addIframe();
    });
  }
  attributeChangedCallback(
    property: string,
    oldValue: string | number | undefined,
    newValue: string | number | undefined,
  ) {
    if (oldValue === newValue) return;
    const propFormated =
      /^[Aa-zZ\-]+$/.test(property) &&
      property.replace(/-([a-z])/g, g => g[1].toUpperCase());
    if (propFormated) this[propFormated] = newValue;
    this.checkAttributteAndFetch();
  }
}
customElements.define('lite-spotify-embed', LiteSpotifyEmbed);
