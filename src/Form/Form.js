import { useState } from 'react';
import PropTypes from 'prop-types';
import s from './form.module.css';
import shortid from 'shortid';

export default function Form({ onSubmit }) {
  const [name, setName] = useState('');
  const [number, setNumber] = useState();

  const reset = () => {
    setName('');
    setNumber('');
  };

  const handleSubmitForm = event => {
    event.preventDefault();
    onSubmit(name, number);
    reset();
  };

  const contactInputId = shortid.generate();

  return (
    <>
      <form className={s.form} onSubmit={handleSubmitForm}>
        <label>
          Name
          <input
            className={s.input}
            type="text"
            name="name"
            value={name}
            onChange={e => setName(e.currentTarget.value)}
            id={contactInputId}
          ></input>
        </label>
        <label>
          Number
          <input
            className={s.input}
            type="number"
            name="number"
            value={number}
            onChange={e => setNumber(e.currentTarget.value)}
          ></input>
        </label>
        <button className={s.button} type="submit">
          Add contact
        </button>
      </form>
    </>
  );
}
