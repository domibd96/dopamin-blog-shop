// sport.js
class SportArticles {
  constructor() {
    this.articles = [];
    this.currentFilter = 'all';
    this.init();
  }

  async init() {
    await this.loadArticles();
    this.renderArticles();
    this.setupFilters();
  }

  async loadArticles() {
    try {
      const response = await fetch('data/sport-articles.json'); // Pfad ohne ../
      this.articles = await response.json();
      this.articles.sort((a, b) => new Date(b.date) - new Date(a.date));
    } catch (error) {
      console.error('Fehler beim Laden der Artikel:', error);
    }
  }

  renderArticles() {
    const container = document.getElementById('articleContainer');
    container.innerHTML = '';

    this.articles
      .filter(article =>
        this.currentFilter === 'all' ||
        article.tags.includes(this.currentFilter)
      )
      .forEach(article => {
        const articleEl = document.createElement('article');
        articleEl.className = 'article-card';
        // Damit ein absolut positionierter Button (falls benötigt) den Artikel überdecken kann.
        articleEl.style.position = 'relative';
        articleEl.innerHTML = `
          <div class="article-image" style="background-image: url('${article.image}')"></div>
          <div class="article-content">
            <span class="article-date">
              ${new Date(article.date).toLocaleDateString('de-DE', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </span>
            <h3>${article.title}</h3>
            <p>${article.excerpt}</p>
            <div class="article-tags">
              ${article.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
            </div>
          </div>
        `;

        // Der Klick-Handler wird am gesamten Artikel registriert.
        articleEl.addEventListener('click', () => {
          window.location.href = article.url;
        });

        container.appendChild(articleEl);
      });
  }

  setupFilters() {
    document.querySelectorAll('.filter-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelector('.filter-btn.active').classList.remove('active');
        btn.classList.add('active');
        this.currentFilter = btn.dataset.filter;
        this.renderArticles();
      });
    });
  }
}

// Initialisierung
document.addEventListener('DOMContentLoaded', () => new SportArticles());

// NAVIGATION BUTTONS
// Nur die direkten Kinder von .nav-links werden berücksichtigt.
document.querySelectorAll('.nav-links > .invisible-click-area').forEach(button => {
  button.addEventListener('click', function() {
    const link = this.nextElementSibling;
    if (link && link.tagName === 'A') {
      if (link.getAttribute('href').startsWith('#')) {
        window.location.hash = link.getAttribute('href');
      } else {
        window.location.href = link.getAttribute('href');
      }
    }
  });
});
