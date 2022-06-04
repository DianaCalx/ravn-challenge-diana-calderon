import React, { useState, useEffect } from 'react';
import { getTechColor } from '../helpers/getTechColor';
import { getColorToDate, getDate } from '../helpers/getAllAboutDate';
import { ReactComponent as Clip } from '../assets/clip.svg';
import { ReactComponent as Diagram } from '../assets/diagram.svg';
import { ReactComponent as Comment } from '../assets/comment.svg';
import { ReactComponent as Ellipsis } from '../assets/ellipsis.svg';
import { ReactComponent as Clock } from '../assets/clock.svg';
import { splitWords } from '../helpers/splitWords';
import Selection from './Selection';
import useTaskManager from '../hooks/useTaskManager';
import estimates from '../helpers/estimates';

import './Card.scss';

function Card({ task, layout }) {
  const { name, estimate, dueDate, tags, user, id } = task;
  const { idSelectedEdit } = useTaskManager();
  const [selection, setSelection] = useState(false);
  const initials = splitWords(user.fullName);

  const updateSelection = () => {
    setSelection(!selection);
  };

  useEffect(() => {
    setSelection(`task-${id}` === idSelectedEdit);
  }, [id, idSelectedEdit]);

  return (
    <>
      {layout === 'grid' && (
        <div className="card">
          {selection && <Selection setSelection={setSelection} task={task} />}
          <div className="card__title">
            <p className="card_p">{name}</p>
            <Ellipsis id={`task-${id}`} onClick={updateSelection} className="card__ellipsis" />
          </div>

          <div className="card__data">
            <p className="card_p">{estimates.find(est => est.value === estimate).name}</p>
            <div className={`card__date ${getColorToDate(dueDate)}`}>
              <Clock />
              <p className="card_p">{getDate(dueDate)}</p>
            </div>
          </div>

          <div className="card__labels">
            {tags.map(label => (
              <div key={label} className="card__tech">
                <div style={{ backgroundColor: getTechColor(label), opacity: 0.3 }} />
                <p className="card_p" style={{ color: getTechColor(label) }}>
                  {label}
                </p>
              </div>
            ))}
          </div>

          <div className="card__identifier">
            <p className="card__iniciales card_p">{initials}</p>
            <div className="card__icons">
              <Clip />
              <div className="card__icon">
                <p className="card_p">5</p>
                <Diagram />
              </div>
              <div className="card__icon">
                <p className="card_p">3</p>
                <Comment />
              </div>
            </div>
          </div>
        </div>
      )}

      {layout === 'list' && (
        <div className="card__list">
          {selection && <Selection setSelection={setSelection} task={task} />}
          <div className="card__list__title border">
            <p className="card_p">{name}</p>
            <div className="card__icons__list">
              <div className="card__icon">
                <p className="card_p">5</p>
                <Diagram />
              </div>
              <div className="card__icon">
                <p className="card_p">3</p>
                <Comment />
              </div>
            </div>
          </div>
          <div className="card__labels__list border">
            <div className="card__tech">
              <div style={{ backgroundColor: getTechColor(tags[0]), opacity: 0.3 }} />
              <p className="card_p" style={{ color: getTechColor(tags[0]) }}>
                {tags[0]}
              </p>
            </div>
            {tags.length > 1 && <div className="card__quantity">+{tags.length - 1}</div>}
          </div>

          <div className="card__data__list border">
            <p className="card_p">{estimates.find(est => est.value === estimate).name}</p>
          </div>

          <div className="card__identifier__list border">
            <p className="card__iniciales card_p">{initials}</p>
            <p>{user.fullName}</p>
          </div>

          <div className="card__identifier__list border">
            <div className={`card_p ${getColorToDate(dueDate)}`}>{getDate(dueDate)}</div>
          </div>

          <div className="card__button__ellipsis">
            <Ellipsis id={`task-${id}`} onClick={updateSelection} className="card__ellipsis" />
          </div>
        </div>
      )}
    </>
  );
}

export default Card;
