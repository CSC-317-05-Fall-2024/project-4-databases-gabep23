document.addEventListener('DOMContentLoaded', () => {
    const header = document.querySelector('header');
    if (header) {
      header.innerHTML = `
        <h1>New York City Travel Guide</h1>
      `;
    }

    console.log('Header.js loaded');
  
    const nav = document.querySelector('nav');
    if (nav) {
      nav.innerHTML = 
        <ul>
          <li><a href="/">Home</a></li>
          <li><a href="/attractions">Attractions</a></li>
          <li><a href="/restaurants">Restaurants</a></li>
          <li><a href="/newRestaurants">Add New Restaurant</a></li> 
        </ul>
      ;
    }
  
    const footer = document.querySelector('footer');
    if (footer) {
      footer.innerHTML = 
        <p>Contact Info: <a href="mailto:gabep23x@gmail.com"> gabep23x@gmail.com</a></p>
      ;
    }
  });