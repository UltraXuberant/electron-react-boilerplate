interface IMob {
  Identifier: number;
  Name: string;
  Initiative: number;
  InitiativeBonus: number | undefined;
  MaxHealth: number;
  Health: number;
  DisplayHealth: string;
  DisplayMaxHealth: string;
}

export function CompareMob(a: IMob, b: IMob) {
  if (a.Initiative === b.Initiative) {
    return 0;
  }

  return a.Initiative < b.Initiative ? 1 : -1;
}

export class Mob implements IMob {
  Identifier: number;

  Name: string;

  Initiative: number;

  InitiativeBonus: number | undefined;

  MaxHealth: number;

  Health: number;

  DisplayHealth: string;

  DisplayMaxHealth: string;

  constructor(
    Identifier: number,
    name: string,
    initiative: number,
    maxHealth: number,
    initiativeBonus: number | undefined = undefined,
  ) {
    this.Identifier = Identifier;
    this.Name = name;
    this.Initiative = initiative;
    this.InitiativeBonus = initiativeBonus;
    this.MaxHealth = maxHealth;
    this.Health = maxHealth;
    this.DisplayHealth = maxHealth.toString();
    this.DisplayMaxHealth = this.DisplayHealth;
  }
}

// export default Mob;
