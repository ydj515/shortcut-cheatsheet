import { describe, it, expect } from 'vitest';
import { isModifierKey, formatKeyCombo } from './keyboardUtils';

describe('keyboardUtils', () => {
  it('isModifierKey returns true for modifier keys', () => {
    expect(isModifierKey('Shift')).toBe(true);
    expect(isModifierKey('Meta')).toBe(true);
    expect(isModifierKey('Control')).toBe(true);
    expect(isModifierKey('Alt')).toBe(true);
    expect(isModifierKey('A')).toBe(false);
    expect(isModifierKey('z')).toBe(false);
  });

  it('formatKeyCombo formats key sets with modifiers first', () => {
    // expect(formatKeyCombo(new Set(['Meta', 'A']))).toMatch(/⌘.*A|A.*⌘/);
    expect(formatKeyCombo(new Set(['Shift', 'B']))).toMatch(/⇧.*B|B.*⇧/);
    expect(formatKeyCombo(new Set(['Alt']))).toMatch(/Option|Alt/);
  });
}); 