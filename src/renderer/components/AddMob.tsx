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
    identifier?: number,
  ): void;
  storeMob(
    oldName: string,
    newName: string,
    hp: number,
    initiative: number,
    initiativeBonus: number | undefined,
  ): void;
}

function checkNameValidity(name: string): string {
  // return name !== '' && name.length < 15;
  if (name === '') {
    return 'Enter a name.';
  }
  if (name.length > 15) {
    return 'Name is too long.';
  }
  return '';
}

function checkNameValidityBool(name: string): boolean {
  return name === '';
}

function AddMob({
  editPopupOpen,
  setEditPopupOpen,
  setEditingMob,
  editingMob,
  addMob,
  storeMob,
}: IAddMob) {
  const ref = useRef<PopupActions>(null);

  const [mobName, setMobName] = useState('');
  const [mobInitiative, setMobInitiative] = useState(0);
  const [mobHp, setMobHp] = useState(0);
  const [mobInitBonus, setMobInitBonus] = useState<number | undefined>(
    undefined,
  );
  const [oldName, setOldName] = useState('');

  const [nameError, setNameError] = useState(checkNameValidity(mobName));
  const [validName, setValidName] = useState(checkNameValidityBool(nameError));

  const onNameChange = (name: string) => {
    const newName = name.trimStart();
    setMobName(newName);
    let tempNameError = checkNameValidity(newName);
    setNameError(tempNameError);
    setValidName(checkNameValidityBool(tempNameError));
  };

  const closingModal = () => {
    setOldName('');
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
      setOldName(editingMob.Name);
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
            title={validName ? '' : nameError}
            disabled={!validName}
            onClick={() =>
              addMob(
                mobName,
                mobInitiative,
                mobInitBonus,
                mobHp,
                editingMob?.Identifier,
              )
            }
          >
            {editingMob !== null ? 'Save Mob' : 'Create Mob'}
          </button>
          <button
            type="submit"
            className="SubmitMob"
            title={validName ? '' : nameError}
            disabled={!validName}
            onClick={() =>
              storeMob(oldName, mobName, mobHp, mobInitiative, mobInitBonus)
            }
          >
            Store Mob
          </button>
        </div>
      </div>
    </Popup>
  );
}

export default AddMob;
