import React, { useRef, useState } from 'react';
import ReactCrop, { centerCrop, convertToPercentCrop, convertToPixelCrop,makeAspectCrop } from 'react-image-crop';
import EditProfileIcon from '../Assets/images/Pencil.svg';
import setCanvasPreview from '../setCanvasPreview';
import { useProfileImage } from '../Components/ProfileImageContext';


const ASPECT_RATIO = 1;
const MIN_DIMENSION = 150;

const ImageCropper = ({userIcon, updateAvatar,modalOpen,setModalOpen, closeModal}) => {
    const [ImgSrc, setImgSrc] = useState('');
    const [crop, setCrop] = useState();
    const [error, setError] = useState('');
    const imgRef = useRef(null);
    const previewCanvasRef = useRef(null);
    
  const onSelectFile = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.addEventListener('load', () => {
        setModalOpen(true);
        const imageUrl = reader.result?.toString() || ""; 
        const imageElement = new Image();
        imageElement.src = imageUrl;
        imageElement.addEventListener("load", (e) => {
        if (error) setError('');
        const {naturalWidth, naturalHeight} = e.currentTarget;
        if (naturalWidth < MIN_DIMENSION || naturalHeight < MIN_DIMENSION) {
            setError("Image must be at least 150 x 150 pixels.");
            return setImgSrc('');
        }});
        setImgSrc(imageUrl);
    });
    reader.readAsDataURL(file);
  };
  //? Crop tool in image on load
  const onImageLoad = (e) => {
    const {width, height} = e.currentTarget;
    const crop = makeAspectCrop(
        {
        unit: '%',
        width: (MIN_DIMENSION / width) * 100,//? to insure that always the crop is at least 150x150
        },
        ASPECT_RATIO,
        width,
        height
    );
    const centerdedCrop = centerCrop(crop, width, height);
    setCrop(centerdedCrop);
  };
  
  const  {setProfileImage}  = useProfileImage();
  const handleImageChange = () => {
    //const imageFile = userIcon;
    // Perform any necessary image processing
    setProfileImage(userIcon);
    console.log(userIcon);
  };
  console.log(userIcon);


  const handleCombinedChange = (pixelCrop, percentCrop) => {
    setCrop(percentCrop); // Call function 1
    handleImageChange(); // Call function 2
  };

  return (
    <span className="flex flex-col items-center justify-center">
        <div className="relative">
          <div className='duration-300 hover:opacity-25'>
            <img onChange={handleImageChange} src={userIcon} alt="" className="h-[150px] w-[150px] rounded-full" />            
          </div>
          <label htmlFor='fileInput' className="absolute inset-0 flex flex-col items-center justify-center transition-opacity duration-300 opacity-0 cursor-pointer hover:opacity-100">
            <img src={EditProfileIcon} alt="Edit Profile" className="w-8 h-8" />
            <p className='text-white'>Change</p>
            <input 
            type="file" 
            accept="image/*"
            onChange={onSelectFile} 
            id="fileInput" 
            className="hidden" />
          </label>
        </div>
        
        {ImgSrc && modalOpen && (
            <div className='absolute flex flex-col items-center p-4 rounded-lg bg-slate-600'>
                <ReactCrop
                    crop={crop}
                    onChange={
                        handleCombinedChange
                    }
                    circularCrop
                    keepSelection
                    aspect={ASPECT_RATIO}
                    minWidth={MIN_DIMENSION}
                >
                    <img ref={imgRef} src={ImgSrc} onLoad={onImageLoad} alt="Upload" style={{maxHeight: "30vh"}} />
                </ReactCrop>
                <button className='p-1.5 mt-2 rounded-lg bg-slate-400'
                onClick={(e) => {
                    e.preventDefault();
                    setCanvasPreview(
                        imgRef.current,
                        previewCanvasRef.current,
                        convertToPixelCrop(
                            crop,
                            imgRef.current.width,
                            imgRef.current.height
                        )
                    );
                    const dataUrl = previewCanvasRef.current.toDataURL();
                    updateAvatar(dataUrl);
                    setProfileImage(dataUrl);
                    closeModal();
                    setModalOpen(false);
                }}
                >
                    Crop Image
                </button>
                {crop && (
                    <canvas
                        ref={previewCanvasRef}
                        className='mt-4'
                        style={{
                            display: "none",
                            border: "1px solid black",
                            objectFit: "contain",
                            width: 150,
                            height: 150,
                        }}
                    />
                )}
            </div>
        )}
        
        {error && <p className="text-red-500">{error}</p>}
      </span>
  );
};

export default ImageCropper;