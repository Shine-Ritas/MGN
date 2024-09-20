import { useUserAppSelector } from '@/redux/hooks';
import { selectUserReadSetting } from '@/redux/slices/user-read-setting';
import readingStyleClasses from '@/utilities/read-helper';
import { useState, useEffect } from 'react';

const images = import.meta.glob('@/assets/test-imgs/*.{png,jpg,jpeg,svg}', { eager: true }) as Record<string, { default: string }>;

// Format images into the desired structure
const formattedImages = Object.keys(images).map((key) => ({
  id: key.split('/').pop()?.split('.')[0] || "", // Extracting file name as ID
  path: images[key].default,
}));

const Detail = () => {
  // Log the formatted images
  console.log(formattedImages);

  // Initial state
  const [currentImages, setCurrentImages] = useState(formattedImages.slice(0, 2)); // Initial slice of 2 images (default)
  const [currentIndex, setCurrentIndex] = useState(0); // Track the current index

  // Get user read settings from Redux store
  const readSetting = useUserAppSelector(selectUserReadSetting);

  // Calculate the reading style classes and max images to display
  const readStyle = readingStyleClasses(readSetting.readingStyle.value);

  // Update currentImages when readSetting or readStyle changes
  useEffect(() => {
    // Get the max number of images to display based on the current read style
    const maxImages = readStyle.max;

    // Calculate the new start index to maintain the user's current position
    // Make sure to keep the index within bounds
    const startIndex = Math.max(0, currentIndex - Math.floor(maxImages / 2));
    const endIndex = Math.min(formattedImages.length, startIndex + maxImages);

    // Set the currentImages state to the appropriate slice of images
    setCurrentImages(formattedImages.slice(startIndex, endIndex));
  }, [readSetting, readStyle.max, currentIndex]);

  // Function to navigate to the next image(s)
  const goToNextImages = () => {
    // Calculate new index within bounds
    const newIndex = Math.min(currentIndex + readStyle.max, formattedImages.length - readStyle.max);
    setCurrentIndex(newIndex);
  };

  // Function to navigate to the previous image(s)
  const goToPreviousImages = () => {
    // Calculate new index within bounds
    const newIndex = Math.max(currentIndex - readStyle.max, 0);
    setCurrentIndex(newIndex);
  };

  return (
    <div className="bg-slate-700 p-4">
      {/* Navigation buttons */}
      <div className="flex justify-between mb-4">
        <button
          onClick={goToPreviousImages}
          className="text-white p-2 bg-blue-500 rounded hover:bg-blue-700 disabled:bg-gray-500"
          disabled={currentIndex === 0}
        >
          Previous
        </button>
        <button
          onClick={goToNextImages}
          className="text-white p-2 bg-blue-500 rounded hover:bg-blue-700 disabled:bg-gray-500"
          disabled={currentIndex + readStyle.max >= formattedImages.length}
        >
          Next
        </button>
      </div>

      {/* Container for images with the applied reading style */}
      <div className={readStyle.class}>
        { 
          // Map over the current images and display them
          currentImages.map((image) => (
            <img 
              key={image.id} // Unique key for each image
              src={image.path} // Image source path
              alt={image.id} // Alt text as image ID
              className="m-2 rounded shadow-md max-h-screen object-contain" // Styling for images
            />
          ))
        }
      </div>
    </div>
  );
};

export default Detail;
