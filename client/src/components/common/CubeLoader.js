// @flow

import React from 'react';

import 'spinkit/css/spinners/11-folding-cube.css';

const CubeLoader = () => {
    const cubes = [1, 2, 4, 3].map(i => (
        <div key={i} className={`sk-cube sk-cube${i}`} />
    ));

    return <div className="sk-folding-cube">{cubes}</div>;
};

export default CubeLoader;
