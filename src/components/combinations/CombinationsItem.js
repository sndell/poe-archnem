import React, { useEffect, useRef, useState } from 'react';
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
  display: flex;
  justify-content: space-between;

  .details {
    display: flex;
    align-items: center;

    input {
      color: ${({ theme }) => theme.colors.text.primary};
      font-size: 1rem;
      background-color: rgba(0, 0, 0, 0);
      border: none;
      outline: none;
      margin: 0 8px;
      height: 16px;
      width: 100%;
      font-weight: 500;
    }

    h1 {
      color: ${({ theme }) => theme.colors.text.primary};
      margin: 0 8px;
    }
  }

  .actions {
    display: flex;
    align-items: center;

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
  const input = useRef(null);
  const [inputText, setInputText] = useState(combination.name);
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
  const handleNameChange = (e) => {
    setInputText(e.target.value);
  };
  const handleNameEnd = () => {
    if (inputText.length > 0)
      dispatch({
        type: 'COMBINATIONS_SET-NAME',
        payload: { id: combination.id, text: inputText },
      });
  };
  useEffect(() => {
    // input.current.style.width = `${(inputText.length + 1) * 8}px`;
  }, [inputText]);

  return (
    <StyledCombinationsItem>
      <div className="details">
        {/* <input
          type="text"
          value={inputText}
          onChange={handleNameChange}
          onBlur={handleNameEnd}
          ref={input}
        /> */}
        <h1 contentEditable={combination.name} />
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
          <MdEdit />
          <BsTrashFill />
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
