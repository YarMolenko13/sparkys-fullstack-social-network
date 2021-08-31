import React from 'react';

const MainWrapper = ({navbar, appRoute}) => {
    return (
        <div style={{minHeight: '100vh'}} className="secondary pb-5 pb-sm-0 ">
            {navbar}
            {appRoute}
        </div>
    );
};

export default MainWrapper;