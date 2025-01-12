import { treksData } from './trekData'; // Importing trek data
import './css/treks.css'; // Importing CSS
import { Link } from 'react-router-dom';

export const Treks = () => {
  return (
    <div id="treks-section"> {/* Added ID for scroll targeting */}
      <div className="treks-container">
        <div className="treks-grid">
          {treksData.map((trek) => (
            <Link
              to={`/treks/${trek.id}`}
              key={trek.id}
              className="trek-card-link"
            >
              <div className="trek-card">
                <div className="image-container">
                  <img
                    src={trek.images[0]}
                    alt={trek.name}
                    className="trek-image"
                  />
                </div>
                <div className="trek-info">
                  <h2 className="trek-name">{trek.name}</h2>
                  <p className="trek-location">{trek.location}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};