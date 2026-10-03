import { NextResponse } from 'next/server';
import Parser from 'rss-parser';

const parser = new Parser({
  customFields: {
    item: [
      ['media:content', 'mediaContent'],
      ['description', 'description'],
      ['content:encoded', 'contentEncoded']
    ]
  },
  headers: {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
  }
});

export const revalidate = 3600; // Cache for 1 hour

export async function GET() {
  try {
    // Motorbeam India RSS Feed (More reliable than Autocar)
    const feed = await parser.parseURL('https://www.motorbeam.com/feed/');

    const cheerio = require('cheerio');

    const articles = feed.items.slice(0, 8).map((item) => {
      let imageUrl = null;
      
      // 1. Try standard media content
      if (item.mediaContent && item.mediaContent.$ && item.mediaContent.$.url) {
        imageUrl = item.mediaContent.$.url;
      } 
      // 2. Try Cheerio extraction from HTML content (highly reliable)
      else if (item.contentEncoded || item.content || item.description) {
        const htmlToParse = item.contentEncoded || item.content || item.description || "";
        const $ = cheerio.load(htmlToParse);
        const firstImg = $('img').first().attr('src');
        if (firstImg) {
          imageUrl = firstImg;
        }
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
        image: imageUrl || "/safari-dark-hero.jpg" // Final fallback
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
