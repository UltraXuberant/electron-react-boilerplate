/* eslint-disable react/jsx-props-no-spreading */
import React, { useState } from 'react';
import {
  DragDropContext,
  Draggable,
  DropResult,
  Droppable,
} from 'react-beautiful-dnd';
import { Mob, CompareMob } from './Mob';
import AddMob from '../AddMob';
import MobDisplay from './MobDisplay';
import './Tracker.css';

// #region functions
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

// #endregion

function InitiativeList() {
  const players = [
    new Mob(0, 'dog', 9, 12),
    new Mob(1, 'cathorse', 2, 2),
    new Mob(2, 'mouse', 1, 4),
    new Mob(3, 'cat', 12, 2),
  ];

  const [mobs, setMobs] = useState(players);
  const [editingMob, setEditingMob] = useState<Mob | null>(null);
  const [editPopupOpen, setEditPopupOpen] = useState(false);
  const [nextIndex, setNextIndex] = useState(4);

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

  const rollInitiative = () => {
    const newMobs = Array.from(mobs);
    newMobs.forEach((mob) => {
      mob.Initiative =
        Math.ceil(Math.random() * 20) +
        (mob.InitiativeBonus === undefined ? 0 : mob.InitiativeBonus);
    });

    newMobs.sort(CompareMob);
    setMobs(newMobs);
  };

  const addMob = (
    name: string,
    initiative: number,
    initiativeBonus: number | undefined,
    hp: number,
    identifier?: number
  ) => {
    const newMobs = Array.from(mobs);
    if (identifier) {
      const index = newMobs.findIndex((mob) => mob.Identifier === identifier);
      newMobs[index] = new Mob(
        identifier,
        name,
        initiative,
        hp,
        initiativeBonus
      );
    } else {
      newMobs.push(new Mob(nextIndex, name, initiative, hp, initiativeBonus));
      setNextIndex(nextIndex + 1);
    }
    setMobs(newMobs);
    setEditingMob(null);
    setEditPopupOpen(false);
  };

  const editMob = (mob: Mob) => {
    setEditingMob(mob);
    setEditPopupOpen(true);
  };

  const deleteMob = (identifier: number) => {
    const oldMobs = Array.from(mobs);
    const newMobs = oldMobs.filter((mob) => mob.Identifier !== identifier);

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
        <div className="MainButtonContainer">
          <button
            onClick={initiativeSort}
            type="button"
            className="MainButtons"
          >
            Sort
          </button>
          <div>
            <button
              type="button"
              className="MainButtons"
              onClick={() => setEditPopupOpen(true)}
            >
              Add Mob
            </button>
            <AddMob
              editPopupOpen={editPopupOpen}
              setEditPopupOpen={setEditPopupOpen}
              setEditingMob={setEditingMob}
              editingMob={editingMob}
              addMob={addMob}
            />
          </div>
          <button
            onClick={rollInitiative}
            type="button"
            className="MainButtons"
          >
            Roll Initiative
          </button>
        </div>

        <div className="Headers">
          <span className="Initiative">Initiative</span>
          <span className="Name">Name</span>
          <span className="Health">HP</span>
          <span className="MobShortcuts" />
        </div>
        <Droppable droppableId="Initiative">
          {(provided) => (
            <div
              className=""
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {mobs.map((mob, index) => (
                <Draggable
                  key={mob.Identifier}
                  draggableId={mob.Identifier.toString()}
                  index={index}
                >
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
                          editMob={editMob}
                          addMob={addMob}
                          deleteMob={deleteMob}
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
