import { useState, useEffect } from 'react';
import img1 from '../Assets/Rectangle 43.png';
import img2 from '../Assets/Rectangle 38.png';
import img3 from '../Assets/Rectangle 39.png';
import img4 from '../Assets/Rectangle 40.png';
import img5 from '../Assets/Rectangle 41.png';
import img6 from '../Assets/Rectangle 42.png';

export default function Preference() {
  const [clicked , isClicked] = useState(false);
  const [animationClass, setAnimationClass] = useState('translate-y-[1000px]');
  const [a0, setA0] = useState('opacity-50');
  const [a1, setA1] = useState('opacity-50');
  const [a2, setA2] = useState('opacity-50');
  const [a3, setA3] = useState('opacity-50');
  const [a4, setA4] = useState('opacity-50');
  const [a5, setA5] = useState('opacity-50');
  const [h0, setH0] = useState('');
  const [h1, setH1] = useState('');
  const [h2, setH2] = useState('');
  const [h3, setH3] = useState('');
  const [h4, setH4] = useState('');
  const [h5, setH5] = useState('');

  useEffect(() => {
    // Update the animation class after a delay
    const timeout = setTimeout(() => {
      setAnimationClass('');
    }, 250);

    return () => clearTimeout(timeout);
  }, []);

  const [myArray, setMyArray] = useState([]);
  const imageDATA = [
    { img: img1, text: 'culture' },
    { img: img2, text: 'Art' },
    { img: img3, text: 'beauty' },
    { img: img4, text: 'food' },
    { img: img5, text: 'business' },
    { img: img6, text: 'sport' },
  ];
  console.log(myArray);
  const handleClick = (dataindex) => {
    isClicked(true);
    console.log(dataindex);
    const index = imageDATA.findIndex((image) => image.img === imageDATA[dataindex].img);
    const i = myArray.findIndex((item) => item.img === imageDATA[dataindex].img);
    if (i === -1) {
      // If the element is not present in myArray, update the state and set the corresponding a state variable
      setMyArray((prevArray) => [...prevArray, imageDATA[dataindex]]);
      switch (index) {
        case 0:
          setA0('rounded-2xl opacity-100');
          setH0('text-cyan-800 font-bold');
          break;
        case 1:
          setA1('rounded-2xl opacity-100');
          setH1('text-cyan-800 font-bold');
          break;
        case 2:
          setA2('rounded-2xl opacity-100');
          setH2('text-cyan-800 font-bold');
          break;
        case 3:
          setA3('rounded-2xl opacity-100');
          setH3('text-cyan-800 font-bold');
          break;
        case 4:
          setA4('rounded-2xl opacity-100');
          setH4('text-cyan-800 font-bold');
          break;
        case 5:
          setA5('rounded-2xl opacity-100');
          setH5('text-cyan-800 font-bold');
          break;
        default:
          break;
      }
    } else {
      // If the element is already present in myArray, remove it from myArray and reset the corresponding a state variable
      setMyArray((prevArray) => prevArray.filter((item) => item.img !== imageDATA[dataindex].img));
      switch (index) {
        case 0:
          setA0('opacity-50');
          setH0('');
          break;
        case 1:
          setA1('opacity-50');
          setH1('');
          break;
        case 2:
          setA2('opacity-50');
          setH2('');
          break;
        case 3:
          setA3('opacity-50');
          setH3('');
          break;
        case 4:
          setA4('opacity-50');
          setH4('');
          break;
        case 5:
          setA5('opacity-50');
          setH5('');
          break;
        default:
          break;
      }
    }
  };

  return (
    <div className={`transition top-6 duration-700 absolute h-max w-max ${animationClass} bg-white rounded-md flex flex-col gap-6 ps-5 pe-5 pt-10 pb-10`}>
      <h1 className='text-xl font-semibold text-left '> Choose Topic That You Are Interested In.</h1>
      {clicked && <h1 className='text-sm font-semibold text-red-800'>{`you are choosing ${myArray.length} item(s)`}</h1>}
      <div className='h-max w-max grid grid-cols-3 gap-4'>
        {imageDATA.map((image, index) => (
          <div className={`w-64 h-64 cursor-pointer flex flex-col hover:scale-[1.01] ${index === 0 ? a0 : index === 1 ? a1 : index === 2 ? a2 : index === 3 ? a3 : index === 4 ? a4 : a5}`} onClick={() => handleClick(index)} key={index}>
            <img className='' src={image.img} alt='image' />
            <h1 className={`text-md text-center font-bold  ${index === 0 ? h0 : index === 1 ? h1 : index === 2 ? h2 : index === 3 ? h3 : index === 4 ? h4 : h5}`}>{image.text}</h1>
          </div>
        ))}
      </div>
      <h1 className='text-xl font-semibold text-right  hover:underline cursor-pointer'>continue </h1>
    </div>
  );
}
