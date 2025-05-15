import React, { useState } from 'react'
import { SketchPicker } from 'react-color';
import "./SketchColor.css"

const SketchColor = ({setColor,color,hexaCode}) => {
  const [displayColorPicker, setDisplayColorPicker] = useState(false);

  const handleClick = () => {
    setDisplayColorPicker(!displayColorPicker);
  };

  const handleClose = () => {
    setDisplayColorPicker(false);
  };

  const handleChange = (newColor) => {
    setColor(newColor.rgb);
  };
  return (
    <div>
      <div className={`swatch`}
        style={{
          background: hexaCode
        }}
        onClick={handleClick}>
        <div className='color' />
      </div>
      {displayColorPicker && (
        <div className='popover'>
          <div className='cover' onClick={handleClose} />
          <SketchPicker color={color} onChange={handleChange} />
        </div>
      )}
    </div>
  )
}

export default SketchColor
