const MODRINTH_BASE = 'https://api.modrinth.com/v2';
const CURSEFORGE_BASE = 'https://api.curseforge.com/v1';
const GITHUB_BASE = 'https://api.github.com';
const CURSEFORGE_KEY = import.meta.env.PUBLIC_CURSEFORGE_API_KEY || '';

export interface GitHubUser {
  login: string;
  name: string;
  bio: string;
  avatar_url: string;
  html_url: string;
  public_repos: number;
}

export interface ModrinthProject {
  slug: string;
  title: string;
  description: string;
  icon_url: string;
  downloads: number;
  categories: string[];
  game_versions: string[];
  loaders: string[];
  source_url: string;
  issues_url: string;
  wiki_url: string;
  gallery: { url: string; title: string }[];
  body: string;
}

export interface CurseForgeProject {
  id: number;
  name: string;
  downloadCount: number;
  links: {
    websiteUrl: string;
    sourceUrl: string;
    issuesUrl: string;
  };
}

export async function fetchGitHubUser(username: string): Promise<GitHubUser | null> {
  try {
    const res = await fetch(`${GITHUB_BASE}/users/${username}`);
    if (!res.ok) return null;
    return await res.json();
  } catch {
    return null;
  }
}

export async function fetchModrinthProjects(userId: string): Promise<ModrinthProject[]> {
  try {
    const res = await fetch(`${MODRINTH_BASE}/user/${userId}/projects`);
    if (!res.ok) return [];
    return await res.json();
  } catch {
    return [];
  }
}

export async function fetchModrinthProject(slug: string): Promise<ModrinthProject | null> {
  try {
    const res = await fetch(`${MODRINTH_BASE}/project/${slug}`);
    if (!res.ok) return null;
    return await res.json();
  } catch {
    return null;
  }
}

export async function fetchCurseForgeSearch(name: string): Promise<CurseForgeProject | null> {
  if (!CURSEFORGE_KEY) return null;
  try {
    const res = await fetch(`${CURSEFORGE_BASE}/mods/search?gameId=432&searchFilter=${encodeURIComponent(name)}&sortField=2&sortOrder=desc`, {
      headers: {'x-api-key': CURSEFORGE_KEY},
    });
    if (!res.ok) return null;
    const data = await res.json();
    return data.data?.[0] || null;
  } catch {
    return null;
  }
}

export function formatDownloads(n: number): string {
  if (n >= 1_000_000) return (n / 1_000_000).toFixed(1) + 'M';
  if (n >= 1_000) return (n / 1_000).toFixed(1) + 'K';
  return n.toString();
}
