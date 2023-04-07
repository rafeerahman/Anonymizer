import { useState } from 'react';
import TitleContext from './TitleContext';

const TitleProvider = ({ children }) => {
  const [title, setTitle] = useState('Anonymizer');

  return (
    <TitleContext.Provider value={{ title, setTitle }}>
      {children}
    </TitleContext.Provider>
  );
};

export default TitleProvider;