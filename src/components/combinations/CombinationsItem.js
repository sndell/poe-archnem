import React from 'react';
import styled from 'styled-components';

const StyledCombinationsItem = styled.div`
  background-color: ${({ theme }) => theme.colors.secondary};
  margin: 8px;
  border-radius: 8px;

  .details {
    display: flex;
    align-items: center;

    h1 {
      color: ${({ theme }) => theme.colors.text.primary};
      margin: 0 8px;
    }
  }
`;

const CombinationsItem = ({ combination }) => {
  return (
    <StyledCombinationsItem>
      <div className="details">
        <h1>{combination.name}</h1>
        {combination.mods.map((item) => (
          <img
            src={require(`../../data/images/${item.imgName}`)}
            key={`${combination.id}-${item.name}`}
            alt={item.name}
            height={40}
          />
        ))}
      </div>
      <div className="actions"></div>
    </StyledCombinationsItem>
  );
};

export default CombinationsItem;
