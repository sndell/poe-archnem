import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import StatsItem from './StatsItem';
import { GlobalContext } from '../../context';

const StyledStats = styled.div`
  border-left: 1px solid black;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  /* overflow: hidden; */

  .stats-list {
    overflow-y: auto;
    padding: 8px;
    display: flex;
    flex-direction: column;
  }

  .stats-bottom {
    border-top: 1px solid black;
    display: flex;
    align-items: center;
    /* justify-content: space-between; */
    justify-content: center;
    gap: 16px;
    padding: 8px;

    .owned-toggle {
      padding: 4px 8px;
      border: 1px solid black;
      cursor: pointer;
    }

    .drop-toggle {
      margin-left: auto;
      display: flex;

      input {
        margin-left: 8px;
        cursor: pointer;
      }
    }
  }
`;

const Stats = () => {
  const {
    state: {
      combinations: { selected },
      owned: { all },
      needed,
    },
    dispatch,
  } = GlobalContext();

  const [dropOnly, setDropOnly] = useState(false);
  const [showOwned, setShowOwned] = useState(false);

  useEffect(() => {
    dispatch({ type: 'GET_NEEDED', payload: selected });
  }, [selected, dispatch]);

  // useEffect(() => {
  //   console.log(needed.filter((item) => item.combination));
  //   console.log(needed.recipie);
  //   console.log();
  // }, [needed]);

  const getItem = (item) => {
    return (
      <StatsItem item={item} key={`stat-${item.name}`} owned={showOwned} />
    );
  };

  const handleDropOnly = () => {
    setDropOnly((old) => !old);
  };

  const handleShowOwned = () => {
    setShowOwned((old) => !old);
  };

  return (
    <StyledStats>
      {!showOwned ? (
        <div className="stats-list">
          {!dropOnly && (
            <div className="recipie">
              {needed
                .filter((item) => item.combination)
                .map((item) => getItem(item))}
            </div>
          )}

          <div className="drop">
            {needed
              .filter((item) => !item.combination)
              .map((item) => getItem(item))}
          </div>
        </div>
      ) : (
        <div className="stats-list">
          <div className="container">{all.map((item) => getItem(item))}</div>
        </div>
      )}

      <div className="stats-bottom">
        {!showOwned ? (
          <h1 className="owned-toggle" onClick={handleShowOwned}>
            owned
          </h1>
        ) : (
          <h1 className="owned-toggle" onClick={handleShowOwned}>
            needed
          </h1>
        )}

        {!showOwned && (
          <div className="drop-toggle">
            <h1>drop only</h1>
            <input
              type="checkbox"
              // value={dropOnly}
              onChange={handleDropOnly}
              checked={dropOnly}
            />
          </div>
        )}
      </div>
    </StyledStats>
  );
};

export default Stats;
