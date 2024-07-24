import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from './components/Navbar';
import BuildTable from './components/Table';
import ShowGraph from './components/lineCharts/BuildGraph';
import ShowBarGraph from './components/barCharts/BuildBarChart';
import Input from './components/Input';
import Stats from './components/Stats';
import './App.css'

function App() {
  

  return (
    <>
      <Navbar />
      <div className="container">
        <div className="grid">
          <div className="row align-items-centre">
            <div className="col-md-12 input-box p-3">
              <Input />
            </div>
          </div>
        </div>
      </div>
      <div className="grid">
          <div className="row align-items-centre">
            <div className="col-md-12 input-box p-3">
              <Stats />
            </div>
          </div>
        </div>
     
      
      {/* Body */}
      <div className="container">
        <div className="grid">
          <div className="row align-items-centre">
            {/* Left Panel */}
            <div className="col-md-5">
              <BuildTable />
            </div>
            {/* Left Panel */}
            <div className="col-md-6 offset-1">
              <ShowGraph />
              <div className="row pt-4">
              <ShowBarGraph />
              </div>
              
            </div>
          </div>
        </div>
      </div>
      
    </>
    
  )
}

export default App
