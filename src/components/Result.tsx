import { useNavigate } from "react-router-dom";
import { Chart } from "./Chart";
import { useLocation } from "react-router-dom";


export default function Result() {
  
  const navigate = useNavigate();
    const location = useLocation();
    const prediction = location.state?.prediction;
    console.log("prediction")
    console.log(prediction)
  return (
    <div>
        <h1>Result</h1>
        <div className="chart">
          {prediction&& <Chart prediction={ prediction} />
          }
        </div>
        <button className="btn" onClick={()=>{navigate('/')}}>Back</button>
    </div>
  )
}
