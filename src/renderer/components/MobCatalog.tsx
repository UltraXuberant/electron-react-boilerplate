import React, { useRef, useState } from 'react';
import Popup from 'reactjs-popup';
import { PopupActions } from 'reactjs-popup/dist/types';
import { Mob } from './ListTracker/Mob';
import Scrollbar from './Scrollbar';
import { FaTrash } from 'react-icons/fa6';

interface IMobCatalog {
  basePlayerPath: string;
  mobCatalogOpen: boolean;
  setMobCatalogOpen(state: boolean): void;
  addMob(
    name: string,
    initiative: number,
    initiativeBonus: number | undefined,
    hp: number,
    identifier?: number,
  ): void;
}

function MobCatalog({
  basePlayerPath,
  mobCatalogOpen,
  setMobCatalogOpen,
  addMob,
}: IMobCatalog) {
  const ref = useRef<PopupActions>(null);
  const store = window.electron.store;
  const [players, setPlayers] = useState<
    Record<string, Record<string, number>>
  >(store.get(basePlayerPath));

  const onOpen = () => {
    setPlayers(store.get(basePlayerPath));
  };

  const onClose = () => {
    setMobCatalogOpen(false);
  };

  return (
    <Popup open={mobCatalogOpen} ref={ref} onOpen={onOpen} onClose={onClose}>
      <div className="CatalogModal">
        <button
          className="close"
          onClick={() => setMobCatalogOpen(false)}
          type="button"
        >
          &times;
        </button>
        <Scrollbar>
          <ul className="PlayerList">
            {/* {players.map((player) => <li key={player.}>player.</li>)} */}
            {/* {players.} */}
            {Object.entries(players).map((player, index) => (
              <>
                <li className="PlayerItem" key={index}>
                  <span
                    onClick={() =>
                      addMob(
                        player[0],
                        player[1]['initiative'],
                        player[1]['initiativeBonus'],
                        player[1]['health'],
                      )
                    }
                  >
                    {player[0]}
                  </span>
                  <FaTrash
                    onClick={() =>
                      store.delete(basePlayerPath + '.' + player[0])
                    }
                  />
                </li>
              </>
            ))}
          </ul>
        </Scrollbar>
      </div>
    </Popup>
  );
}

export default MobCatalog;
