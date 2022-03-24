import React, { useRef, useState, useEffect } from 'react';
import styled from 'styled-components';
import { GlobalContext } from '../../context';
import SidebarItem from './SidebarItem';
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from 'react-icons/md';
import SidebarMenu from './SidebarMenu';
import OwnedMenu from '../ownedmenu/OwnedMenu';

const StyledSidebar = styled.div`
  min-width: 272px;
  background-color: ${({ theme }) => theme.colors.primary};
  margin: 8px 8px 8px 0;
  border-radius: 8px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  .sidebar-main {
    overflow-y: auto;
    padding: 0 8px 0 4px;

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

  .sidebar-bottom {
    min-height: 40px;
    padding: 0 8px;
    /* margin-top: 2px; */
    border-top: 2px solid ${({ theme }) => theme.colors.accent};
    background-color: ${({ theme }) => theme.colors.secondary};
    display: flex;
    align-items: center;
    justify-content: space-between;

    .owned {
      background-color: ${({ theme }) => theme.colors.accent};
      padding: 4px 8px 4px 6px;
      border-radius: 8px;
      margin-top: 1px;
      cursor: pointer;
      user-select: none;
    }

    .filter {
      display: flex;
      justify-content: space-between;
      width: 104px;
      background-color: ${({ theme }) => theme.colors.tertiary};
      color: ${({ theme }) => theme.colors.text.primary};
      padding: 4px 6px;
      margin-top: 1px;
      cursor: pointer;
      user-select: none;

      ${(props) =>
        !props.active
          ? 'border-radius: 8px;'
          : 'border-bottom-left-radius: 8px; border-bottom-right-radius: 8px;'}

      svg {
        padding: 0 2px 0 4px;
      }
    }
  }
`;

const Sidebar = () => {
  const {
    state: { items, menu },
    dispatch,
  } = GlobalContext();

  const [menuActive, setMenuActive] = useState(false);
  const [filter, setFilter] = useState({
    drop: true,
    recipie: false,
    boss: false,
  });
  const ref = useRef(null);
  const menuRef = useRef(null);

  const handleMenu = () => {
    setMenuActive((old) => !old);
  };

  const handleOpen = () => {
    dispatch({
      type: 'MENU_SET-OWNED',
      payload: { active: true },
    });
  };

  const handleFilter = (filter) => {
    console.log(filter);
    setFilter(filter);
  };

  useEffect(() => {
    const checkIfClickedOutside = (e) => {
      if (
        menuActive &&
        ref.current &&
        menuRef.current &&
        !ref.current.contains(e.target) &&
        !menuRef.current.contains(e.target)
      )
        setMenuActive(false);
    };
    document.addEventListener('mousedown', checkIfClickedOutside);
    return () => {
      document.removeEventListener('mousedown', checkIfClickedOutside);
    };
  }, [menuActive]);

  return (
    <StyledSidebar active={menuActive}>
      <div className="sidebar-main">
        {filter.drop && (
          <div className="drop">
            {items.needed
              .filter((item) => !item.combination)
              .map((item) => (
                <SidebarItem item={item} key={`needed-${item.name}`} />
              ))}
          </div>
        )}
        {filter.recipie && (
          <div className="recipie">
            {items.needed
              .filter(
                (item) => item.combination && !item.name.includes('touched')
              )
              .map((item) => (
                <SidebarItem item={item} key={`needed-${item.name}`} />
              ))}
          </div>
        )}
        {filter.boss && (
          <div className="boss">
            {items.needed
              .filter((item) => item.name.includes('touched'))
              .map((item) => (
                <SidebarItem item={item} key={`needed-${item.name}`} />
              ))}
          </div>
        )}
      </div>
      <div className="sidebar-bottom">
        {menuActive && (
          <SidebarMenu
            filter={filter}
            handleFilter={handleFilter}
            currentRef={menuRef}
          />
        )}
        <div className="filter" onClick={handleMenu} ref={ref}>
          <h1>Filter</h1>
          {menuActive ? <MdKeyboardArrowDown /> : <MdKeyboardArrowUp />}
        </div>
        <h1 className="owned" onClick={handleOpen}>
          Owned
        </h1>
      </div>
      {menu.owned.active && <OwnedMenu />}
    </StyledSidebar>
  );
};

export default Sidebar;
