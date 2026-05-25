import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Box,
  Button,
  Container,
  Typography,
  Alert,
  CircularProgress,
  TextField,
  InputAdornment,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import ArticleCard from '../components/ArticleCard';
import { getArticles, deleteArticle } from '../api/articles';
import type { Article } from '../types/Article';

export default function DisplayPage() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');

  const fetchArticles = () => {
    setLoading(true);
    setError('');
    getArticles()
      .then((res) => setArticles(res.data))
      .catch(() => setError('Failed to load articles. Make sure the server is running.'))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchArticles();
  }, []);

  const handleDelete = async (id: number) => {
    if (!window.confirm('Are you sure you want to delete this article?')) return;
    try {
      await deleteArticle(id);
      setArticles((prev) => prev.filter((a) => a.id !== id));
    } catch {
      setError('Failed to delete article.');
    }
  };

  const filtered = articles.filter(
    (a) =>
      a.title.toLowerCase().includes(search.toLowerCase()) ||
      a.publisher.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Container maxWidth="md" sx={{ py: 6 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h5" sx={{ fontWeight: 700 }}>
          News Articles
        </Typography>
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Link to="/create" style={{ textDecoration: 'none' }}>
            <Button variant="contained" startIcon={<AddIcon />}>
              New Article
            </Button>
          </Link>
        </Box>
      </Box>

      <TextField
        fullWidth
        placeholder="Search by title or publisher..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        sx={{ mb: 3 }}
        slotProps={{
          input: {
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          },
        }}
      />

      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 8 }}>
          <CircularProgress />
        </Box>
      ) : filtered.length === 0 ? (
        <Box sx={{ textAlign: 'center', mt: 8 }}>
          <Typography color="text.secondary">
            {search ? 'No articles match your search.' : 'No articles yet. Create one!'}
          </Typography>
        </Box>
      ) : (
        <>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            {filtered.length} article{filtered.length !== 1 ? 's' : ''} found
          </Typography>
          {filtered.map((article) => (
            <ArticleCard key={article.id} article={article} onDelete={handleDelete} />
          ))}
        </>
      )}
    </Container>
  );
}
