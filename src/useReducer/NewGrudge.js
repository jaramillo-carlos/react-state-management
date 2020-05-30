import React, { useState } from 'react';

const NewGrudge = ({ onSubmit }) => {
  const [person, setPerson] = useState('');
  const [reason, setReason] = useState('');

  // React.memo
  // useMemo
  // useCallback

  const handleChange = event => {
    event.preventDefault();
    onSubmit({ person, reason });
  };

  console.log('new');

  return (
    <form className="NewGrudge" onSubmit={handleChange}>
      <input
        className="NewGrudge-input"
        placeholder="Person"
        type="text"
        value={person}
        onChange={event => setPerson(event.target.value)}
      />
      <input
        className="NewGrudge-input"
        placeholder="Reason"
        type="text"
        value={reason}
        onChange={event => setReason(event.target.value)}
      />
      <input className="NewGrudge-submit button" type="submit" />
    </form>
  );
};

export default React.memo(NewGrudge);
