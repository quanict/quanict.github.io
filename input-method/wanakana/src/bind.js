import { makeOnInput, onComposition, trackListeners } from './utils/dom';
import { addDebugListeners } from './utils/logInputEvents';

const ELEMENTS = ['TEXTAREA', 'INPUT'];

let idCounter = 0;
const newId = () => {
  idCounter += 1;
  return `${Date.now()}${idCounter}`;
};

/**
 * Binds eventListener for 'input' events to an input field to automagically replace values with kana
 * Can pass { IMEMode: 'toHiragana' } or `'toKatakana'` as second param to enforce kana conversion type
 * @param  {HTMLElement} input textarea, input[type="text"] etc
 * @param  {DefaultOptions} [options=defaultOptions] defaults to { IMEMode: true } using `toKana`
 */
function bind(input = {}, options = {}, debug = false) {
  if (!ELEMENTS.includes(input.nodeName)) {
    throw new Error(
      `Element provided to Wanakana bind() was not a valid input or textarea element.\n Received: (${JSON.stringify(
        input
      )})`
    );
  }
  const onInput = makeOnInput(options, input);
  const id = newId();
  input.setAttribute('data-wanakana-id', id);
  //  input.autocapitalize = 'none'; // eslint-disable-line no-param-reassign
  input.addEventListener('input', onInput);
  input.addEventListener('compositionstart', onComposition);
  input.addEventListener('compositionchange', onComposition);
  input.addEventListener('compositionend', onComposition);
  trackListeners(id, onInput, onComposition);
  if (debug === true) {
    addDebugListeners(input);
  }
}

export default bind;
