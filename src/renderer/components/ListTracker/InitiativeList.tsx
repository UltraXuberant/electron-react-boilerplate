/* eslint-disable react/jsx-props-no-spreading */
import { React, useState } from 'react';
import {
  DragDropContext,
  Draggable,
  DropResult,
  Droppable,
} from 'react-beautiful-dnd';
import { Mob, CompareMob } from './Mob';
import MobDisplay from './MobDisplay';
import './Tracker.css';

function CalculateNewHealth(
  health: number | undefined,
  displayHealth: string | undefined
) {
  let newHealth: number;
  let sign: string = '';
  let oldHealth: number;

  if (health === undefined || Number.isNaN(health)) {
    oldHealth = 0;
  } else {
    oldHealth = health;
  }

  if (displayHealth === undefined || displayHealth === '') {
    newHealth = 0;
  } else {
    sign = displayHealth.charAt(0);
    newHealth = parseInt(displayHealth, 10);
  }

  let updatedHealth: number;
  if (sign === '+' || sign === '-') {
    updatedHealth = Math.max(oldHealth + newHealth, 0);
  } else {
    updatedHealth = newHealth;
  }

  return updatedHealth;
}

function ParseHealth(newHealth: string | null) {
  let updatedHealth: string;

  if (newHealth === null || newHealth === undefined) {
    updatedHealth = '0';
  } else {
    updatedHealth = newHealth.match(/[-+]?[0-9]*/)?.[0] ?? '';
  }

  return updatedHealth;
}

function InitiativeList() {
  const players = [
    new Mob('dog', undefined, 12),
    new Mob('cathorse', 2, 2),
    new Mob('mouse', 1, 4),
    new Mob('cat', 12),
  ];

  const [mobs, setMobs] = useState(players);

  const onDragEnd = (result: DropResult) => {
    const { destination, source } = result;

    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    const newMobs = Array.from(mobs);
    const [reorderedItem] = newMobs.splice(source.index, 1);
    newMobs.splice(destination.index, 0, reorderedItem);

    setMobs(newMobs);
  };

  const initiativeSort = () => {
    const newMobs = Array.from(mobs);
    newMobs.sort(CompareMob);

    setMobs(newMobs);
  };

  // #region Health
  const onHealthChange = (name: string, newHealth: string | null) => {
    const newMobs = Array.from(mobs);
    const index = newMobs.findIndex((mob) => mob.Name === name);

    const updatedHealth: string = ParseHealth(newHealth);

    newMobs[index].DisplayHealth = updatedHealth;
    setMobs(newMobs);
  };

  const onHealthFinish = (name: string) => {
    const newMobs = Array.from(mobs);
    const index = newMobs.findIndex((mob) => mob.Name === name);

    const updatedHealth: number = CalculateNewHealth(
      newMobs[index].Health,
      newMobs[index].DisplayHealth
    );

    newMobs[index].Health = updatedHealth;
    newMobs[index].DisplayHealth = updatedHealth.toString();

    setMobs(newMobs);
  };

  const onKeyPressHealth = (name: string, key: string) => {
    if (key === 'Enter') {
      onHealthFinish(name);
    }
  };
  // #endregion

  // #region MaxHealth
  const onMaxHealthChange = (name: string, newHealth: string | null) => {
    const newMobs = Array.from(mobs);
    const index = newMobs.findIndex((mob) => mob.Name === name);

    const updatedHealth: string = ParseHealth(newHealth);

    newMobs[index].DisplayMaxHealth = updatedHealth;
    setMobs(newMobs);
  };

  const onMaxHealthFinish = (name: string) => {
    const newMobs = Array.from(mobs);
    const index = newMobs.findIndex((mob) => mob.Name === name);

    const updatedHealth: number = CalculateNewHealth(
      newMobs[index].MaxHealth,
      newMobs[index].DisplayMaxHealth
    );

    newMobs[index].MaxHealth = updatedHealth;
    newMobs[index].DisplayMaxHealth = updatedHealth.toString();

    setMobs(newMobs);
  };

  const onKeyPressMaxHealth = (name: string, key: string) => {
    if (key === 'Enter') {
      onMaxHealthFinish(name);
    }
  };
  // #endregion

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="Container">
        <h1 className="Title">Initiative</h1>
        <button onClick={initiativeSort} type="button">
          Sort
        </button>

        <div className="Headers">
          <span className="Initiative">Initiative</span>
          <span className="Name">Name</span>
          <span className="Health">HP</span>
        </div>
        <Droppable droppableId="Initiative">
          {(provided) => (
            <div
              className=""
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {mobs.map((mob, index) => (
                <Draggable key={mob.Name} draggableId={mob.Name} index={index}>
                  {(provided1) => {
                    return (
                      <div
                        {...provided1.draggableProps}
                        {...provided1.dragHandleProps}
                        ref={provided1.innerRef}
                        className="MobDraggable"
                      >
                        <MobDisplay
                          mob={mob}
                          onHealthChange={onHealthChange}
                          onHealthFinish={onHealthFinish}
                          onKeyPressHealth={onKeyPressHealth}
                          onMaxHealthChange={onMaxHealthChange}
                          onMaxHealthFinish={onMaxHealthFinish}
                          onKeyPressMaxHealth={onKeyPressMaxHealth}
                        />
                      </div>
                    );
                  }}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </div>
    </DragDropContext>
  );
}

export default InitiativeList;
