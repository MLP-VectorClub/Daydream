import { RgbColors } from 'src/types/sprite-generator';
import { convertNumberToRgb, convertRgbToNumber, hexToRgb, stringifyRgbNumber } from 'src/utils/color-guide';

describe('convertNumberToRgb', () => {
  const testNumber = (sourceNumber: number, expected: RgbColors) => {
    const result: RgbColors = convertNumberToRgb(sourceNumber);
    expect(result).toEqual(expected);
  };

  it('should convert number to rgb object', () => {
    testNumber(0xffffff, { red: 0xff, green: 0xff, blue: 0xff });
    testNumber(0x808080, { red: 0x80, green: 0x80, blue: 0x80 });
    testNumber(0x0000a0, { red: 0, green: 0, blue: 0xa0 });
    testNumber(0x00a000, { red: 0, green: 0xa0, blue: 0 });
    testNumber(0xa00000, { red: 0xa0, green: 0, blue: 0 });
    testNumber(0, { red: 0, green: 0, blue: 0 });
    testNumber(0x6181b8, { red: 0x61, green: 0x81, blue: 0xb8 });
  });
});

describe('convertRgbToNumber', () => {
  const testValues = (red: number, green: number, blue: number, expected: number) => {
    const result: number = convertRgbToNumber(red, green, blue);
    expect(result).toEqual(expected);
  };

  it('should convert individual rgb values to a number', () => {
    testValues(0xff, 0xff, 0xff, 0xffffff);
    testValues(0x80, 0x80, 0x80, 0x808080);
    testValues(0, 0, 0xa0, 0x0000a0);
    testValues(0, 0xa0, 0, 0x00a000);
    testValues(0xa0, 0, 0, 0xa00000);
    testValues(0, 0, 0, 0);
    testValues(0x61, 0x81, 0xb8, 0x6181b8);
  });
});

describe('stringifyRgbNumber', () => {
  const testNumber = (rgb: number, expected: string) => {
    const result: string = stringifyRgbNumber(rgb);
    expect(result).toEqual(expected);
  };

  it('should convert rgb values to a number', () => {
    testNumber(0xffffff, '#FFFFFF');
    testNumber(0x808080, '#808080');
    testNumber(0xa0, '#0000A0');
    testNumber(0xa000, '#00A000');
    testNumber(0xa00000, '#A00000');
    testNumber(0, '#000000');
    testNumber(0x6181b8, '#6181B8');
  });
});

describe('hexToRgb', () => {
  const testString = (sourceString: string, expected: ReturnType<typeof hexToRgb>) => {
    const result = hexToRgb(sourceString);
    expect(result).toEqual(expected);
  };

  it('should convert hex string to rgb object', () => {
    testString('#ffffff', { red: 0xff, green: 0xff, blue: 0xff });
    testString('#808080', { red: 0x80, green: 0x80, blue: 0x80 });
    testString('#0000a0', { red: 0, green: 0, blue: 0xa0 });
    testString('#00a000', { red: 0, green: 0xa0, blue: 0 });
    testString('#a00000', { red: 0xa0, green: 0, blue: 0 });
    testString('#000000', { red: 0, green: 0, blue: 0 });
    testString('#6181b8', { red: 0x61, green: 0x81, blue: 0xb8 });
  });

  it('should return null fort invalid values', () => {
    testString('kappa', null);
    testString('whatevenis', null);
    testString('nello there', null);
    testString('general kenobi', null);
    testString('dQw4w9WgXcQ', null);
    testString('ab', null);
    testString('abcd', null);
    testString('abcdf', null);
  });
});
