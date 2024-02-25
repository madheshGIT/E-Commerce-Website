import React from 'react';
import "./PageNotFound.scss"
import { pnf } from '../../utils/images';

const PageNotFound = () => {
  return (
    <div className='pnf'>
    <img src={pnf} alt="Page Not Found"/>
    </div>
  );
};

export default PageNotFound;

