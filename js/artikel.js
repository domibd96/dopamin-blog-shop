document.addEventListener('DOMContentLoaded', async () => {
  try {
    // Lade die JSON-Datei mit den Artikeln
    const response = await fetch('../../data/sport-articles.json');
    if (!response.ok) throw new Error(`HTTP-Fehler: ${response.status}`);
    
    const articles = await response.json();

    // Bestimme den aktuellen Artikel anhand des URL-Endes
    const currentArticleUrl = window.location.pathname.split('/').pop();
    const articleData = articles.find(article => article.url.endsWith(currentArticleUrl));
    if (!articleData) throw new Error('Artikel nicht gefunden');

    // Setze die Header-Inhalte
    document.getElementById('articleTitle').textContent = articleData.title;
    document.getElementById('articleDate').textContent = articleData.date;
    document.getElementById('readingTime').textContent = articleData.reading_time;
    document.getElementById('articleAuthor').textContent = articleData.author;
    
    // Bild einfügen – das vorhandene img-Element wird mit der richtigen Quelle und Alt-Beschreibung versehen.
    document.getElementById('articleImage').src = `../../${articleData.image}`;
    document.getElementById('articleImage').alt = `Bild zu ${articleData.title}`;

    // Setze den Artikeltext
    // Hinweis: Falls articleData.content einen Dateipfad darstellt, müsste hier ein zusätzlicher fetch erfolgen.
    // Hier gehen wir davon aus, dass articleData.content den eigentlichen HTML/Text-Inhalt enthält.
    document.getElementById('articleContent').innerHTML = articleData.content;

  } catch (error) {
    console.error('Fehler:', error);
    document.getElementById('articleContent').innerHTML = `<p class="error">Artikel konnte nicht geladen werden: ${error.message}</p>`;
  }
});
