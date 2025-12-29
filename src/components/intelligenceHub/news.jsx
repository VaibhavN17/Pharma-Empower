import { useEffect, useState } from "react";
import { newsAPI } from "../../services/api";
import "./news.css";

export default function News() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadNews();
  }, []);

  const loadNews = async () => {
    try {
      const res = await newsAPI.getNews(); // from DB
      setNews(res.data);
    } catch (error) {
      console.error("Failed to load news", error);
    } finally {
      setLoading(false);
    }
  };
 
  return (
    <div className="news-page">
      {/* Header */}
      <div className="news-header">
        <h1>Pharma Intelligence Hub</h1>
        <p>Latest insights from the pharmaceutical industry</p>
      </div>

      {/* Loading */}
      {loading && <p className="loading-text">Loading latest news...</p>}

      {/* Empty */}
      {!loading && news.length === 0 && (
        <p className="empty-text">No news available</p>
      )}

      {/* News Grid */}
      <div className="news-grid">
        {news.map((item) => (
          <div className="news-card" key={item.id}>
            {item.image_url ? (
              <img src={item.image_url} alt="news" />
            ) : (
              <div className="no-image">No Image</div>
            )}

            <div className="news-content">
              <h3>{item.title}</h3>
              <p>{item.description}</p>

              <a
                href={item.url}
                target="_blank"
                rel="noreferrer"
                className="read-more"
              >
                Read full article →
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
