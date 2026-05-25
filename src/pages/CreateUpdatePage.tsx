import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams, Link } from 'react-router-dom';
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  Alert,
  Paper,
  CircularProgress,
} from '@mui/material';
import type { Article } from '../types/Article';
import { createArticle, getArticleById, updateArticle } from '../api/articles';

export default function CreateUpdatePage() {
  const { id } = useParams<{ id: string }>();
  const isEditing = Boolean(id);
  const navigate = useNavigate();

  const [submitError, setSubmitError] = useState('');
  const [submitSuccess, setSubmitSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<Article>();

  useEffect(() => {
    if (isEditing && id) {
      setLoading(true);
      getArticleById(Number(id))
        .then((res) => reset(res.data))
        .catch(() => setSubmitError('Failed to load article.'))
        .finally(() => setLoading(false));
    }
  }, [id, isEditing, reset]);

  const onSubmit = async (data: Article) => {
    setSubmitError('');
    setSubmitSuccess('');
    try {
      if (isEditing && id) {
        await updateArticle(Number(id), data);
        setSubmitSuccess('Article updated successfully!');
        setTimeout(() => navigate('/articles'), 1500);
      } else {
        await createArticle(data);
        setSubmitSuccess('Article created successfully!');
        reset();
      }
    } catch {
      setSubmitError('Something went wrong. Please try again.');
    }
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 8 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container maxWidth="sm" sx={{ py: 6 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h5" sx={{ fontWeight: 700, mb: 3 }}>
          {isEditing ? 'Update Article' : 'Create Article'}
        </Typography>

        {submitError && <Alert severity="error" sx={{ mb: 2 }}>{submitError}</Alert>}
        {submitSuccess && <Alert severity="success" sx={{ mb: 2 }}>{submitSuccess}</Alert>}

        <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
          <TextField
            label="Article Title"
            fullWidth
            margin="normal"
            error={Boolean(errors.title)}
            helperText={errors.title?.message}
            {...register('title', { required: 'Article title is required' })}
          />

          <TextField
            label="Article Summary"
            fullWidth
            multiline
            rows={4}
            margin="normal"
            error={Boolean(errors.summary)}
            helperText={errors.summary?.message}
            {...register('summary', { required: 'Article summary is required' })}
          />

          <TextField
            label="Article Date"
            type="date"
            fullWidth
            margin="normal"
            slotProps={{ inputLabel: { shrink: true } }}
            error={Boolean(errors.date)}
            helperText={errors.date?.message}
            {...register('date', { required: 'Article date is required' })}
          />

          <TextField
            label="Publisher"
            fullWidth
            margin="normal"
            error={Boolean(errors.publisher)}
            helperText={errors.publisher?.message}
            {...register('publisher', { required: 'Publisher is required' })}
          />

          <Button
            type="submit"
            variant="contained"
            fullWidth
            size="large"
            disabled={isSubmitting}
            sx={{ mt: 3 }}
          >
            {isSubmitting ? 'Saving...' : isEditing ? 'Update Article' : 'Create Article'}
          </Button>
        </Box>

        <Box sx={{ mt: 2, textAlign: 'center' }}>
          <Link to="/articles" style={{ textDecoration: 'none', color: '#1976d2' }}>
            ← Back to Articles
          </Link>
        </Box>
      </Paper>
    </Container>
  );
}
