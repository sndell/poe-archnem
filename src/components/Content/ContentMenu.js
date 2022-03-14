import React from 'react';
import styled from 'styled-components';
import ContentMenuMod from './ContentMenuMod';
import { GlobalContext } from '../../context';
import { useState } from 'react';
import { GrClose, GrCheckmark } from 'react-icons/gr';
import { BsSearch, BsArrowRightShort } from 'react-icons/bs';
import { useEffect } from 'react';

const StyledContentMenu = styled.div`
  background-color: #000000a4;
  display: flex;
  height: 100vh;
  width: 100vw;
  align-items: center;
  justify-content: center;
  position: absolute;

  .mod-menu {
    display: flex;
    flex-direction: column;
    background-color: ${({ theme }) => theme.colors.primary};

    &_top {
      height: 24px;
      background-color: ${({ theme }) => theme.colors.secondary};
      display: flex;
      align-items: center;
      justify-content: space-between;
      text-transform: capitalize;

      h1 {
        color: ${({ theme }) => theme.colors.text.secondary};
        padding: 0 8px;
      }

      .mod-menu_close {
        display: flex;
        align-items: center;
        cursor: pointer;

        svg {
          width: 24px;
          height: 24px;
          background-color: white;
        }
      }
    }

    &_main {
      display: flex;
      padding: 8px;

      .drop,
      .recipie {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
      }

      .drop {
        color: #37e9e0;
      }

      .recipie {
        color: #84f169;
      }

      .boss {
        display: flex;
        flex-direction: column;
        color: #ff3c3c;
      }
    }

    &_bottom {
      display: flex;
      justify-content: space-between;
      background-color: ${({ theme }) => theme.colors.secondary};
      height: 24px;

      .mod-menu_filter {
        display: flex;
        align-items: center;
        width: 100%;

        svg {
          padding: 0 6px;
        }

        input {
          width: 100%;
          background-color: #00000000;
          color: white;
          height: 100%;
          border: 0;
          outline: none;
          margin: 0;
          padding: 0;
          padding-left: 2px;

          &::placeholder {
            color: ${({ theme }) => theme.colors.text.secondary};
          }
        }
      }

      .menu-bottom_button {
        cursor: pointer;
        background-color: ${({ theme }) => theme.colors.accent};
        display: flex;
        align-items: center;
        font-weight: 500;
        font-size: 14px;

        h1 {
          padding: 0 4px 0 6px;
          margin-bottom: 2px;
        }

        svg {
          padding-right: 8px;
        }
      }
    }
  }
`;

const ContentMenu = (props) => {
  const { mode, selected, close } = props;
  const [filteredMods, setFilteredMods] = useState([]);
  const [selectedMods, setSelectedMods] = useState(selected);
  const [filterText, setFilterText] = useState('');

  const {
    state: { mods },
  } = GlobalContext();

  const addSelected = (mod) => {
    setSelectedMods((old) => [...old, mod]);
  };

  const removeSelected = (mod) => {
    setSelectedMods((old) => old.filter((item) => item !== mod));
  };

  // useEffect(() => {
  //   console.log(selectedMods);
  // }, [selectedMods]);

  const handleFilter = (e) => {
    setFilterText(e.target.value);
  };

  const handleClose = () => {
    close();
  };

  useEffect(() => {
    if (filterText) {
      setFilteredMods(
        mods
          .filter((mod) =>
            mod.name.toLowerCase().includes(filterText.toLowerCase())
          )
          .map((mod) => mod.name)
      );
    } else {
      setFilteredMods([]);
    }
  }, [filterText]);

  const getMod = (mod, type) => {
    return (
      <ContentMenuMod
        mod={mod}
        filtered={filteredMods}
        selected={selectedMods}
        add={addSelected}
        remove={removeSelected}
        key={`${type}-${mod.name}`}
      />
    );
  };

  return (
    <StyledContentMenu>
      <div className="mod-menu">
        <div className="mod-menu_top">
          <h1>{mode}</h1>
          <div className="mod-menu_close" onClick={handleClose}>
            <GrClose />
          </div>
        </div>
        <div className="mod-menu_main">
          <div className="drop">
            {mods
              .filter((mod) => !mod.combination)
              .map((mod) => getMod(mod, 'drop'))}
          </div>
          <div className="recipie">
            {mods
              .filter((mod) => mod.combination && !mod.name.includes('touched'))
              .map((mod) => getMod(mod, 'recipie'))}
          </div>
          <div className="boss">
            {mods
              .filter((mod) => mod.combination && mod.name.includes('touched'))
              .map((mod) => getMod(mod, 'boss'))}
          </div>
        </div>
        <div className="mod-menu_bottom">
          <div className="mod-menu_filter">
            <BsSearch style={{ fill: 'white', fontSize: '12px' }} />
            <input
              type="text"
              value={filterText}
              onChange={handleFilter}
              placeholder="Highlight mods..."
            />
          </div>
          <div className="menu-bottom_button">
            <h1>Confirm</h1>
            <GrCheckmark style={{ fontSize: '12px' }} />
          </div>
        </div>
      </div>
    </StyledContentMenu>
  );
};

export default ContentMenu;
