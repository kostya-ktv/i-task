import { UnsplashImgType, fetchImages } from "@/actions/unsplash";
import { useEffect, useState } from "react";

export const useUnsplashImages = () => {
  const [images, setImages] = useState<UnsplashImgType>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetch = async () => {
      setIsLoading(true);
      await fetchImages()
        .then((result) => {
          if (result && result.response) {
            setImages(result.response);
          }
        })
        .catch(() => {
          console.log("Error fetching images");
        })
        .finally(() => setIsLoading(false));
    };
    fetch();
  }, []);
  return {
    images, isLoading
  }
}
