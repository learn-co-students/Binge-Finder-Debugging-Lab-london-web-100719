import React from 'react';

const tvShow = (props) => {
  return (
    <div onClick={() => props.selectShow(props.show)} >
      <br/>
		<img src={props.image.medium} alt=""/>
    </div>
  );
}

export default tvShow;
