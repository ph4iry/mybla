const SEASON_ORDER = ['Rolling', 'Fall', 'Winter', 'Spring', 'Summer'];

// school-year order, and a single tag when something runs every season
export function seasons(value: string) {
  const items = value.split(',').map(s => s.trim()).filter(Boolean)
    .sort((a, b) => SEASON_ORDER.indexOf(a) - SEASON_ORDER.indexOf(b));
  return ['Fall', 'Winter', 'Spring', 'Summer'].every(s => items.includes(s)) && items.length === 4 ? ['Year-round'] : items;
}
