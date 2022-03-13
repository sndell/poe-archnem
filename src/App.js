import GlobalStyles from './styled/Global';
import test from './data/mods';
import { useEffect, useState } from 'react';
import styled from 'styled-components';

import Item from './components/Item';

const StyledHome = styled.div`
  .item-container {
    margin-left: 8px;
    display: flex;
  }
`;

const App = () => {
  const [modList, setModList] = useState(test.map((item) => item.name));
  const [selectedMods, setSelectedMods] = useState();
  const [needed, setNeeded] = useState([]);

  const addNeeded = (item) => {
    setNeeded((old) => [...old, item]);
  };

  const getNeeded = () => {
    const newArray = needed.map((item) => {
      const count = needed.filter((name) => name === item).length;
      return `${count}x ${item}`;
    });
    const uniq = [...new Set(newArray)];
    return uniq;
  };

  const removeNeeded = (item) => {
    var index = needed.indexOf(item);
    needed.splice(index, 1);
    setNeeded(needed);
    console.log(index);
  };

  useEffect(() => {
    console.log(modList);
  }, []);

  const handleSelect = (e) => {
    setSelectedMods(test.filter((item) => item.name === e.target.value));
    setNeeded([]);
  };

  return (
    <>
      <GlobalStyles />
      <StyledHome>
        <h1>yelo</h1>
        <select name="mods" id={selectedMods} onChange={handleSelect}>
          {modList.map((name, index) => (
            <option value={name} key={index}>
              {name}
            </option>
          ))}
        </select>
        <div className="item-container">
          {selectedMods &&
            selectedMods.map((item) => (
              <Item
                item={item}
                key={item.name}
                add={addNeeded}
                remove={removeNeeded}
                doesHave={false}
              />
            ))}
        </div>
        <div className="needed-stats">
          {Array.isArray(needed) &&
            needed.length > 0 &&
            getNeeded().map((item, index) => <h1 key={index}>{item}</h1>)}
        </div>
      </StyledHome>
    </>
  );
};

export default App;
