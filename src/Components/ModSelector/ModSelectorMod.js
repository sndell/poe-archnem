import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

const StyledModSelectorMod = styled.div`
  .selected {
    background-color: #ffffff !important;
    color: black;
  }

  .filtered {
    border: 1px solid white !important;
    padding: 0px !important;
    margin: 1px !important;
  }

  .mod {
    display: flex;
    /* border: 2px solid #111112; */
    align-items: center;
    padding: 2px;

    h1 {
      margin-left: 4px;
    }

    &:hover {
      background-color: #2c2c31;
      cursor: pointer;
    }
  }
`;

const ModSelectorMod = (props) => {
  const { mod, add, remove, selected, filtered } = props;
  const [isSelected, setIsSelected] = useState(false);

  const handleSelect = (mod) => {
    if (isSelected) {
      remove(mod);
      setIsSelected(false);
    } else if (!isSelected && selected.length < 4) {
      setIsSelected(true);
      add(mod);
    }
  };
  return (
    <StyledModSelectorMod onClick={() => handleSelect(mod.name)}>
      <div
        className={
          isSelected
            ? filtered.includes(mod.name)
              ? 'mod selected filtered'
              : 'mod selected'
            : filtered.includes(mod.name)
            ? 'mod filtered'
            : 'mod'
        }
      >
        <img
          src={require(`../../data/images/${mod.imgName}`)}
          alt={mod.name}
          height={32}
        />
        <h1>{mod.name}</h1>
      </div>
    </StyledModSelectorMod>
  );
};

export default ModSelectorMod;
