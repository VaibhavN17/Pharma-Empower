

const cron = require("node-cron");
const axios = require("axios");
const pool = require("../config/db");

const TITLE_KEYWORDS = [
  // Core pharma terms
  "pharma",
  "pharmaceutical",
  "pharmaceutical industry",
  "pharmacy",
  "pharmacist",
  "pharmacology",
  // Drug development & research
  "drug development",
  "drug discovery",
  "medicine",
  "medication",
  "clinical",
  "clinical research",
  "clinical trial",
  "research",
  "R&D",
  "pharmaceutical research",
  // Regulatory & approvals
  "fda",
  "FDA approval",
  "regulatory",
  "regulatory affairs",
  "drug approval",
  "indication",
  "NDA",
  "BLA",
  // Biotechnology
  "biotech",
  "biotechnology",
  "biologics",
  "biosimilars",
  // Manufacturing & production
  "pharmaceutical manufacturing",
  "drug manufacturing",
  "formulation",
  "GMP",
  "quality control",
  "production",
  // Therapeutic areas
  "therapy",
  "therapeutic",
  "oncology",
  "cancer treatment",
  "vaccine",
  "vaccination",
  "immun",
  "antibiotic",
  "antiviral",
  // Scientific terms
  "molecule",
  "compound",
  "API",
  "active pharmaceutical ingredient",
  "patent",
  "medicinal chemistry",
  "pharmacokinetics",
  "pharmacodynamics",
  // Industry development
  "development",
  "discovery",
  "innovation",
  "pharmaceutical innovation",
  // Job market terms
  "pharma jobs",
  "pharmaceutical jobs",
  "pharmacy jobs",
  "pharma careers",
  "pharmaceutical careers",
  "clinical research jobs",
  "regulatory affairs jobs",
  "pharma hiring",
  "pharmaceutical industry jobs",
];

// Pharma-focused domains (industry news & job market)
const PHARMA_DOMAINS = [
  "pharmatimes.com",
  "pharmaceutical-technology.com",
  "fiercepharma.com",
  "pharmafile.com",
  "biospace.com",
  "genengnews.com",
  "statnews.com",
  "pharmalive.com",
  "pharmexec.com",
  "outcomeresearch.com",
  "pharmaceutical-journal.com",
];

const fetchPharmaNews = async () => {
  try {
    // 🧹 Clear old data
    await pool.execute("TRUNCATE TABLE pharma_news");

    const allArticles = [];
    const seenUrls = new Set();

    // Multiple search queries focused on pharma industry & job market
    const searchQueries = [
      // Pharmaceutical industry developments
      "pharmaceutical industry development OR pharma industry news OR pharmaceutical manufacturing",
      // Drug development & research
      "pharmaceutical research AND development OR drug discovery pharmaceutical OR R&D pharma",
      // Clinical trials and regulatory approvals
      "clinical trial pharmaceutical OR FDA drug approval OR pharmaceutical regulatory approval",
      // Pharmacy and pharmaceutical education
      "pharmacy development OR pharmacist role OR pharmaceutical education",
      // Pharmaceutical manufacturing and technology
      "pharmaceutical manufacturing technology OR drug production innovation OR pharma manufacturing",
      // Job market and careers in pharma
      "pharmaceutical jobs OR pharma careers OR pharmaceutical industry hiring OR pharmacy job market",
      // Rising pharma job trends
      "pharmaceutical industry employment OR pharma job growth OR pharmaceutical career opportunities",
      // Biotechnology and biologics
      "biotech pharmaceutical OR biologics development OR pharmaceutical biotechnology",
      // Pharmaceutical innovation and patents
      "pharmaceutical innovation OR drug patent pharmaceutical OR pharma breakthrough",
    ];

    // Calculate date from 7 days ago for recent news
    const dateFrom = new Date();
    dateFrom.setDate(dateFrom.getDate() - 7);
    const dateFromStr = dateFrom.toISOString().split("T")[0];

    // Fetch articles with multiple queries
    for (const query of searchQueries) {
      try {
        const res = await axios.get("https://newsapi.org/v2/everything", {
          params: {
            q: query,
            language: "en",
            sortBy: "publishedAt",
            pageSize: 100, // Max allowed per request
            from: dateFromStr, // Last 7 days
            apiKey: process.env.NEWS_API_KEY,
          },
        });

        if (res.data.articles) {
          res.data.articles.forEach((article) => {
            // Skip duplicates
            if (article.url && !seenUrls.has(article.url)) {
              seenUrls.add(article.url);
              allArticles.push(article);
            }
          });
        }
      } catch (queryError) {
        console.error(`Error fetching query "${query}":`, queryError.message);
      }
    }

    // Also try fetching from pharma-specific domains
    try {
      const res = await axios.get("https://newsapi.org/v2/everything", {
        params: {
          domains: PHARMA_DOMAINS.join(","),
          language: "en",
          sortBy: "publishedAt",
          pageSize: 100,
          from: dateFromStr,
          apiKey: process.env.NEWS_API_KEY,
        },
      });

      if (res.data.articles) {
        res.data.articles.forEach((article) => {
          if (article.url && !seenUrls.has(article.url)) {
            seenUrls.add(article.url);
            allArticles.push(article);
          }
        });
      }
    } catch (domainError) {
      console.error("Error fetching from domains:", domainError.message);
    }

    console.log(`📰 Total articles fetched: ${allArticles.length}`);

    // Filter articles - prioritize pharma/pharmacy specific content
    const filteredArticles = allArticles.filter((article) => {
      if (!article.title && !article.description) return false;

      const title = (article.title || "").toLowerCase();
      const description = (article.description || "").toLowerCase();
      const combinedText = `${title} ${description}`;

      // Must contain at least one pharma-related keyword
      const hasPharmaKeyword = TITLE_KEYWORDS.some((keyword) =>
        combinedText.includes(keyword.toLowerCase())
      );

      // Exclude non-pharma content (sports, entertainment, etc.) unless explicitly pharma-related
      const excludeKeywords = [
        "sports",
        "entertainment",
        "celebrity",
        "movie",
        "music",
        "gaming",
        "crypto",
        "bitcoin",
        "sports betting",
      ];
      const hasExcludeKeyword = excludeKeywords.some(
        (keyword) =>
          combinedText.includes(keyword) &&
          !combinedText.includes("pharma") &&
          !combinedText.includes("pharmaceutical")
      );

      return hasPharmaKeyword && !hasExcludeKeyword;
    });

    // Sort by published date (newest first) and take more articles
    filteredArticles.sort((a, b) => {
      const dateA = new Date(a.publishedAt || 0);
      const dateB = new Date(b.publishedAt || 0);
      return dateB - dateA;
    });

    // Keep top 50 articles instead of just 10
    const finalArticles = filteredArticles.slice(0, 50);

    console.log(`📰 Filtered pharma articles: ${filteredArticles.length}`);
    console.log(`📰 Final pharma articles to store: ${finalArticles.length}`);

    // Store articles
    for (const article of finalArticles) {
      try {
        await pool.execute(
          `INSERT INTO pharma_news
           (title, description, image_url, url, published_at)
           VALUES (?, ?, ?, ?, ?)`,
          [
            article.title || "No title",
            article.description || "",
            article.urlToImage || null,
            article.url || "",
            article.publishedAt ? new Date(article.publishedAt) : new Date(),
          ]
        );
      } catch (insertError) {
        console.error("Error inserting article:", insertError.message);
      }
    }

    console.log(
      `✅ ${finalArticles.length} pharmaceutical industry news & job market articles stored`
    );
  } catch (error) {
    console.error("❌ News cron failed:", error.message);
  }
};

cron.schedule("0 */8 * * *", fetchPharmaNews);
fetchPharmaNews();

module.exports = fetchPharmaNews;