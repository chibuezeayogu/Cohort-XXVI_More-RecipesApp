import React from 'react';

/**
 * @description displays loader on page load
 *
 * @member
 *
 * @returns {undefined}
 */
const Preloader = () => (
  <div className="preloader-wrapper big active loader">
    <div className="spinner-layer spinner-blue-only">
      <div className="circle-clipper left">
        <div className="circle" />
      </div><div className="gap-patch">
        <div className="circle" />
            </div><div className="circle-clipper right">
        <div className="circle" />
            </div>
    </div>
  </div>
);


export default Preloader;

