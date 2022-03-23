import React, { useRef } from 'react';
import ContentEditable from 'react-contenteditable';
import styled from 'styled-components';
import { TiArrowSortedDown, TiArrowSortedUp } from 'react-icons/ti';
import { BsTrashFill } from 'react-icons/bs';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import { MdEdit } from 'react-icons/md';
import { GlobalContext } from '../../context';

const StyledCombinationsItem = styled.div`
  background-color: ${({ theme }) => theme.colors.secondary};
  margin: 8px;
  border-radius: 8px;
  overflow: hidden;
  display: flex;
  justify-content: space-between;

  .details {
    display: flex;
    align-items: center;

    .name-container {
      max-width: 272px;
      overflow: hidden;
      color: ${({ theme }) => theme.colors.text.primary};
      margin: 0 8px;

      div {
        outline: 0;
      }
    }
  }

  .actions {
    display: flex;
    align-items: center;
    padding-left: 8px;

    .action-buttons {
      background-color: ${({ theme }) => theme.colors.tertiary};
      display: flex;
      align-items: center;
      /* gap: 8px; */
      border-radius: 8px;
      overflow: hidden;

      svg {
        cursor: pointer;
        user-select: none;
        color: ${({ theme }) => theme.colors.text.primary};
        padding-right: 8px;
      }

      svg:nth-child(1) {
        padding-left: 8px;
      }

      h1 {
        background-color: ${({ theme }) => theme.colors.accent};
        border-radius: 8px;
        padding: 4px 6px;
        cursor: pointer;
        user-select: none;
      }
    }

    .actions-position {
      display: flex;
      flex-direction: column;
      margin: 0 4px;

      svg {
        font-size: 14px;
        color: ${({ theme }) => theme.colors.text.primary};
        cursor: pointer;
        user-select: none;
      }
    }
  }
`;

const CombinationsItem = ({ combination }) => {
  const { dispatch } = GlobalContext();
  const name = useRef(combination.name);
  const input = useRef(null);
  const handleSelect = () => {
    dispatch({
      type: 'COMBINATIONS_SET-ACTIVE',
      payload: { id: combination.id, active: !combination.active },
    });
  };

  const handleOrder = (direction) => {
    dispatch({
      type: 'COMBINATIONS_SET-ORDER',
      payload: { id: combination.id, direction },
    });
  };

  const handleNameChange = () => {
    if (
      input.current.innerText.trim().length > 0 &&
      input.current.innerText.trim().length <= 24
    )
      name.current = input.current.innerText.trim();
    else if (input.current.innerText.length > 24) {
      input.current.blur();
      input.current.focus();
    }
  };

  const handleNameEnd = () => {
    dispatch({
      type: 'COMBINATIONS_SET-NAME',
      payload: { id: combination.id, text: name.current },
    });
  };

  const handleKeyDown = (e) => {
    if (e.keyCode === 13) {
      e.preventDefault();
      input.current.blur();
    }
  };

  const handleDelete = () => {
    dispatch({ type: 'COMBINATIONS_DELETE', payload: combination.id });
  };
  const handleEdit = () => {
    dispatch({
      type: 'MENU_SET-MOD',
      payload: { active: true, id: combination.id, selected: combination.mods },
    });
  };

  return (
    <StyledCombinationsItem>
      <div className="details">
        <div className="name-container">
          <ContentEditable
            html={name.current}
            onKeyDown={handleKeyDown}
            onBlur={handleNameEnd}
            onChange={handleNameChange}
            innerRef={input}
          />
        </div>
        {combination.mods.map((item) => (
          <img
            src={require(`../../data/images/${item.imgName}`)}
            key={`${combination.id}-${item.name}`}
            alt={item.name}
            height={40}
          />
        ))}
      </div>
      <div className="actions">
        <div className="action-buttons">
          <BsTrashFill onClick={handleDelete} />
          <MdEdit onClick={handleEdit} />
          {combination.active ? (
            <AiFillEyeInvisible onClick={handleSelect} />
          ) : (
            <AiFillEye onClick={handleSelect} />
          )}
          <h1>View</h1>
        </div>
        <div className="actions-position">
          <TiArrowSortedUp onClick={() => handleOrder('up')} />
          <TiArrowSortedDown onClick={() => handleOrder('down')} />
        </div>
      </div>
    </StyledCombinationsItem>
  );
};

export default CombinationsItem;
