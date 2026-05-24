import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import DisplayPage from './pages/DisplayPage';
import CreateUpdatePage from './pages/CreateUpdatePage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/articles" replace />} />
        <Route path="/articles" element={<DisplayPage />} />
        <Route path="/create" element={<CreateUpdatePage />} />
        <Route path="/edit/:id" element={<CreateUpdatePage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
