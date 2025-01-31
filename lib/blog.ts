import fs from "fs";
import path from "path";
import matter from "gray-matter";

export interface Article {
  id: string;
  title: string;
  image?: string;
  tldr?: string;
  content: string;
  date: string;
  authors?: string[];
  signature?: string;
  publicKey?: string;
  hash?: string;
}

const postsDirectory = path.join(process.cwd(), "data/reports-blog");

// Get all articles from /posts
export function getBlogPosts() {
  // Get file names under /posts
  const fileNames = fs.readdirSync(postsDirectory);
  const allPostsData = fileNames.map((fileName) => {
    // Remove ".md" from file name to get id
    const id = fileName.replace(/\.md$/, "");
    if (id.toLowerCase() === "readme") {
      return null;
    }

    // Read markdown file as string
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, "utf8");

    // Use gray-matter to parse the post metadata section
    const matterResult = matter(fileContents);

    // Combine the data with the id
    return {
      id,
      ...matterResult.data,
      content: matterResult.content,
    };
  });
  // Sort posts by date
  return allPostsData.filter(Boolean).sort((a: any, b: any) => {
    if (a.date < b.date) {
      return 1;
    } else {
      return -1;
    }
  }) as Article[];
}

export function getBlogPostById(slug?: string) {
  const blogPosts = getBlogPosts();

  return blogPosts.find((blogPost) => blogPost.id === slug);
}

const lib = { getBlogPosts, getBlogPostById };

export default lib;