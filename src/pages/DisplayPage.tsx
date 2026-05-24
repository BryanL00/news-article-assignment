import { Link } from 'react-router-dom';

export default function DisplayPage() {
  return (
    <div>
      <h1>News Articles</h1>
      <Link to="/create">+ Create Article</Link>
    </div>
  );
}
