import './Tracker.css';
import { Mob } from './Mob';

interface IMobDisplay {
  mob: Mob;
  onHealthChange(name: string, newHealth: string | null): void;
  onHealthFinish(name: string): void;
  onKeyPressHealth(name: string, key: string): void;
  onMaxHealthChange(name: string, newHealth: string | null): void;
  onMaxHealthFinish(name: string): void;
  onKeyPressMaxHealth(name: string, key: string): void;
  // onKeyPressMaxHealth(key: string): void;
}

function MobDisplay({
  mob,
  onHealthChange,
  onHealthFinish,
  onKeyPressHealth,
  onMaxHealthChange,
  onMaxHealthFinish,
  onKeyPressMaxHealth,
}: IMobDisplay) {
  return (
    <div className="MobDisplay">
      <span className="Initiative InitiativeBlock">{mob.Initiative}</span>
      <span className="Name NameBlock">{mob.Name}</span>
      <div className="Health HealthContainer">
        <input
          className="HealthBlock"
          type="text"
          value={mob.DisplayHealth}
          onChange={(e) => onHealthChange(mob.Name, e.target.value)}
          onBlur={() => onHealthFinish(mob.Name)}
          onKeyDown={(e) => onKeyPressHealth(mob.Name, e.key)}
        />
        <em>/</em>
        <input
          className="HealthBlock"
          type="text"
          value={mob.DisplayMaxHealth}
          onChange={(e) => onMaxHealthChange(mob.Name, e.target.value)}
          onBlur={() => onMaxHealthFinish(mob.Name)}
          onKeyDown={(e) => onKeyPressMaxHealth(mob.Name, e.key)}
        />
      </div>
    </div>
  );
}

export default MobDisplay;
