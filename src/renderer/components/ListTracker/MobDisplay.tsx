import './Tracker.css';
import { FaTrash, FaPen, FaRegCopy } from 'react-icons/fa6';
import { Mob } from './Mob';

interface IMobDisplay {
  mob: Mob;
  onHealthChange(name: string, newHealth: string | null): void;
  onHealthFinish(name: string): void;
  onKeyPressHealth(name: string, key: string): void;
  onMaxHealthChange(name: string, newHealth: string | null): void;
  onMaxHealthFinish(name: string): void;
  onKeyPressMaxHealth(name: string, key: string): void;
  editMob(aMob: Mob): void;
  addMob(
    name: string,
    initiative: number,
    initiativeBonus: number | undefined,
    hp: number,
    identifier?: number
  ): void;
  deleteMob(identifier: number): void;
}

function MobDisplay({
  mob,
  onHealthChange,
  onHealthFinish,
  onKeyPressHealth,
  onMaxHealthChange,
  onMaxHealthFinish,
  onKeyPressMaxHealth,
  editMob,
  addMob,
  deleteMob,
}: IMobDisplay) {
  return (
    <div className="MobDisplayWrapper">
      <div className="MobDisplay">
        <span className="Initiative InitiativeBlock">
          {mob.InitiativeBonus === undefined ? '' : `(${mob.InitiativeBonus}) `}
          {mob.Initiative}
        </span>
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
      <span className="MobShortcuts">
        <FaPen className="Shortcut" onClick={() => editMob(mob)} />
        <FaRegCopy
          className="Shortcut"
          onClick={() =>
            addMob(mob.Name, mob.Initiative, mob.InitiativeBonus, mob.MaxHealth)
          }
        />
        <FaTrash
          className="Shortcut"
          onClick={() => deleteMob(mob.Identifier)}
        />
      </span>
    </div>
  );
}

export default MobDisplay;
