import React, { useEffect, useState } from 'react'
import { CldImage } from 'next-cloudinary';
import Image from 'next/image';
import { api } from '~/utils/api';

const TestImg = () => {
    const [img, setImg] = useState('');
    const [img2, setImg2] = useState('');

    const imgMutation = api.images.upload.useMutation();
    const imgQuery = api.images.get.useQuery({imageId: '641ecc4d9deb96e70c662b23'});

    const handleImg = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        console.log(e);
        console.log(e.target.files);
        const file = e.target.files?e.target.files[0]:null;

        const reader = new FileReader();

        if (!file) {
          return;
        }
        reader.readAsDataURL(file);

        reader.onload = () => {
          // console.log(reader.result);
          if (!reader.result) {
            return;
          }
          const imgStr = reader.result as string
          setImg(imgStr)
      
        }
        reader.onerror = (err) => {
          console.log(err);
        }
    }


    const upload = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      if (!img) {
        return;
      }

      imgMutation.mutateAsync({image: img});
    }

    useEffect(() => {
      console.log('Use effect');

      if (imgQuery.isError) {
        return;
      }

      const newImg = imgQuery.data?.dbResp?.img

      setImg2(newImg!);
      
      console.log(imgQuery);
      
    }, [imgQuery])


    useEffect(() => {
      getImg();
    }, [])

    const getImg = async () => {
      const resp = await fetch('http://localhost:3000/api/img/641ecc4d9deb96e70c662b23');
      console.log('IMG\n', resp);
      const data = await resp.json();
      console.log(data);
      setImg(data);
      
    }

  return (
    <div>Test 

      <form onSubmit={upload}>

        <input type={'file'} accept='image/*' onChange={handleImg} />
        <img src={img} alt='img' />

        

<button type='submit'>Upload</button>
        </form>
      {/* <Image src={'https://res.cloudinary.com/dc9pahe4k/image/upload/v1679500271/cld-sample-4.jpg'}
      height={500} width={500} alt='image' /> */}

        img2
        <img src={img2} alt='img2' />

        img3 
        <img src={'http://localhost:3000/api/img/641ecc4d9deb96e70c662b23'} alt='img3' />
    </div>
  )
}

export default TestImg