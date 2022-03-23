import React from 'react';
import styled from 'styled-components';

const StyledSidebarMenu = styled.div`
  position: absolute;
  bottom: 58px;
  /* width: 256px; */
  width: 140px;
  background-color: ${({ theme }) => theme.colors.tertiary};
  border: 1px solid #ffffff02;
  padding: 8px;
  border-radius: 8px;

  .option {
    padding: 4px 0;
    color: ${({ theme }) => theme.colors.text.primary};
    display: flex;
    align-items: center;
    justify-content: space-between;

    h1 {
      cursor: pointer;
      user-select: none;
    }

    .checkbox {
      display: flex;
      align-items: center;
      justify-content: center;

      input {
        position: absolute;
        right: 8px;
        margin: 0;
        z-index: 1;
        opacity: 0;
        width: 16px;
        height: 16px;
        cursor: pointer;

        &:checked ~ .checkmark {
          background-color: ${({ theme }) => theme.colors.accent};
        }
      }

      .checkmark {
        position: absolute;
        border-radius: 4px;
        right: 8px;
        height: 16px;
        width: 16px;
        background-color: ${({ theme }) => theme.colors.primary};
      }
    }
  }
`;

const SidebarMenu = ({ filter, handleFilter, currentRef }) => {
  return (
    <StyledSidebarMenu ref={currentRef}>
      <div className="option">
        <h1 onClick={() => handleFilter({ ...filter, drop: !filter.drop })}>
          Drop
        </h1>
        <div className="checkbox">
          <input
            type="checkbox"
            checked={filter.drop}
            onChange={() => handleFilter({ ...filter, drop: !filter.drop })}
            key="filter-drop"
          />
          <span className="checkmark"></span>
        </div>
      </div>
      <div className="option">
        <h1
          onClick={() => handleFilter({ ...filter, recipie: !filter.recipie })}
        >
          Recipie
        </h1>
        <div className="checkbox">
          <input
            type="checkbox"
            checked={filter.recipie}
            onChange={() =>
              handleFilter({ ...filter, recipie: !filter.recipie })
            }
            key="filter-recipie"
          />
          <span className="checkmark"></span>
        </div>
      </div>
      <div className="option">
        <h1 onClick={() => handleFilter({ ...filter, boss: !filter.boss })}>
          Boss
        </h1>
        <div className="checkbox">
          <input
            type="checkbox"
            checked={filter.boss}
            onChange={() => handleFilter({ ...filter, boss: !filter.boss })}
            key="filter-boss"
          />
          <span className="checkmark"></span>
        </div>
      </div>
    </StyledSidebarMenu>
  );
};

export default SidebarMenu;
