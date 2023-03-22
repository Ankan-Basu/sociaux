import React, { useState } from 'react'

const TestImg = () => {
    const [img, setImg] = useState('');
    const handleImg = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        console.log(e);
        console.log(e.target.files);
        if (e.target.files && e.target.files[0]) {
            let x = URL.createObjectURL(e.target.files[0])
            // console.log(x);
            setImg(x);
        }
        
        // setImg(e.target.files[0]);
    }

  return (
    <div>Test 

        <input type={'file'} accept='image/*' onChange={handleImg} />
        <img src={img} alt='img' />
    </div>
  )
}

export default TestImg