import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { GlobalContext } from '../context';
import AssignedStatsItem from './AssignedStatsItem';

const StyledAssignedStats = styled.div`
  /* height: calc(100vh - 40px); */
  /* height: 100%; */
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: ${({ theme }) => theme.colors.primary};
  /* background-color: #0e0e0f; */
  min-width: 272px;
  border-radius: 8px;
  overflow: hidden;
  /* border-left: 2px solid ${({ theme }) => theme.colors.accent}; */

  .stats-main {
    overflow-y: auto;
    .drop,
    .recipie,
    .drop {
    }

    .drop {
      color: ${({ theme }) => theme.colors.text.mods.drop};
    }

    .recipie {
      color: ${({ theme }) => theme.colors.text.mods.recipie};
    }

    .boss {
      color: ${({ theme }) => theme.colors.text.mods.boss};
    }
  }

  .stats-bottom {
    min-height: 40px;
    border-top: 2px solid ${({ theme }) => theme.colors.accent};
    background-color: ${({ theme }) => theme.colors.secondary};
    display: flex;
    justify-content: center;
    padding: 0 8px;
    align-items: center;

    .stats-bottom-button {
      background-color: ${({ theme }) => theme.colors.accent};
      padding: 4px 8px;
      cursor: pointer;
      border-radius: 8px;
    }

    /* .filter {
      display: flex;
      h1 {
        color: ${({ theme }) => theme.colors.text.primary};
      }
    } */
  }
`;

const AssignedStats = () => {
  const {
    state: { explorer },
    dispatch,
  } = GlobalContext();

  const [showAssigned, setShowAssigned] = useState(false);

  useEffect(() => {
    dispatch({
      type: 'COMBINATIONS_GET-NEEDED',
      payload: explorer.combination,
    });
  }, [explorer, dispatch]);

  const handleShowAssigned = (value) => {
    setShowAssigned(value);
  };

  if (!showAssigned) {
    return (
      <StyledAssignedStats>
        <div className="stats-main">
          <div className="drop">
            {explorer.combination.needed
              .filter((item) => !item.combination)
              .map((item) => (
                <AssignedStatsItem
                  item={item}
                  key={`needed-${item.name}`}
                  assigned={showAssigned}
                />
              ))}
          </div>
          <div className="recipie">
            {explorer.combination.needed
              .filter(
                (item) => item.combination && !item.name.includes('touched')
              )
              .map((item) => (
                <AssignedStatsItem
                  item={item}
                  key={`needed-${item.name}`}
                  assigned={showAssigned}
                />
              ))}
          </div>
          <div className="boss">
            {explorer.combination.needed
              .filter((item) => item.name.includes('touched'))
              .map((item) => (
                <AssignedStatsItem
                  item={item}
                  key={`needed-${item.name}`}
                  assigned={showAssigned}
                />
              ))}
          </div>
        </div>
        <div className="stats-bottom">
          <h1
            className="stats-bottom-button"
            onClick={() => handleShowAssigned(true)}
          >
            Assigned
          </h1>
          {/* <div className="filter">
          <h1>Drop only</h1>
          <input type="checkbox" name="" id="" />
        </div> */}
        </div>
        {/* {menu.owned.active && <OwnedMenu />} */}
      </StyledAssignedStats>
    );
  } else {
    return (
      <StyledAssignedStats>
        <div className="stats-main">
          <div className="drop">
            {explorer.combination.assigned
              .filter((item) => !item.combination)
              .map((item) => (
                <AssignedStatsItem
                  item={item}
                  key={`needed-${item.name}`}
                  assigned={showAssigned}
                />
              ))}
          </div>
          <div className="recipie">
            {explorer.combination.assigned
              .filter(
                (item) => item.combination && !item.name.includes('touched')
              )
              .map((item) => (
                <AssignedStatsItem
                  item={item}
                  key={`needed-${item.name}`}
                  assigned={showAssigned}
                />
              ))}
          </div>
          <div className="boss">
            {explorer.combination.assigned
              .filter((item) => item.name.includes('touched'))
              .map((item) => (
                <AssignedStatsItem
                  item={item}
                  key={`needed-${item.name}`}
                  assigned={showAssigned}
                />
              ))}
          </div>
        </div>
        <div className="stats-bottom">
          <h1
            className="stats-bottom-button"
            onClick={() => handleShowAssigned(false)}
          >
            Available
          </h1>
          {/* <div className="filter">
          <h1>Drop only</h1>
          <input type="checkbox" name="" id="" />
        </div> */}
        </div>
        {/* {menu.owned.active && <OwnedMenu />} */}
      </StyledAssignedStats>
    );
  }
};

export default AssignedStats;
