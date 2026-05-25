import { Box, Paper, Typography, IconButton, Chip } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate } from 'react-router-dom';
import type { Article } from '../types/Article';

interface Props {
  article: Article;
  onDelete: (id: number) => void;
}

export default function ArticleCard({ article, onDelete }: Props) {
  const navigate = useNavigate();

  const formattedDate = new Date(article.date).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });

  return (
    <Paper
      elevation={1}
      sx={{
        p: 3,
        mb: 2,
        borderRadius: 2,
        transition: 'box-shadow 0.2s ease',
        '&:hover': { boxShadow: 4 },
      }}
    >
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <Box sx={{ flex: 1 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
            <Chip
              label={article.publisher.toUpperCase()}
              size="small"
              sx={{ fontWeight: 700, fontSize: '0.7rem', bgcolor: '#e3f2fd', color: '#1565c0' }}
            />
            <Typography variant="caption" color="text.secondary">
              {formattedDate}
            </Typography>
          </Box>

          <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
            {article.title}
          </Typography>

          <Typography variant="body2" color="text.secondary" sx={{ whiteSpace: 'pre-line' }}>
            {article.summary}
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', flexDirection: 'column', ml: 2 }}>
          <IconButton size="small" onClick={() => navigate(`/edit/${article.id}`)} color="primary">
            <EditIcon fontSize="small" />
          </IconButton>
          <IconButton size="small" onClick={() => onDelete(article.id!)} color="error">
            <DeleteIcon fontSize="small" />
          </IconButton>
        </Box>
      </Box>
    </Paper>
  );
}
