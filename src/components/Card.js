import React from 'react';

const Card = ({ task }) => {
  const { name } = task;
  return <div>{name}</div>;
};

export default Card;
