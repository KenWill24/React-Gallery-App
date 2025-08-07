import { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route, Navigate, useParams, useLocation } from 'react-router-dom';
import Nav from './components/Nav';
import Search from './components/Search';
import PhotoList from './components/PhotoList';


const API_KEY = '51517606-3b09e132fb0385c8eca99a43c';

function App() {
  const [photos, setPhotos] = useState([]);

  const fetchData = async (query) => {
    try {
      const response = await fetch(
        `https://pixabay.com/api/?key=${API_KEY}&q=${encodeURIComponent(query)}&image_type=photo`
      );
      const data = await response.json();
      setPhotos(data.hits);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  //fetchData for Photos and PhotoList renders the photos
  function StaticTopicWrapper({ title, fetchData, photos }) {
    const location = useLocation();

    useEffect(() => {
      if (title) {
        fetchData(title);
      }
    }, [location.pathname]);
    return <PhotoList title={title} photos={photos} />;
  }

  return (
    <BrowserRouter>
      <div className="container">
        <Search fetchData={fetchData} />
        <Nav />
        <Routes>
          <Route path="/" element={<Navigate to="/cats" />} />
          <Route path="/cats" element={<StaticTopicWrapper fetchData={fetchData} title="cats" photos={photos} />} />
          <Route path="/dogs" element={<StaticTopicWrapper fetchData={fetchData} title="dogs" photos={photos} />} />
          <Route path="/computers" element={<StaticTopicWrapper fetchData={fetchData} title="computers" photos={photos} />} />
          <Route path="/search/:query" element={<PhotoSearchWrapper fetchData={fetchData} photos={photos} />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

// Wrapper to handle dynamic search
function PhotoSearchWrapper({ fetchData, photos }) {
  const { query } = useParams();

  useEffect(() => {
    if (query) {
      fetchData(query);
    }
  }, [query]);

  return <PhotoList photos={photos} title={query} />
};

export default App;