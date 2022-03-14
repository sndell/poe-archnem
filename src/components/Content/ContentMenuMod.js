import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import styled from 'styled-components';

const StyledContentMenuMod = styled.div`
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
    cursor: pointer;
    align-items: center;
    padding: 2px;
    h1 {
      margin-left: 4px;
    }
    &:hover {
      background-color: #2c2c31;
    }
  }
`;

const ContentMenuMod = (props) => {
  const { mod, filtered, selected, add, remove } = props;
  const [isSelected, setIsSelected] = useState(false);

  useEffect(() => {
    setIsSelected(selected.includes(mod.name));
  }, [selected]);

  const handleSelect = (mod) => {
    if (isSelected) {
      remove(mod);
    } else if (!isSelected && selected.length < 4) {
      add(mod);
    }
  };

  return (
    <StyledContentMenuMod onClick={() => handleSelect(mod.name)}>
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
    </StyledContentMenuMod>
  );
};

export default ContentMenuMod;
