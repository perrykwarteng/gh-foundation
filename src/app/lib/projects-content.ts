export type StrapiImage = {
  url?: string;
  alternativeText?: string | null;
  caption?: string | null;
  formats?: Record<string, { url: string; width: number; height: number }>;
};

export type ProjectApiItem = {
  id?: number;
  title?: string;
  description?: string;
  goal?: number;
  raised?: number;
  donations?: number;
  coverImage?: StrapiImage | null;

  content?: Array<{
    __component?: string;
    id?: number;
    text?: string;
    content?: Array<{ type?: string; children?: Array<{ text?: string }> }>;
    image?: StrapiImage;
  }>;
};

export type ProjectsApiResponse = {
  data?: ProjectApiItem[];
  meta?: any;
};

export type Project = {
  id: number;
  image: string;
  title: string;
  description: string;
  goal: number;
  raised: number;
  donations: number;
};

const CACHE_KEY = "projects_page_cache_v1";

function getBaseApi() {
  return (process.env.NEXT_PUBLIC_BASE_API || "").trim().replace(/\/$/, "");
}

function apiUrl(path?: string) {
  if (!path) return "";
  if (path.startsWith("http://") || path.startsWith("https://")) return path;

  const base = getBaseApi();
  if (!base) return path;

  return path.startsWith("/") ? `${base}${path}` : `${base}/${path}`;
}

function safeJsonParse<T>(value: string | null): T | null {
  try {
    if (!value) return null;
    return JSON.parse(value) as T;
  } catch {
    return null;
  }
}

function getCached(): ProjectsApiResponse | null {
  if (typeof window === "undefined") return null;
  return safeJsonParse<ProjectsApiResponse>(localStorage.getItem(CACHE_KEY));
}

function setCached(data: ProjectsApiResponse) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(CACHE_KEY, JSON.stringify(data));
  } catch {
  }
}

function pickBestImageUrl(img?: StrapiImage | null) {
  if (!img) return "";
  const fmts = img.formats || {};
  const preferred =
    fmts.medium?.url || fmts.small?.url || fmts.large?.url || img.url || "";
  return apiUrl(preferred);
}

function extractFirstTextFromContent(content: any): string {
  const nodes = content?.content ?? [];
  const joined = nodes
    .map((p: any) =>
      (p?.children ?? [])
        .map((c: any) => (c?.text ? String(c.text) : ""))
        .join("")
    )
    .join("\n")
    .trim();

  return joined || "";
}

export function mapProjectsApiToProjects(json: ProjectsApiResponse): Project[] {
  const arr = json?.data ?? [];
  const mapped: Project[] = arr
    .filter((p) => typeof p?.id === "number")
    .map((p) => {
      const id = p.id as number;

      const title = (p.title || "").trim() || `Project ${id}`;

      const desc =
        (p.description || "").trim() ||
        (() => {
          const firstParagraph = (p.content || []).find(
            (b: any) => b?.__component === "blocks.paragraph"
          );
          return firstParagraph
            ? extractFirstTextFromContent(firstParagraph)
            : "";
        })() ||
        "Learn more about this project.";

      const image = pickBestImageUrl(p.coverImage) || "/images/project1.jpeg"; // safe local fallback

      const goal = Number(p.goal ?? 0) || 0;
      const raised = Number(p.raised ?? 0) || 0;
      const donations = Number(p.donations ?? 0) || 0;

      return { id, image, title, description: desc, goal, raised, donations };
    });

  return mapped;
}

export const PROJECTS_FALLBACK: Project[] = [
  {
    id: 1,
    image: "/images/project1.jpeg",
    title: "Donation to Schools",
    description:
      "Your contribution will put smiles on faces, light hope in young hearts, and provide the foundation for brighter futures.",
    goal: 47000,
    raised: 0,
    donations: 0,
  },
  {
    id: 2,
    image: "/icons/projectImg2.svg",
    title: "Education for Every Child",
    description:
      "Supporting schools with books, uniforms, and tuition for underprivileged children.",
    goal: 0,
    raised: 0,
    donations: 0,
  },
];

export async function fetchProjects(): Promise<Project[]> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 9000);

  try {
    const endpoint =
      "/projects?populate[coverImage][populate]=*&populate[content][on][blocks.heading][populate]=*&populate[content][on][blocks.paragraph]=*&populate[content][on][blocks.paragraph-with-image][populate]=*&populate[content][on][elements.link]=*";

    const base = getBaseApi();
    const url = base ? `${base}${endpoint}` : endpoint;

    const res = await fetch(url, {
      method: "GET",
      cache: "no-store",
      signal: controller.signal,
    });

    if (!res.ok) throw new Error(`HTTP ${res.status}`);

    const json = (await res.json()) as ProjectsApiResponse;

    if (!json?.data?.length) throw new Error("Bad data");

    setCached(json);

    const mapped = mapProjectsApiToProjects(json);
    return mapped.length ? mapped : PROJECTS_FALLBACK;
  } catch {
    const cached = getCached();
    if (cached?.data?.length) {
      const mapped = mapProjectsApiToProjects(cached);
      if (mapped.length) return mapped;
    }
    return PROJECTS_FALLBACK;
  } finally {
    clearTimeout(timeout);
  }
}
