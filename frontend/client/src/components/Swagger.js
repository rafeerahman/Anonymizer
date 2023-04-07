import React from 'react';

const SwaggerDoc = ({title, link}) => {
  return (
    <div>
        <h2>{title}</h2>
        <iframe
            src={link+".help.html"}
            title="My File"
            width="100%"
            height="800px"
        ></iframe>
    </div>
  );
}

export default SwaggerDoc;