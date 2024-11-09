import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { getRestaurants, getRestaurant, createRestaurant, deleteRestaurant, getReviewsForRestaurant } from './data/restaurants.js';

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.set('view engine', 'ejs');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// static files 
app.use(express.static(path.join(__dirname, 'public')));
app.use('/styles.css', express.static(path.join(__dirname, 'styles.css')));
app.use('/scripts', express.static(path.join(__dirname, 'scripts')));
app.use('/images', express.static(path.join(__dirname, 'public', 'images')));

// Routes
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html')); 
});

app.get('/attractions', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'attractions.html'));
});

app.get('/restaurants', async (req, res) => {
    try {
        const restaurants = await getRestaurants();
        res.render('restaurants', { restaurants });
    } catch (error) {
        console.error('Error fetching restaurants:', error);
        res.status(500).send('Internal Server Error');
    }
});

app.get('/restaurants/:id', async (req, res) => {
    try {
        const restaurantId = req.params.id;
        const restaurant = await getRestaurant(restaurantId);
        const reviews = await getReviewsForRestaurant(restaurantId);

        if (restaurant) {
            res.render('restaurant-details', { restaurant, reviews });
        } else {
            res.status(404).send('Restaurant not found');
        }
    } catch (error) {
        console.error('Error fetching restaurant details:', error);
        res.status(500).send('Internal Server Error');
    }
});

app.get('/newRestaurants', (req, res) => {
    res.render('newRestaurants');
});

app.post('/newRestaurants', async (req, res) => {
    try {
        await createRestaurant(req.body);
        res.redirect('/restaurants');
    } catch (error) {
        console.error('Error creating restaurant:', error);
        res.status(500).send('Internal Server Error');
    }
});

// API Routes
app.get('/api/restaurants', async (req, res) => {
    try {
        const restaurants = await getRestaurants();
        res.json(restaurants);
    } catch (error) {
        console.error('Error fetching restaurants:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.get('/api/restaurants/:id', async (req, res) => {
    try {
        const restaurant = await getRestaurant(req.params.id);
        if (restaurant) {
            res.json(restaurant);
        } else {
            res.status(404).json({ error: 'Restaurant not found' });
        }
    } catch (error) {
        console.error('Error fetching restaurant:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.post('/api/restaurants', async (req, res) => {
    try {
        const newRestaurant = await createRestaurant(req.body);
        res.status(201).json(newRestaurant);
    } catch (error) {
        console.error('Error creating restaurant:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.delete('/api/restaurants/:id', async (req, res) => {
    try {
        await deleteRestaurant(req.params.id);
        res.status(204).end();
    } catch (error) {
        console.error('Error deleting restaurant:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
