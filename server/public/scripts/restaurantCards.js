document.addEventListener('DOMContentLoaded', () => {
    const restaurantsGrid = document.querySelector('.restaurants-grid');

    if (restaurantsGrid) {
        restaurantsGrid.addEventListener('click', async (event) => {
            if (event.target.classList.contains('delete-btn')) {
                const restaurantId = event.target.dataset.id;

                try {
                    const response = await fetch(`/api/restaurants/${restaurantId}`, {
                        method: 'DELETE',
                    });

                    if (response.ok) {
                        const restaurantCard = document.getElementById(`restaurant-${restaurantId}`);
                        if (restaurantCard) {
                            restaurantCard.remove();
                        }
                    } else {
                        console.error('Failed to delete restaurant');
                    }
                } catch (error) {
                    console.error('Error:', error);
                }
            }
        });
    }
});
