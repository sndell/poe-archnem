import React from 'react';
import styled from 'styled-components';

const StyledStatsItem = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: center;

  .stats-mod {
    display: flex;
    align-items: center;

    h1 {
      margin-left: 4px;
    }
  }

  .stats-needed {
    text-align: end;
  }
`;

const StatsItem = () => {
  return (
    <StyledStatsItem>
      <div className="stats-mod">
        <img
          src={require('../../data/images/juggernaut.png')}
          alt="juggernaut"
          height={32}
        />
        <h1>juggernaut</h1>
      </div>
      <div className="stats-needed">
        <h1>5</h1>
      </div>
    </StyledStatsItem>
  );
};

export default StatsItem;
