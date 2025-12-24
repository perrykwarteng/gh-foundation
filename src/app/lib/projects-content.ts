export type StrapiImage = {
  url?: string;
  alternativeText?: string | null;
  caption?: string | null;

  formats?: {
    large?: { url?: string; width?: number; height?: number };
    medium?: { url?: string; width?: number; height?: number };
    small?: { url?: string; width?: number; height?: number };
    thumbnail?: { url?: string; width?: number; height?: number };
    [key: string]:
      | { url?: string; width?: number; height?: number }
      | undefined;
  };
};

type RichTextChild = { text?: string };
type RichTextNode = { type?: string; children?: RichTextChild[] };

// ✅ UPDATED to match your API fields
export type ProjectApiItem = {
  id?: number;
  title?: string;
  description?: string;
  slug?: string;

  // API fields you showed
  goalAmount?: string; // "5000 USD"
  raisedAmount?: string; // "100 USD"
  numberOfDonations?: string; // "1"

  coverImage?: StrapiImage | null;

  content?: Array<{
    __component?: string;
    id?: number;
    text?: string;
    content?: RichTextNode[];
    image?: StrapiImage | null;
  }>;
};

export type ProjectsApiResponse = {
  data?: ProjectApiItem[];
  meta?: unknown;
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

function getBaseApiRaw() {
  return (process.env.NEXT_PUBLIC_BASE_API || "").trim().replace(/\/$/, "");
}

function getApiBase() {
  return getBaseApiRaw();
}

function getOriginBase() {
  const base = getBaseApiRaw();
  return base.endsWith("/api") ? base.slice(0, -4) : base;
}

function joinApi(endpointPath: string) {
  const apiBase = getApiBase();
  if (!apiBase) return endpointPath;

  const hasApiSuffix = apiBase.endsWith("/api");
  const endpointHasApiPrefix = endpointPath.startsWith("/api/");

  if (hasApiSuffix && endpointHasApiPrefix) {
    return `${apiBase}${endpointPath.replace("/api", "")}`;
  }

  return `${apiBase}${endpointPath}`;
}

export function strapiAssetUrl(path?: string) {
  if (!path) return "";
  if (path.startsWith("http://") || path.startsWith("https://")) return path;

  const normalized = path.startsWith("/api/uploads/")
    ? path.replace("/api", "")
    : path;

  const origin = getOriginBase();
  if (!origin) return normalized;

  return normalized.startsWith("/")
    ? `${origin}${normalized}`
    : `${origin}/${normalized}`;
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

function setCached(data: ProjectsApiResponse): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(CACHE_KEY, JSON.stringify(data));
  } catch {}
}

function pickBestImageUrl(img?: StrapiImage | null) {
  if (!img) return "";
  const fmts = img.formats;

  const preferred =
    fmts?.large?.url ||
    fmts?.medium?.url ||
    fmts?.small?.url ||
    fmts?.thumbnail?.url ||
    img.url ||
    "";

  return strapiAssetUrl(preferred);
}

type ParagraphBlock = {
  __component?: string;
  content?: RichTextNode[];
};

function extractFirstTextFromContent(block?: ParagraphBlock | null): string {
  const nodes = block?.content ?? [];
  const joined = nodes
    .map((p) =>
      (p?.children ?? []).map((c) => (c?.text ? String(c.text) : "")).join("")
    )
    .join("\n")
    .trim();

  return joined || "";
}

// ✅ Parses "5000 USD" -> 5000, "1" -> 1, "₵5,000" -> 5000
function parseAmount(value?: string | number | null): number {
  if (typeof value === "number") return Number.isFinite(value) ? value : 0;
  if (!value) return 0;

  const cleaned = String(value)
    .replace(/,/g, "")
    .match(/-?\d+(\.\d+)?/);

  return cleaned ? Number(cleaned[0]) : 0;
}

export function mapProjectsApiToProjects(json: ProjectsApiResponse): Project[] {
  const arr = json?.data ?? [];

  return arr
    .filter(
      (p): p is ProjectApiItem & { id: number } => typeof p?.id === "number"
    )
    .map((p) => {
      const id = p.id;

      const title = (p.title || "").trim() || `Project ${id}`;

      const desc =
        (p.description || "").trim() ||
        (() => {
          const firstParagraph = (p.content || []).find(
            (b): b is ParagraphBlock => b?.__component === "blocks.paragraph"
          );
          return firstParagraph
            ? extractFirstTextFromContent(firstParagraph)
            : "";
        })() ||
        "Learn more about this project.";

      const image = pickBestImageUrl(p.coverImage) || "/images/project1.jpeg";

      // ✅ Use your API fields
      const goal = parseAmount(p.goalAmount);
      const raised = parseAmount(p.raisedAmount);
      const donations = parseAmount(p.numberOfDonations);

      return { id, image, title, description: desc, goal, raised, donations };
    });
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
    // ✅ You only need coverImage + content if you display it
    const endpoint =
      "/projects?populate[coverImage][populate]=*&populate[content][on][blocks.heading][populate]=*&populate[content][on][blocks.paragraph]=*&populate[content][on][blocks.paragraph-with-image][populate]=*&populate[content][on][elements.link]=*";

    const url = joinApi(endpoint);

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
