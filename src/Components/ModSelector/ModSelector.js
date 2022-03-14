import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { BsFilter, BsSearch, BsArrowRightShort } from 'react-icons/bs';
import mods from '../../data/mods';
import ModSelectorMod from './ModSelectorMod';

const StyledModSelector = styled.div`
  display: flex;
  flex-direction: column;

  .hidden {
    display: none !important;
  }

  .top {
    display: flex;
    justify-content: space-between;

    .button {
      display: flex;
      align-items: center;
      padding: 6px 8px;
      background-color: white;
      cursor: pointer;

      h1 {
        margin-right: 8px;
        font-size: 1rem;
      }

      svg {
        margin-top: 2px;
      }
    }
  }

  .menu {
    display: flex;
    flex-direction: column;

    .mod-container {
      display: flex;
      background-color: #111112;
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

    .menu-bottom {
      height: 24px;
      background-color: #2c2c31;
      display: flex;
      align-items: center;
      justify-content: space-between;

      /* &_text {
        display: flex;
        color: #ffffff;
        margin-left: 8px;
        margin-bottom: 1.5px;
        font-size: 14px;
      }

      &_mod {
        margin-left: 8px;
        font-weight: 300;
        color: #c5c5c5;
      } */

      &_filter {
        display: flex;
        align-items: center;
        width: 100%;
        height: 100%;
        background: #212124;

        input {
          background-color: #212124;
          padding-left: 8px;
          padding-bottom: 2px;
          border: none;
          outline: none;
          color: white;
          font-size: 12px;
          font-weight: 300;
          height: 21px;
          width: 100%;

          &::placeholder {
            color: #c5c5c5;
          }
        }

        svg {
          height: 100%;
          padding: 0 8px;
          background-color: #111112;
        }
      }

      &_button {
        display: flex;
        height: 100%;
        padding: 0 8px;
        align-items: center;
        background-color: #ffffff;
        cursor: pointer;

        h1 {
          padding-bottom: 1px;
          padding-left: 6px;
          font-size: 14px;
        }

        svg {
          margin-left: 6px;
        }
      }
    }
  }
`;

const ModSelector = () => {
  const [selectedMods, setSelectedMods] = useState([]);
  const [filteredMods, setFilteredMods] = useState([]);
  const [filterText, setFilterText] = useState('');
  const [showMenu, setShowMenu] = useState(false);

  const addSelected = (mod) => {
    setSelectedMods((old) => [...old, mod]);
  };
  const removeSelected = (mod) => {
    setSelectedMods((old) => old.filter((item) => item !== mod));
  };

  const handleSearch = (e) => {
    setFilterText(e.target.value);
  };

  const handleSelect = (e) => {
    console.log(selectedMods.length > 3);
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

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  // useEffect(() => {
  //   console.log(selectedMods);
  // }, [selectedMods]);

  // useEffect(() => {
  //   console.log(filteredMods);
  // }, [filteredMods]);

  const getItem = (mod, type) => {
    return (
      <ModSelectorMod
        mod={mod}
        key={`${type}-${mod.name}`}
        add={addSelected}
        remove={removeSelected}
        selected={selectedMods}
        filtered={filteredMods}
      />
    );
  };

  return (
    <StyledModSelector>
      <div className="top">
        <div className="button" onClick={toggleMenu}>
          <h1>Select mods</h1>
          <BsFilter />
        </div>
      </div>
      <div className={showMenu ? 'menu' : 'menu hidden'}>
        <div className="mod-container">
          <div className="drop">
            {mods
              .filter((mod) => !mod.combination)
              .map((mod) => getItem(mod, 'drop'))}
          </div>
          <div className="recipie">
            {mods
              .filter((mod) => mod.combination && !mod.name.includes('touched'))
              .map((mod) => getItem(mod, 'recipie'))}
          </div>
          <div className="boss">
            {mods
              .filter((mod) => mod.combination && mod.name.includes('touched'))
              .map((mod) => getItem(mod, 'boss'))}
          </div>
        </div>
        <div className="menu-bottom">
          {/* <div className="menu-bottom_text">
            <p>{selectedMods.length}/4</p>
            {selectedMods.length > 0 &&
              selectedMods.map((mod, index) => (
                <p key={`${index}${mod}`} className="menu-bottom_mod">
                  {mod}
                </p>
              ))}
          </div> */}
          <div
            className={
              showMenu ? 'menu-bottom_filter' : 'menu-bottom_filter hidden'
            }
          >
            <BsSearch style={{ fill: 'white' }} />
            <input
              type="text"
              value={filterText}
              onChange={handleSearch}
              placeholder="Highlight mods..."
            />
          </div>
          <div className="menu-bottom_button" onClick={handleSelect}>
            <h1>Select</h1>
            <BsArrowRightShort />
          </div>
        </div>
      </div>
    </StyledModSelector>
  );
};

export default ModSelector;
