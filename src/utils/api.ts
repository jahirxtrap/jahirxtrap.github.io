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
  project_type: string;
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
  summary: string;
  downloadCount: number;
  classId: number;
  logo: { url: string } | null;
  links: {
    websiteUrl: string;
    sourceUrl: string;
    issuesUrl: string;
  };
  authors: { id: number; name: string }[];
  categories: { id: number; name: string; classId: number }[];
}

// Merged project from both platforms
export interface MergedProject {
  title: string;
  description: string;
  icon_url: string;
  project_type: 'mod' | 'resourcepack';
  mrDownloads: number;
  cfDownloads: number;
  totalDownloads: number;
  loaders: string[];
  mrUrl: string | null;
  cfUrl: string | null;
  linkUrl: string; // primary link (MR first, CF fallback)
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

export async function fetchCurseForgeByAuthor(knownProjectName: string): Promise<CurseForgeProject[]> {
  if (!CURSEFORGE_KEY) return [];
  try {
    // Find author ID from a known project
    const searchRes = await fetch(`${CURSEFORGE_BASE}/mods/search?gameId=432&searchFilter=${encodeURIComponent(knownProjectName)}&pageSize=1`, {
      headers: { 'x-api-key': CURSEFORGE_KEY },
    });
    if (!searchRes.ok) return [];
    const searchData = await searchRes.json();
    const authorId = searchData.data?.[0]?.authors?.[0]?.id;
    if (!authorId) return [];

    // Fetch all projects by author
    const res = await fetch(`${CURSEFORGE_BASE}/mods/search?gameId=432&authorId=${authorId}&pageSize=50&sortField=2&sortOrder=desc`, {
      headers: { 'x-api-key': CURSEFORGE_KEY },
    });
    if (!res.ok) return [];
    const data = await res.json();
    return data.data || [];
  } catch {
    return [];
  }
}

function normalizeName(name: string): string {
  return name.toLowerCase().replace(/[^a-z0-9]/g, '');
}

// classId 6 = Mods, classId 12 = Resource Packs, classId 6552 = Texture Packs (old)
function cfClassToType(classId: number): 'mod' | 'resourcepack' {
  return classId === 6 ? 'mod' : 'resourcepack';
}

export async function fetchMergedProjects(modrinthUser: string, cfKnownProject: string): Promise<{ projects: MergedProject[]; totalMr: number; totalCf: number }> {
  const [mrProjects, cfProjects] = await Promise.all([
    fetchModrinthProjects(modrinthUser),
    fetchCurseForgeByAuthor(cfKnownProject),
  ]);

  const merged: MergedProject[] = [];
  const matchedCfIds = new Set<number>();

  // Start with Modrinth projects (primary)
  for (const mr of mrProjects) {
    const mrNorm = normalizeName(mr.title);
    const cf = cfProjects.find(c => normalizeName(c.name) === mrNorm);

    if (cf) matchedCfIds.add(cf.id);

    merged.push({
      title: mr.title,
      description: mr.description,
      icon_url: mr.icon_url,
      project_type: mr.project_type === 'resourcepack' ? 'resourcepack' : 'mod',
      mrDownloads: mr.downloads,
      cfDownloads: cf?.downloadCount || 0,
      totalDownloads: mr.downloads + (cf?.downloadCount || 0),
      loaders: mr.loaders || [],
      mrUrl: `https://modrinth.com/${mr.project_type === 'resourcepack' ? 'resourcepack' : 'mod'}/${mr.slug}`,
      cfUrl: cf?.links.websiteUrl || null,
      linkUrl: `https://modrinth.com/${mr.project_type === 'resourcepack' ? 'resourcepack' : 'mod'}/${mr.slug}`,
    });
  }

  // Add CF-only projects
  for (const cf of cfProjects) {
    if (matchedCfIds.has(cf.id)) continue;

    merged.push({
      title: cf.name,
      description: cf.summary,
      icon_url: cf.logo?.url || '',
      project_type: cfClassToType(cf.classId),
      mrDownloads: 0,
      cfDownloads: cf.downloadCount,
      totalDownloads: cf.downloadCount,
      loaders: [],
      mrUrl: null,
      cfUrl: cf.links.websiteUrl,
      linkUrl: cf.links.websiteUrl,
    });
  }

  const totalMr = merged.reduce((sum, p) => sum + p.mrDownloads, 0);
  const totalCf = merged.reduce((sum, p) => sum + p.cfDownloads, 0);

  // Sort by total downloads
  merged.sort((a, b) => b.totalDownloads - a.totalDownloads);

  return { projects: merged, totalMr, totalCf };
}

export function formatDownloads(n: number): string {
  if (n >= 1_000_000) return (n / 1_000_000).toFixed(1) + 'M';
  if (n >= 1_000) return (n / 1_000).toFixed(1) + 'K';
  return n.toString();
}
