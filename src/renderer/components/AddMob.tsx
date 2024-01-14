/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useRef, useState } from 'react';
import Popup from 'reactjs-popup';
import { PopupActions } from 'reactjs-popup/dist/types';
import { Mob } from './ListTracker/Mob';

interface IAddMob {
  editPopupOpen: boolean;
  setEditPopupOpen(state: boolean): void;
  setEditingMob(state: Mob | null): void;
  editingMob: Mob | null;
  addMob(
    name: string,
    initiative: number,
    initiativeBonus: number | undefined,
    hp: number,
    identifier?: number
  ): void;
}

function checkNameValidity(name: string): boolean {
  return name !== '';
}

function AddMob({
  editPopupOpen,
  setEditPopupOpen,
  setEditingMob,
  editingMob,
  addMob,
}: IAddMob) {
  const ref = useRef<PopupActions>(null);

  const [mobName, setMobName] = useState('');
  const [mobInitiative, setMobInitiative] = useState(0);
  const [mobHp, setMobHp] = useState(0);
  const [mobInitBonus, setMobInitBonus] = useState<number | undefined>(
    undefined
  );

  const [validName, setValidName] = useState(checkNameValidity(mobName));

  const onNameChange = (name: string) => {
    const newName = name.trimStart();
    setMobName(newName);
    setValidName(checkNameValidity(newName));
  };

  const closingModal = () => {
    setMobName('');
    setMobInitiative(0);
    setMobInitBonus(undefined);
    setMobHp(1);
    setValidName(false);
    setEditPopupOpen(false);
    setEditingMob(null);
  };

  const onOpen = () => {
    if (editingMob !== null) {
      setMobName(editingMob.Name);
      setMobInitiative(editingMob.Initiative ?? 0);
      setMobHp(editingMob.MaxHealth ?? 0);
      setMobInitBonus(editingMob.InitiativeBonus);
      setValidName(true);
    }
  };

  return (
    <Popup
      open={editPopupOpen}
      ref={ref}
      modal
      nested
      onOpen={onOpen}
      onClose={closingModal}
    >
      <div className="AddMobModal">
        <button
          className="close"
          onClick={() => setEditPopupOpen(false)}
          type="button"
        >
          &times;
        </button>
        <div className="InputRow">
          <label htmlFor="name" className="AddLabels">
            Name
          </label>
          <div className="InputColumnWrapper">
            <input
              type="text"
              name="name"
              id="name"
              className="InputColumn"
              onChange={(e) => onNameChange(e.target.value)}
              value={mobName}
            />
          </div>
        </div>
        <div className="InputRow">
          <label htmlFor="initiative" className="AddLabels">
            Initiative
          </label>
          <div className="InputColumnWrapper">
            <input
              type="number"
              name="initiative"
              id="initiative"
              className="InputColumn"
              onChange={(e) => setMobInitiative(parseInt(e.target.value, 10))}
              value={mobInitiative}
            />
          </div>
        </div>
        <div className="InputRow">
          <label htmlFor="initiativeBonus" className="AddLabels">
            Init Bonus
          </label>
          <div className="InputColumnWrapper">
            <input
              type="number"
              name="initiativeBonus"
              id="initiativeBonus"
              className="InputColumn"
              onChange={(e) => setMobInitBonus(parseInt(e.target.value, 10))}
              value={mobInitBonus ?? 0}
            />
          </div>
        </div>
        <div className="InputRow">
          <label htmlFor="hp" className="AddLabels">
            Health
          </label>
          <div className="InputColumnWrapper">
            <input
              type="number"
              name="hp"
              id="hp"
              className="InputColumn"
              onChange={(e) => setMobHp(parseInt(e.target.value, 10))}
              value={mobHp}
            />
          </div>
        </div>
        <div className="ButtonContainer">
          <button
            type="submit"
            className="SubmitMob"
            title={validName ? '' : 'Please enter a name'}
            disabled={!validName}
            onClick={() =>
              addMob(
                mobName,
                mobInitiative,
                mobInitBonus,
                mobHp,
                editingMob?.Identifier
              )
            }
          >
            Create Mob
          </button>
        </div>
      </div>
    </Popup>
  );
}

export default AddMob;
