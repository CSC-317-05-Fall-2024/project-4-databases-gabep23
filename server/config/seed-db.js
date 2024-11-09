import { pool } from './database.js';

const dropTables = async () => {
    try {
        await pool.query('DROP TABLE IF EXISTS reviews;');
        console.log("Dropped reviews table.");
        await pool.query('DROP TABLE IF EXISTS restaurants;');
        console.log("Dropped restaurants table.");
    } catch (error) {
        console.log("Error dropping tables:", error);
    }
};

const createTables = async () => {
    try {
        const createRestaurantsTableQuery = `
            CREATE TABLE IF NOT EXISTS restaurants (
                id SERIAL PRIMARY KEY,
                name VARCHAR(255) NOT NULL,
                phone VARCHAR(20),
                address VARCHAR(255),
                photo VARCHAR(255)
            );
        `;
        
        const createReviewsTableQuery = `
            CREATE TABLE IF NOT EXISTS reviews (
                id SERIAL PRIMARY KEY,
                rating INTEGER NOT NULL,
                content TEXT,
                restaurant_id INTEGER REFERENCES restaurants(id) ON DELETE CASCADE
            );
        `;

        await pool.query(createRestaurantsTableQuery);
        console.log("Created restaurants table.");

        await pool.query(createReviewsTableQuery);
        console.log("Created reviews table.");
    } catch (error) {
        console.log("Error creating tables:", error);
    }
};



const insertData = async () => {
    try {
        const insertRestaurantsQuery = `
            INSERT INTO restaurants (name, phone, address, photo) VALUES
                ('Tatiana by Kwame Onwuachi', '(212) 875-5222', '10 Lincoln Center Plaza', '/images/Restaurant1.jpg'),
                ('Blanca', '(347) 799-2807', '4261 Moore Street', '/images/Restaurant2.jpg'),
                ('Le Bernardin', '(212) 554-1515', '155 West 51st Street', '/images/Restaurant3.jpg'),
                ('Atomix', NULL, '104 East 30th Street', '/images/Restaurant4.jpg'),
                ('Via Carota', '(212) 255-1962', '51 Grove Street', '/images/Restaurant5.jpg'),
                ('La Piraña Lechonera', NULL, '766 East 152nd Street', '/images/Restaurant6.jpg');
        `;
        await pool.query(insertRestaurantsQuery);
        console.log("Inserted initial restaurant data.");

        const insertReviewsQuery = `
            INSERT INTO reviews (rating, content, restaurant_id) VALUES
                (5, 'Amazing food and atmosphere!', 1),
                (4, 'Great service, but a bit pricey.', 1),
                (3, 'Good food but slow service.', 2),
                (5, 'An unforgettable dining experience!', 3);
        `;
        await pool.query(insertReviewsQuery);
        console.log("Inserted initial review data.");
    } catch (error) {
        console.log("Error inserting data:", error);
    }
};

const setup = async () => {
    await dropTables();
    await createTables();
    await insertData();
    console.log("Database setup complete.");
}

setup();
