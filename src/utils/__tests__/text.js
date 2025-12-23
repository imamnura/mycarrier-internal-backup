import * as text from '../text';

describe('Text Helpers', () => {
  describe('toLowerCase', () => {
    it('returns lower case text', () => {
      expect(text.toLowerCase('TES')).toEqual('tes');
    });
  });

  describe('textLimit', () => {
    it('returns text limit', () => {
      expect(text.textLimit('longtext', 2)).toEqual('lo...');
      expect(text.textLimit(undefined, 2)).toEqual('');
    });
  });

  describe('formatBytes', () => {
    it('returns format size', () => {
      expect(text.formatBytes('1')).toEqual('1 Bytes');
      expect(text.formatBytes(0)).toEqual('0 Bytes');
    });
  });

  describe('slugValidate', () => {
    it('text not null', () => {
      expect(text.slugValidate('tes')).not.toBeNull();
    });

    it('return lower case text', () => {
      expect(text.slugValidate('tes')).toEqual('tes');
    });
  });

  describe('capitalize', () => {
    it('captialize succcess', () => {
      expect(text.capitalize('tes')).toEqual('Tes');
    });
  });

  describe('normalizeRupiah', () => {
    it('empty', () => {
      expect(text.normalizeRupiah('')).toEqual('');
    });
    it('value', () => {
      expect(text.normalizeRupiah('200')).toEqual('Rp 200');
    });
    it('value not number', () => {
      expect(text.normalizeRupiah('a')).toEqual('');
    });
  });

  describe('normalizeOnlyNumber', () => {
    it('empty', () => {
      expect(text.normalizeOnlyNumber('')).toEqual('');
    });
    it('value', () => {
      expect(text.normalizeOnlyNumber('200')).toEqual('200');
    });
    it('value not number', () => {
      expect(text.normalizeOnlyNumber('a')).toEqual('');
    });
  });

  describe('spaceToUnderscore', () => {
    test('spaceToUnderscore', () =>
      expect(text.spaceToUnderscore('ini test')).toBeTruthy());
  });
});
