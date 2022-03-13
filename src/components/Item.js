import React, { useEffect, useState } from 'react';
import { BsChevronDown, BsChevronUp } from 'react-icons/bs';
import styled from 'styled-components';

const StyledItem = styled.div`
  margin-right: 8px;
  .hidden {
    /* display: none !important; */
    height: 0;
    overflow: hidden;
  }

  .item {
    display: flex;
    flex-direction: column;

    .item-details {
      height: 100%;
      display: flex;
      align-items: center;

      svg {
        cursor: pointer;
        margin: 0 4px;
      }

      .img-container {
        margin: 0 4px;
        display: flex;
        align-items: center;
      }
    }

    .item-combination-container {
      display: flex;

      .item-combination-line-container {
        width: 24px;
        display: flex;
        justify-content: center;
        cursor: pointer;

        .item-combination-line {
          width: 1px;
          background-color: black;
        }
      }
    }
  }
`;

const Item = (props) => {
  const { item, add, remove, doesHave } = props;
  const [isOpen, setIsOpen] = useState(true);
  const [have, setHave] = useState(doesHave);

  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    setHave(doesHave);
  }, [doesHave]);

  useEffect(() => {
    if (!have && !item.combination) {
      add(item.name);
    }
    if (have && !item.combination) remove(item.name);
  }, [have]);

  const toggleHave = () => {
    setHave(!have);
  };

  return (
    <StyledItem>
      <div className="item">
        <div className="item-details">
          {item.combination ? (
            isOpen ? (
              <BsChevronDown
                style={{ color: 'black', fontSize: '16px' }}
                onClick={toggleOpen}
              />
            ) : (
              <BsChevronUp
                style={{ color: 'black', fontSize: '16px' }}
                onClick={toggleOpen}
              />
            )
          ) : (
            <span style={{ width: '24px' }} />
          )}
          <div className="img-container">
            <img
              src={require(`../data/images/${item.imgName}`)}
              alt={item.name}
              height={24}
              width={24}
            />
          </div>
          <h1 onClick={toggleHave}>{have ? <s>{item.name}</s> : item.name}</h1>
        </div>
        {item.combination && (
          <div
            className={`${
              isOpen
                ? 'item-combination-container'
                : 'item-combination-container hidden'
            } `}
          >
            <div
              className="item-combination-line-container"
              onClick={toggleOpen}
            >
              <div className="item-combination-line" onClick={toggleOpen} />
            </div>

            <div className="item-combination">
              {item.combination.map((item) => (
                <Item
                  item={item}
                  key={item.name}
                  add={add}
                  remove={remove}
                  doesHave={have}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </StyledItem>
  );
};

export default Item;
