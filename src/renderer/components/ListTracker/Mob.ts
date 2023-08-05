interface IMob {
  Name: string;
  Initiative?: number;
  MaxHealth?: number;
  Health?: number;
  DisplayHealth?: string;
  DisplayMaxHealth?: string;
}

export function CompareMob(a: IMob, b: IMob) {
  if (a.Initiative === b.Initiative) {
    return 0;
  }

  if (a.Initiative === undefined || a.Initiative === null) {
    return 1;
  }

  if (b.Initiative === undefined || a.Initiative === null) {
    return -1;
  }

  return a.Initiative < b.Initiative ? 1 : -1;
}

export class Mob implements IMob {
  Name: string;

  Initiative?: number | undefined;

  MaxHealth?: number | undefined;

  Health?: number | undefined;

  DisplayHealth?: string | undefined;

  DisplayMaxHealth?: string | undefined;

  constructor(name: string, initiative?: number, maxHealth?: number) {
    this.Name = name;
    this.Initiative = initiative;
    this.MaxHealth = maxHealth;
    this.Health = maxHealth;
    this.DisplayHealth = maxHealth?.toString();
    this.DisplayMaxHealth = this.DisplayHealth;
  }
}

// export default Mob;
