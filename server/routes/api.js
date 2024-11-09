import express from 'express';
import { getRestaurants, getRestaurant, createRestaurant, deleteRestaurant } from '../data/restaurants.js';

const router = express.Router();

router.get('/restaurants', (req, res) => {
    res.json(getRestaurants());
});

router.get('/restaurants/:id', (req, res) => {
    const restaurant = getRestaurant(req.params.id);
    restaurant ? res.json(restaurant) : res.status(404).json({ error: 'Not found' });
});

router.post('/restaurants', (req, res) => {
    createRestaurant(req.body);
    res.status(201).json(req.body);
});

router.delete('/restaurants/:id', (req, res) => {
    deleteRestaurant(req.params.id);
    res.status(204).end();
});

export default router;
