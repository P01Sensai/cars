import { NextResponse } from 'next/server';
import Parser from 'rss-parser';

const parser = new Parser({
  customFields: {
    item: [
      ['media:content', 'mediaContent'],
      ['description', 'description']
    ]
  },
  headers: {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
  }
});

export const revalidate = 3600; // Cache for 1 hour

export async function GET() {
  try {
    // Autocar India RSS Feed
    const feed = await parser.parseURL('https://www.autocarindia.com/rss/news');

    const articles = feed.items.slice(0, 8).map((item) => {
      // Try to extract an image from the description if media:content is missing
      let imageUrl = null;
      if (item.mediaContent && item.mediaContent.$ && item.mediaContent.$.url) {
        imageUrl = item.mediaContent.$.url;
      } else if (item.content) {
        const imgMatch = item.content.match(/<img[^>]+src="([^">]+)"/);
        if (imgMatch) imageUrl = imgMatch[1];
      }

      // Clean up description
      let cleanDesc = item.contentSnippet || item.description || "";
      cleanDesc = cleanDesc.replace(/<[^>]*>?/gm, '').substring(0, 150) + '...';

      return {
        id: item.guid || item.link,
        title: item.title,
        link: item.link,
        pubDate: item.pubDate,
        description: cleanDesc,
        image: imageUrl || "/safari-dark-hero.jpg" // fallback image
      };
    });

    return NextResponse.json({ articles });
  } catch (error) {
    console.error("RSS Fetch Error:", error);
    
    // Fallback Mock Data so the UI never breaks
    const fallbackArticles = [
      {
        id: "1",
        title: "The Future of EVs in the Indian Market by 2026",
        link: "#",
        pubDate: new Date().toISOString(),
        description: "A deep dive into how new battery technologies are shaping the future of electric vehicles in India.",
        image: "/nexon-hero.jpg"
      },
      {
        id: "2",
        title: "Mahindra's New Off-Road Platform Details Leaked",
        link: "#",
        pubDate: new Date().toISOString(),
        description: "Exclusive details on the upcoming architecture that will underpin the next generation of rugged SUVs.",
        image: "/scorpio-hero.jpg"
      },
      {
        id: "3",
        title: "Tata Safari Dark Edition Breaks Sales Records",
        link: "#",
        pubDate: new Date().toISOString(),
        description: "The stealthy SUV has seen unprecedented demand in urban markets this quarter.",
        image: "/safari-dark-hero.jpg"
      }
    ];
    
    return NextResponse.json({ articles: fallbackArticles });
  }
}
