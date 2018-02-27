import tokenize, { getType } from '../../src/tokenize';

describe('tokenize', () => {
  it('sane defaults', () => {
    expect(tokenize()).toEqual([]);
    expect(tokenize('')).toEqual([]);
    expect(getType()).toEqual('other');
    expect(getType('')).toEqual('other');
  });
  it('passes basic tests', () => {
    expect(tokenize('ふふ')).toEqual(['ふふ']);
    expect(tokenize('フフ')).toEqual(['フフ']);
    expect(tokenize('ふふフフ')).toEqual(['ふふ', 'フフ']);
    expect(tokenize('阮咸')).toEqual(['阮咸']);
    expect(tokenize('感じ')).toEqual(['感', 'じ']);
    expect(tokenize('私は悲しい')).toEqual(['私', 'は', '悲', 'しい']);
    expect(tokenize('ok لنذهب!')).toEqual(['ok', ' ', 'لنذهب', '!']);
  });

  it('handles mixed input', () => {
    expect(tokenize('5romaji here...!?漢字ひらがなカタ　カナ４「ＳＨＩＯ」。！')).toEqual([
      '5',
      'romaji',
      ' ',
      'here',
      '...!?',
      '漢字',
      'ひらがな',
      'カタ',
      '　',
      'カナ',
      '４',
      '「',
      'ＳＨＩＯ',
      '」。！',
    ]);
  });

  describe('options', () => {
    it('{compact: true}', () => {
      expect(
        tokenize('5romaji here...!?漢字ひらがなカタ　カナ４「ＳＨＩＯ」。！ لنذهب', {
          compact: true,
        })
      ).toEqual([
        '5',
        'romaji here',
        '...!?',
        '漢字ひらがなカタ　カナ',
        '４「',
        'ＳＨＩＯ',
        '」。！',
        ' ',
        'لنذهب',
      ]);
    });

    it('{detailed: true}', () => {
      expect(
        tokenize('5romaji here...!?漢字ひらがなカタ　カナ４「ＳＨＩＯ」。！ لنذهب', {
          detailed: true,
        })
      ).toEqual([
        { type: 'englishNumeral', value: '5' },
        { type: 'en', value: 'romaji' },
        { type: 'space', value: ' ' },
        { type: 'en', value: 'here' },
        { type: 'englishPunctuation', value: '...!?' },
        { type: 'kanji', value: '漢字' },
        { type: 'hiragana', value: 'ひらがな' },
        { type: 'katakana', value: 'カタ' },
        { type: 'space', value: '　' },
        { type: 'katakana', value: 'カナ' },
        { type: 'japaneseNumeral', value: '４' },
        { type: 'japanesePunctuation', value: '「' },
        { type: 'ja', value: 'ＳＨＩＯ' },
        { type: 'japanesePunctuation', value: '」。！' },
        { type: 'space', value: ' ' },
        { type: 'other', value: 'لنذهب' },
      ]);
    });

    it('{ compact: true, detailed: true}', () => {
      expect(
        tokenize('5romaji here...!?漢字ひらがなカタ　カナ４「ＳＨＩＯ」。！ لنذهب', {
          compact: true,
          detailed: true,
        })
      ).toEqual([
        { type: 'other', value: '5' },
        { type: 'en', value: 'romaji here' },
        { type: 'other', value: '...!?' },
        { type: 'ja', value: '漢字ひらがなカタ　カナ' },
        { type: 'other', value: '４「' },
        { type: 'ja', value: 'ＳＨＩＯ' },
        { type: 'other', value: '」。！' },
        { type: 'en', value: ' ' },
        { type: 'other', value: 'لنذهب' },
      ]);
    });
  });
});
