import {videos} from '../data';
import './pagination.css';
import React from 'react';
import {data} from '../data';
export const ProgressBar = ({percentage}) => {
  return (
    <div className="progress-bar">
      <Filler percentage={percentage} />
    </div>
  );
};

const Filler = ({percentage}) => {
  return <div className="filler" style={{width: `${percentage}%`}} />;
};

const Pagination = ({index, splitScreen, mobile}) => {
  const cssClasses = () => {
    if (!splitScreen) {
      return 'pagination full-screen-pagination';
    } else if (splitScreen) {
      return 'pagination split-screen-pagination';
    } else {
      return 'pagination';
    }
  };
  if (index === 0 && mobile) return null;

  let notVisible = () => {
    const slide = data[index];
    const testBooleans = [slide.type === 'finalPage', slide.credits];
    if (testBooleans.indexOf(true) >= 0) {
      return true;
    } else return false;
  };

  const percentage = Math.round(index/data.length*100)
  console.log(percentage)
  return (
    <div className={cssClasses()}>
      <div
        style={{
          width: '100%',
          height: !mobile ? "100px": '12px',
          display: !mobile ? "flex" : "block",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          visibility: notVisible() ? 'hidden' : '',
        }}>
        <ProgressBar percentage={(index / (data.length - 1)) * 100} />
       {!mobile && <p style={{width: "20%", marginLeft: "5px"}}>{`${percentage.toString().length === 1 ? `\u00A0 ${percentage}` : percentage}%`}</p>}
      </div>
    </div>
  );
};

//<div>{JSON.stringify(index) + '/' + JSON.stringify(data.length)}</div>

export default Pagination;
