import { Link } from 'react-router-dom';

export default function CreateUpdatePage() {
  return (
    <div>
      <h1>Create / Update Article</h1>
      <Link to="/articles">← Back to Articles</Link>
    </div>
  );
}
