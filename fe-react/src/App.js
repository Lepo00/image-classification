import * as mobilenet from "@tensorflow-models/mobilenet";
import { useState, useEffect } from "react";

function App() {
  const [isModelLoading, setIsModelLoading] = useState(false);
  const [model, setModel] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);

  const loadModel = async () => {
    setIsModelLoading(true);
    try {
      const model = await mobilenet.load();
      setModel(model);
      setIsModelLoading(false);
    } catch (error) {
      console.error(error);
      setIsModelLoading(false);
    }
  }

  const uploadImage = (e) => {
    const { files } = e.target;
    if (files.length > 0) {
      const url = URL.createObjectURL(files[0]);
      setImageUrl(url);
    } else {
      setImageUrl(null);
    }
  }

  useEffect(() => {
    loadModel()
  }, []);

  if (isModelLoading) {
    return <h2>Model Loading...</h2>
  }

  return (
    <div className="App">
      <h1 className="header">Image Identification</ h1>
      <div className="inputHolder">
        <input type="file" accept="image/*" capture="camera" className="uploadInput" onChange={uploadImage}></input>
      </div>
    </div>
  );
}

export default App;
