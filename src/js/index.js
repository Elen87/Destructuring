import extractSpecialAttacks from './extractSpecialAttacks';

const character = {
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
      icon: 'http://example.com/icons/double-shot.png',
      description: 'Двойной выстрел наносит двойной урон',
    },
    {
      id: 9,
      name: 'Нокаутирующий удар',
      icon: 'http://example.com/icons/knockout.png',
      // description отсутствует - будет заменено на "Описание недоступно"
    },
  ],
};

console.log('Исходный персонаж:');
console.log(character);

console.log('\nИзвлечённые спец.атаки:');
const attacks = extractSpecialAttacks(character);
console.log(attacks);

// Пример с пустым массивом special
const characterNoSpecial = {
  name: 'Маг',
  special: [],
};

console.log('\nПерсонаж без спец.атак:');
console.log(extractSpecialAttacks(characterNoSpecial));
