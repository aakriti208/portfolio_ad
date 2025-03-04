import type { Site, Page, Links, Socials } from "@types"

// Global
export const SITE: Site = {
  TITLE: "Aakriti Dhakal",
  DESCRIPTION: "Welcome to Aakriti Dhakal, a portfolio and blog for designers and developers.",
  AUTHOR: "Aakriti Dhakal",
}

// Work Page
export const WORK: Page = {
  TITLE: "Work",
  DESCRIPTION: "Places I have worked.",
}

// Blog Page
export const BLOG: Page = {
  TITLE: "Blog",
  DESCRIPTION: "Writing on topics I am passionate about.",
}

// Projects Page 
export const PROJECTS: Page = {
  TITLE: "Projects",
  DESCRIPTION: "Recent projects I have worked on.",
}

// Search Page
export const SEARCH: Page = {
  TITLE: "Search",
  DESCRIPTION: "Search all posts and projects by keyword.",
}

// Links
export const LINKS: Links = [
  { 
    TEXT: "Home", 
    HREF: "/", 
  },
  { 
    TEXT: "Work", 
    HREF: "/work", 
  },
  // { 
  //   TEXT: "Blog", 
  //   HREF: "/blog", 
  // },
  { 
    TEXT: "Projects", 
    HREF: "/projects", 
  },
]

// Socials
export const SOCIALS: Socials = [
  { 
    NAME: "Email",
    ICON: "email", 
    TEXT: "aakritidh208@gmail.com",
    HREF: "mailto:aakritidh208@gmail.com",
  },
  { 
    NAME: "Github",
    ICON: "github",
    TEXT: "aakriti208",
    HREF: "https://github.com/aakriti208"
  },
  { 
    NAME: "LinkedIn",
    ICON: "linkedin",
    TEXT: "aakriti-dhakal",
    HREF: "https://www.linkedin.com/in/aakriti-dhakal/",
  },
  { 
    NAME: "Twitter",
    ICON: "twitter-x",
    TEXT: "vsre_208",
    HREF: "https://twitter.com/vsre_208",
  },
]

