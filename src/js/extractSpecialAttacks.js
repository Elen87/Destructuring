export default function extractSpecialAttacks(character) {
  // Проверка, что передан объект и есть поле special
  if (!character || typeof character !== 'object' || !Array.isArray(character.special)) {
    return [];
  }

  // Используем деструктуризацию в map
  return character.special.map(({
    id, name, icon, description,
  }) => ({
    id,
    name,
    icon,
    description: description || 'Описание недоступно',
  }));
}
