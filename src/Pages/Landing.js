import './Landing.css';
import board1 from './5x5.jpg';
import board2 from './4x4.jpg';
import board3 from './6x6.jpg';
import {Link} from 'react-router-dom';

export const Landing = () => {
    return (
      <body className ="body">
      <div className = "landingPage">
        <div className = "landingPage2">
          <h1 className="homeText"> Select your Board </h1>
          <div class = "photoStrip">
            <div class = "column">
              <div class = "photo">
                  <Link to="/board1">
                    <img src={board1} alt=""/>
                  </Link>
              </div>
            </div>

            <div class = "column">
              <div class = "photo">
                  <Link to="/board2">
                    <img src={board2} alt=""/>
                  </Link>
              </div>
            </div>
            <div class = "column">
              <div class = "photo">
                  <Link to="/board3">
                    <img src={board3} alt=""/>
                  </Link>
              </div>
            </div>
          </div>
      </div>
    </div>
    </body>
    );
}

export default Landing;