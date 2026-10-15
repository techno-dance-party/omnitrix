export interface AlienPower {
  name: string;
  description: string;
  type: 'blast' | 'slam' | 'dash' | 'shield' | 'hack' | 'roar';
  cooldownMs: number;
}

export interface Alien {
  id: string;
  name: string;
  species: string;
  homeworld: string;
  element: string;
  lore: string;
  battleCry: string;
  primaryColor: string;
  accentColor: string;
  powers: [AlienPower, AlienPower];
}
