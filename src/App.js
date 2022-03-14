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
  const modList = test.map((item) => item.name);
  const [selectedMods, setSelectedMods] = useState();
  const [needed, setNeeded] = useState([]);
  const [neededList, setNeededList] = useState([]);

  const addNeeded = (item) => {
    setNeeded((old) => [...old, item]);
  };

  const getNeeded = () => {
    const uniq = [...new Set(needed)];
    const test = {};
    const test2 = uniq.map((yes) => {
      test[yes] = needed.filter((name) => name === yes).length;
      return null;
    });
    console.log(test2);

    console.log(Object.entries(test));
    setNeededList(Object.entries(test).sort());
  };

  useEffect(() => {
    const uniq = [...new Set(needed)];
    const test = {};
    const test23 = uniq.map((yes) => {
      test[yes] = needed.filter((name) => name === yes).length;
      return null;
    });
    console.log(test23);
    console.log(Object.entries(test));
    setNeededList(Object.entries(test).sort());
  }, [needed]);

  const removeNeeded = (item) => {
    var index = needed.indexOf(item);
    needed.splice(index, 1);
    setNeeded(needed);
    getNeeded();
  };

  // useEffect(() => {
  //   console.log(modList);
  // }, []);

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
          {Array.isArray(neededList) &&
            neededList.length > 0 &&
            neededList.map((item, index) => (
              <h1 key={index}>{`${item[1]}x ${item[0]}`}</h1>
            ))}
        </div>
      </StyledHome>
    </>
  );
};

export default App;
