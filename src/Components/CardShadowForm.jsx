import React from 'react';

const CardShadowForm = ({ children }) => {
  return (
    <div className="row justify-content-center mt-4">
      <div className="col-md-6 card shadow p-4 ">
        {children}
      </div>
    </div>
  );
};

export default CardShadowForm;
