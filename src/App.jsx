import { useState, useEffect } from 'react';
import { useStateTogether } from 'react-together';
import { Stage, Layer, Image as KonvaImage } from 'react-konva';
import './App.css';

const App = () => {
  const [images, setImages] = useStateTogether('images', []);
  const [konvaImages, setKonvaImages] = useState([]); // Хранит загруженные изображения для Konva

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return; // Проверяем, выбран ли файл

    const reader = new FileReader();

    reader.onload = () => {
      const img = new window.Image();
      img.src = reader.result;
      img.onload = () => {
        // Создаем и масштабируем миниатюру
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        canvas.width = 20;
        canvas.height = 20;

        const minSide = Math.min(img.width, img.height);
        const sx = (img.width - minSide) / 2;
        const sy = (img.height - minSide) / 2;

        ctx.drawImage(img, sx, sy, minSide, minSide, 0, 0, 20, 20);

        const newImgSrc = canvas.toDataURL();

        // Добавляем изображение в общий массив
        setImages((prevImages = []) => [...prevImages, newImgSrc]);
      };
    };

    reader.readAsDataURL(file);
  };

  // Используем useEffect для загрузки изображений при изменении массива images
  useEffect(() => {
    const loadImages = async () => {
      const loadedImages = await Promise.all(
        images.map(
          (src) =>
            new Promise((resolve) => {
              const img = new window.Image();
              img.src = src;
              img.onload = () => {
                resolve(img);
              };
            })
        )
      );
      setKonvaImages(loadedImages);
    };

    loadImages();
  }, [images]);

  // Функция для отображения изображений
  const renderImages = () => {
    return konvaImages.map((image, index) => (
      <KonvaImage
        key={index}
        image={image}
        x={(index % 32) * 25} // Расположение изображений по оси X
        y={Math.floor(index / 32) * 25} // Расположение по оси Y
      />
    ));
  };

  return (
    <div>
      <h1>Добавьте свою фотографию</h1>
      <input type="file" accept="image/*" onChange={handleImageUpload} />
      <Stage width={800} height={600}>
        <Layer>{renderImages()}</Layer>
      </Stage>
    </div>
  );
};

export default App;
