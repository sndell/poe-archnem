import React from 'react';
import styled from 'styled-components';
import { GoTrashcan } from 'react-icons/go';
import { VscEdit } from 'react-icons/vsc';
import { GlobalContext } from '../../context';
// import { TiArrowSortedUp, TiArrowSortedDown } from 'react-icons/ti';

const StyledCombination = styled.div`
  .selected {
    padding: 0 !important;
    border: 2px solid black !important;

    h1:first-child {
      text-shadow: 0.5px 0 0 black;
    }
  }

  .combination {
    border: 1px solid black;
    padding: 1px;
    border-radius: 4px;
    margin-bottom: 8px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .combination-details {
    display: flex;
    align-items: center;

    svg:first-child {
      margin-left: 8px;
    }

    h1 {
      padding: 0 8px;
      /* font-size: 16px; */
    }
  }

  .combination-management {
    display: flex;
    align-items: center;

    svg {
      margin-right: 8px;
    }

    h1 {
      margin-right: 8px;
      padding: 4px 8px;
      border: 1px solid black;
      border-radius: 2px;
      cursor: pointer;
    }
  }
`;

const Combination = ({ combination }) => {
  const {
    state: {
      combinations: { selected },
    },
    dispatch,
  } = GlobalContext();

  // useEffect(() => {
  //   console.log(combination);
  // }, []);

  // const handleUp = () => {};
  // const handleDown = () => {};

  const handleSelect = () => {
    if (selected.includes(combination.id))
      dispatch({ type: 'COMBINATIONS_DESELECT', payload: combination.id });
    else dispatch({ type: 'COMBINATIONS_SELECT', payload: combination.id });
  };

  const handleView = (e) => {
    e.stopPropagation();
    console.log('vuew');
  };

  return (
    <StyledCombination>
      <div
        className={
          selected.includes(combination.id)
            ? 'combination selected'
            : 'combination'
        }
        onClick={handleSelect}
      >
        <div className="combination-details">
          {/* <TiArrowSortedUp className="order-up" onClick={handleUp} />
        <TiArrowSortedDown className="order-down" onClick={handleDown} /> */}
          <h1>{combination.name}</h1>
          {combination.items.map((mod, index) => (
            <img
              src={require(`../../data/images/${mod.imgName}`)}
              alt={mod.name}
              height={40}
              key={index}
            />
          ))}
        </div>
        <div className="combination-management">
          <VscEdit />
          <GoTrashcan />
          <h1 onClick={handleView}>view</h1>
        </div>
      </div>
    </StyledCombination>
  );
};

export default Combination;
