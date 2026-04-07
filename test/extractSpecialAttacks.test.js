import extractSpecialAttacks from '../src/js/extractSpecialAttacks';

describe('extractSpecialAttacks function', () => {
  const fullCharacter = {
    name: 'Лучник',
    type: 'Bowman',
    health: 50,
    level: 3,
    attack: 40,
    defence: 10,
    special: [
      {
        id: 8,
        name: 'Двойной выстрел',
        icon: 'http://example.com/double.png',
        description: 'Двойной выстрел наносит двойной урон',
      },
      {
        id: 9,
        name: 'Нокаутирующий удар',
        icon: 'http://example.com/knockout.png',
      },
    ],
  };

  test('should extract attacks with description from full data', () => {
    const result = extractSpecialAttacks(fullCharacter);

    expect(result).toHaveLength(2);
    expect(result[0]).toEqual({
      id: 8,
      name: 'Двойной выстрел',
      icon: 'http://example.com/double.png',
      description: 'Двойной выстрел наносит двойной урон',
    });
  });

  test('should add default description when description is missing', () => {
    const result = extractSpecialAttacks(fullCharacter);

    expect(result[1]).toEqual({
      id: 9,
      name: 'Нокаутирующий удар',
      icon: 'http://example.com/knockout.png',
      description: 'Описание недоступно',
    });
  });

  test('should handle empty special array', () => {
    const character = {
      name: 'Маг',
      special: [],
    };

    const result = extractSpecialAttacks(character);
    expect(result).toEqual([]);
  });

  test('should handle missing special property', () => {
    const character = {
      name: 'Воин',
      health: 100,
    };

    const result = extractSpecialAttacks(character);
    expect(result).toEqual([]);
  });

  test('should handle special as empty array', () => {
    const character = {
      name: 'Клерик',
      special: [],
    };

    const result = extractSpecialAttacks(character);
    expect(result).toEqual([]);
  });

  test('should handle null input', () => {
    const result = extractSpecialAttacks(null);
    expect(result).toEqual([]);
  });

  test('should handle undefined input', () => {
    const result = extractSpecialAttacks(undefined);
    expect(result).toEqual([]);
  });

  test('should handle non-object input', () => {
    const result = extractSpecialAttacks('not an object');
    expect(result).toEqual([]);
  });

  test('should handle special as non-array', () => {
    const character = {
      name: 'Разбойник',
      special: 'not an array',
    };

    const result = extractSpecialAttacks(character);
    expect(result).toEqual([]);
  });

  test('should handle missing fields in attack object', () => {
    const character = {
      special: [
        {
          id: 1,
          // missing name, icon, description
        },
      ],
    };

    const result = extractSpecialAttacks(character);
    expect(result[0]).toEqual({
      id: 1,
      name: undefined,
      icon: undefined,
      description: 'Описание недоступно',
    });
  });

  test('should handle description as empty string', () => {
    const character = {
      special: [
        {
          id: 1,
          name: 'Атака',
          icon: 'http://example.com/icon.png',
          description: '',
        },
      ],
    };

    const result = extractSpecialAttacks(character);
    expect(result[0].description).toBe('Описание недоступно');
  });

  test('should handle description as null', () => {
    const character = {
      special: [
        {
          id: 1,
          name: 'Атака',
          icon: 'http://example.com/icon.png',
          description: null,
        },
      ],
    };

    const result = extractSpecialAttacks(character);
    expect(result[0].description).toBe('Описание недоступно');
  });

  test('should preserve all fields for complete attack data', () => {
    const character = {
      special: [
        {
          id: 42,
          name: 'Огненный шар',
          icon: 'http://example.com/fireball.png',
          description: 'Мощное заклинание огня',
        },
      ],
    };

    const result = extractSpecialAttacks(character);
    expect(result[0]).toEqual({
      id: 42,
      name: 'Огненный шар',
      icon: 'http://example.com/fireball.png',
      description: 'Мощное заклинание огня',
    });
  });

  test('should handle multiple attacks with mixed description presence', () => {
    const character = {
      special: [
        {
          id: 1,
          name: 'Атака 1',
          icon: 'icon1.png',
          description: 'Описание 1',
        },
        {
          id: 2,
          name: 'Атака 2',
          icon: 'icon2.png',
        },
        {
          id: 3,
          name: 'Атака 3',
          icon: 'icon3.png',
          description: 'Описание 3',
        },
        {
          id: 4,
          name: 'Атака 4',
          icon: 'icon4.png',
        },
      ],
    };

    const result = extractSpecialAttacks(character);

    expect(result[0].description).toBe('Описание 1');
    expect(result[1].description).toBe('Описание недоступно');
    expect(result[2].description).toBe('Описание 3');
    expect(result[3].description).toBe('Описание недоступно');
  });
});
