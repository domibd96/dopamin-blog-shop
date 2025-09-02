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
          const response = await fetch('data/kunst-articles.json'); // Pfad ohne ../
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
          articleEl.innerHTML = `
            <div class="article-image" 
                 style="background-image: url('${article.image}')">
              <button class="invisible-click-area" 
                      aria-label="Artikel lesen: ${article.title}"></button>
            </div>
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
                ${article.tags.map(tag => `
                  <span class="tag">${tag}</span>`).join('')}
              </div>
            </div>
          `;
  
          articleEl.querySelector('.invisible-click-area')
            .addEventListener('click', () => {
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
document.querySelectorAll('.nav-links .invisible-click-area').forEach(button => {
  button.addEventListener('click', function() {
    // Finde den zugehörigen Link
    const link = this.nextElementSibling;
    if (link && link.tagName === 'A') {
      // Spezialfall für Blog (Anchor-Link)
      if(link.getAttribute('href').startsWith('#')) {
        window.location.hash = link.getAttribute('href');
      } else {
        window.location.href = link.getAttribute('href');
      }
    }
  });
});
