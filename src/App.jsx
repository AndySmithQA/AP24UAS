import { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from './components/Navbar';
import BuildTable from './components/Table';
import ShowGraph from './components/lineCharts/BuildGraph';
import ShowBarGraph from './components/barCharts/BuildBarChart';
import Input from './components/Input';
import Stats from './components/Stats';
import './App.css'

function App() {
  const [months, setMonths] = useState([]);
  const [loadError, setLoadError] = useState('');

  useEffect(() => {
    const controller = new AbortController();

    async function loadMonths() {
      try {
        const response = await fetch("http://localhost:3001/months", {
          signal: controller.signal
        });

        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`);
        }

        const data = await response.json();
        if (!Array.isArray(data)) {
          throw new Error('Monthly data response must be an array');
        }

        setMonths(data);
      } catch (error) {
        if (error.name !== 'AbortError') {
          setLoadError(error instanceof Error ? error.message : 'Unable to load monthly data');
        }
      }
    }

    loadMonths();
    return () => controller.abort();
  }, []);

  return (
    <>
      <Navbar />
      {loadError && <div className="alert alert-danger" role="alert">Could not load monthly data: {loadError}</div>}
      <div className="container">
        <div className="grid">
          <div className="row align-items-centre">
            <div className="col-md-12 input-box p-3">
              <Input
                months={months}
                onMonthAdded={(month) => setMonths((currentMonths) => [...currentMonths, month])}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="grid">
          <div className="row align-items-centre">
            <div className="col-md-12 input-box p-3">
              <Stats months={months} />
            </div>
          </div>
        </div>
     
      
      {/* Body */}
      <div className="container">
        <div className="grid">
          <div className="row align-items-centre">
            {/* Left Panel */}
            <div className="col-md-5">
              <BuildTable months={months} />
            </div>
            {/* Left Panel */}
            <div className="col-md-6 offset-1">
              <ShowGraph months={months} />
              <div className="row pt-4">
              <ShowBarGraph months={months} />
              </div>
              
            </div>
          </div>
        </div>
      </div>
      
    </>
    
  )
}

export default App
