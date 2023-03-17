import { image } from "d3";
import React from "react";

function PreloadImages(props) {
  const { images } = props;
  // 이미지를 미리 로딩합니다.
  const preloadImages = () => {
    images.forEach((image) => {
      const img = new Image();
      img.src = image;
    });
  };

  // 컴포넌트가 마운트될 때 이미지를 로딩합니다.
  React.useEffect(() => {
    preloadImages();
  }, []);

  return <></>;
}

export default PreloadImages;
