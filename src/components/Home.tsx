import axios from "axios";
import { useEffect, useState, ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";
import Result from "./Result";

interface PredictionResponse {
  prediction: [];
}

export default function Home() {
  const navigate = useNavigate();
  const [img, setImg] = useState<File | null>(null);

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    if (file) {
      setImg(file);
    }
  };

  const handleSubmit = async () => {
    if (img) {
      // Create a form data object
      const formData = new FormData();
      formData.append("input_file", img);

      try {
        // Send a POST request to the backend API
        const response = await axios.post<PredictionResponse>(
          "http://127.0.0.1:8000/api/",
          formData
        );

        // Handle the response or navigate to the result page
        const prediction = response.data.prediction;
        console.log(prediction);
        navigate("/result", { state: { prediction } });
      } catch (error) {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    const startAPI = async () => {
      try {
        const response = await axios.post("http://127.0.0.1:8000/api/start");
        console.log(response);
      } catch (error) {
        console.log(error);
      }
    };
    startAPI();
  }, []);

  return (
    <>
      <div>
        <h1>Select an image</h1>
        <label htmlFor="btn" className="btn">
          Import
        </label>
        <input
          id="btn"
          type="file"
          className="hidden"
          accept="image/jpeg, image/png, image/gif"
          onChange={onChangeHandler}
        />
        <button onClick={handleSubmit}>Submit</button>
      </div>
    </>
  );
}
