import { Colors, FontFamily, FontSize, Spacing } from '../constants/tokens';

describe('Design tokens', () => {
  it('exports all required colour tokens', () => {
    expect(Colors.background).toBe('#FAF6F0');
    expect(Colors.espresso).toBe('#3B1F0E');
    expect(Colors.crema).toBe('#C8956C');
  });

  it('font sizes are all positive numbers', () => {
    Object.values(FontSize).forEach((size) => {
      expect(typeof size).toBe('number');
      expect(size).toBeGreaterThan(0);
    });
  });

  it('spacing values are all positive numbers', () => {
    Object.values(Spacing).forEach((value) => {
      expect(typeof value).toBe('number');
      expect(value).toBeGreaterThan(0);
    });
  });

  it('FontFamily references valid font names', () => {
    expect(FontFamily.display).toBe('PlayfairDisplay_700Bold');
    expect(FontFamily.body).toBe('DMSans_400Regular');
    expect(FontFamily.mono).toBe('DMMono_400Regular');
  });
});
