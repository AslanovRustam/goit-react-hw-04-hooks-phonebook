import s from './filter.module.css';

const Filter = ({ value, onChange }) => {
  return (
    <div className={s.section}>
      <label>
        Find Contacts by name
        <input
          type="text"
          className={s.input}
          value={value}
          onChange={onChange}
        />
      </label>
    </div>
  );
};

export default Filter;
