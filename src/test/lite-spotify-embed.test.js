import { fixture, html, expect, aTimeout } from '@open-wc/testing';
import sinon from 'sinon';
import '../lite-spotify-embed.js';

describe('LiteSpotifyEmbed', () => {
  let element, fetchSpotifySpy;

  beforeEach(async () => {
    element = await fixture(html`<lite-spotify-embed></lite-spotify-embed>`);
    fetchSpotifySpy = sinon.spy(element, '_fetchSpotify');
  });

  afterEach(() => {
    fetchSpotifySpy.restore();
  });

  it('should initialize the component correctly', () => {
    expect(element).to.exist;
    expect(element.shadowRoot).to.exist;
    expect(element.bgColor).to.equal('#4d4f51');
  });

  it('should update the background color when bgColor is changed', async () => {
    element.bgColor = '#ff0000';
    await aTimeout(0);
    const frameFake = element.shadowRoot.querySelector('#frame-fake');
    expect(frameFake.style.backgroundColor).to.equal('rgb(255, 0, 0)');
  });

  it('should call _fetchSpotify when tokenId and contentType are defined', async () => {
    element.tokenId = 'track';
    element.contentType = '12345';
    element.checkAttributteAndFetch();
    expect(fetchSpotifySpy).to.have.been.calledOnce;
  });

  it('should add iframe when the play button is clicked', async () => {
    element.content = {
      iframeURL: 'https://open.spotify.com/embed/track/12345',
      height: 300,
    };
    const btnPlay = element.shadowRoot.querySelector('.btn-play');
    btnPlay.disabled = false;
    btnPlay.click();
    await aTimeout(0);
    const iframe = element.shadowRoot.querySelector('iframe');
    expect(iframe).to.exist;
    expect(iframe.src).to.equal('https://open.spotify.com/embed/track/12345');
  });
});
