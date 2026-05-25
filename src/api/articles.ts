import axios from 'axios';
import type { Article } from '../types/Article';

const BASE_URL = 'http://localhost:3001/articles';

export const getArticles = () => axios.get<Article[]>(BASE_URL);

export const getArticleById = (id: number) => axios.get<Article>(`${BASE_URL}/${id}`);

export const createArticle = (data: Article) => axios.post<Article>(BASE_URL, data);

export const updateArticle = (id: number, data: Article) => axios.put<Article>(`${BASE_URL}/${id}`, data);

export const deleteArticle = (id: number) => axios.delete(`${BASE_URL}/${id}`);
