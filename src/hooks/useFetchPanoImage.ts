import { useState, useEffect } from "react";

function useFetchPanoImage() {
  const [panoImage, setPanoImage] = useState<string>("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/photos")
      .then((res) => res.json())
      .then(
        (result) => {
          setLoading(false);
          setPanoImage(result.splice(1, 2)[0].url);
        },
        (error) => {
          console.log(error);
        }
      );
  }, []);

  return {
    loading,
    panoImage,
  };
}

export default useFetchPanoImage;
