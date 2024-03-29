import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { GrClose } from 'react-icons/gr';
import { BiSearch } from 'react-icons/bi';
import OwnedMenuItem from './OwnedMenuItem';
import { GlobalContext } from '../../context';

const StyledOwnedMenu = styled.div`
  background-color: #000000b4;
  position: absolute;
  left: 0;
  top: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;

  .menu {
    background-color: ${({ theme }) => theme.colors.primary};
    border-radius: 8px;
    border: 1px solid #ffffff00;
    overflow: hidden;

    .menu-top {
      height: 32px;
      /* background-color: ${({ theme }) => theme.colors.secondary};
    border-bottom: 2px solid ${({ theme }) => theme.colors.accent}; */
      display: flex;
      align-items: center;
      background-color: ${({ theme }) => theme.colors.secondary};
      border-bottom: 2px solid ${({ theme }) => theme.colors.accent};

      input {
        /* font-size: 13px; */
        background-color: rgba(0, 0, 0, 0);
        color: ${({ theme }) => theme.colors.text.primary};
        width: 100%;
        height: 32px;
        padding: 0;
        margin: 0;
        border: 0;
        outline: 0;
        &::placeholder {
          color: #c2c2c5;
        }
      }
      svg {
        font-size: 20px;
        padding: 0 8px;
        color: ${({ theme }) => theme.colors.text.primary};
      }
    }

    .menu-main {
      display: grid;
      padding: 8px;
      grid-template-columns: repeat(4, 1fr);
    }

    .menu-bottom {
      display: flex;
      justify-content: center;
      gap: 8px;
      padding-bottom: 4px;

      svg {
        background-color: ${({ theme }) => theme.colors.accent};
        padding: 4px 6px;
        border-radius: 8px;
        cursor: pointer;
        user-select: none;
      }
    }
  }
`;

const OwnedMenu = () => {
  const {
    state: { mods },
    dispatch,
  } = GlobalContext();

  const [inputText, setInputText] = useState('');
  const input = useRef(null);

  const handleClose = () => {
    dispatch({
      type: 'MENU_SET-OWNED',
      payload: { active: false },
    });
  };

  const handleInputText = (e) => {
    setInputText(e.target.value);
  };

  useEffect(() => {
    if (inputText.length > 0) {
      const found = mods.filter((mod) =>
        mod.name.toLowerCase().includes(inputText.toLowerCase())
      );
      dispatch({ type: 'MENU_SET-OWNED-HIGHLIGHTED', payload: found });
    } else dispatch({ type: 'MENU_SET-OWNED-HIGHLIGHTED', payload: [] });
  }, [inputText, dispatch, mods]);

  return (
    <StyledOwnedMenu>
      <div className="menu">
        <div className="menu-top">
          <BiSearch />
          <input
            type="text"
            value={inputText}
            onChange={handleInputText}
            placeholder="highlight mods..."
            ref={input}
            autoFocus
          />
        </div>
        <div className="menu-main">
          {mods
            .filter((mod) => mod.name.includes('touched'))
            .map((mod) => (
              <OwnedMenuItem mod={mod} key={`boss-${mod.name}`} type="boss" />
            ))}
          {mods
            .filter((mod) => mod.combination && !mod.name.includes('touched'))
            .map((mod) => (
              <OwnedMenuItem
                mod={mod}
                key={`recipie-${mod.name}`}
                type="recipie"
              />
            ))}
          {mods
            .filter((mod) => !mod.combination)
            .map((mod) => (
              <OwnedMenuItem mod={mod} key={`drop-${mod.name}`} type="drop" />
            ))}
        </div>
        <div className="menu-bottom">
          <GrClose onClick={handleClose} />
        </div>
      </div>
    </StyledOwnedMenu>
  );
};

export default OwnedMenu;
