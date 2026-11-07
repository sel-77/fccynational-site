# Site plan

What the FCCY National Website contains, how its content is stored, how it looks, and the order it ships in. Jira epics match the sections below. Change this file through a PR when the plan changes.

## Pages

| URL | Page | Ships in |
|---|---|---|
| `/` | Home | v1.0.0 |
| `/about` | What is FCCY, Mission & Vision | v1.0.0 |
| `/contact` | Contact form | v1.0.0 |
| `/chapters` | Map of the Philippines + list of active and prospect chapters | v1.1.0 |
| `/chapters/[chapter]` | One page per chapter | v1.1.0 |
| `/activities` | National activities: LTWs, National Conventions, others | v1.2.0 |
| `/activities/[activity]` | One page per activity | v1.2.0 |
| `/ndo` | National Directorate Office: officers and gallery | v1.3.0 |
| `/news` | Announcements, general and per chapter | later |

### Home (top to bottom)

1. **Hero:** full-width photo or video with a one-line description of FCCY
2. **Intro and Mission & Vision:** short versions, linking to `/about`
3. **Chapter map:** pins for every chapter. In v1.0.0 the pins show names only; from v1.1.0 they link to chapter pages.
4. **Upcoming activities** (from v1.2.0)
5. **NDO officers preview** (from v1.3.0)
6. **Quotes and testimonies**
7. **Contact link**

### Chapter page

- Location on the map
- Chapter Spiritual Director(s): title, name, picture
- CGC officers: position, name, picture
- Parish or church: name, location, pictures
- Activities: upcoming ones first, then past Youth Encounters

Prospect chapters show only their name and location.

### Activity page

Theme or name, dates, location, pubmat, short summary, pictures, testimonies.

`/activities` lists national activities from the **last 10 years plus upcoming ones**, filterable by type.

### NDO page

A short description of the NDO, then each officer's position, name, picture, and description, followed by pictures of meetings and events.

## Content types

All content is Markdown files in `src/content/`, checked by a schema at build time. A missing or misspelled field fails CI instead of breaking the live site.

| Collection | One file per | Key fields |
|---|---|---|
| `chapters` | Chapter | `name`, `status` (`active` / `prospect`), `province`, `city`, `coordinates`, `parish` (name, address, photos), `spiritualDirectors[]`, `cgc[]` |
| `activities` | Activity or event | `title`, `type` (`ltw` / `convention` / `youth-encounter` / `other`), `chapter` (optional), `theme`, `startDate`, `endDate`, `location`, `pubmat`, `photos[]`, `testimonies[]`, summary as the Markdown body |
| `officers` | NDO officer | `name`, `position`, `photo`, `description`, `term`, `order` |

Design decisions:

- **One `activities` collection for everything.** LTWs, conventions, Youth Encounters, and upcoming events share the same fields. National activities have no `chapter`; chapter activities point to their chapter, so chapter pages list them automatically.
- **"Upcoming" and "past" come from the date.** Nobody has to move an event once it's over.
- **Officers and CGC members have a `term`** (for example `2025–2026`) from the start, so a "past terms" filter can be added later without editing every file.

## Design

Inspired by [LAS Art Foundation](https://www.las-art.foundation): minimal and editorial, letting photos and pubmats carry the color.

- **Colors:** black and white base, with FCCY's logo colors as the only accent
- **Type:** large headings, generous whitespace. A free font (such as Inter or Geist) self-hosted with Fontsource. The fonts LAS uses (Dinamo) need a paid license, so we don't use them.
- **Layout:** full-width hero media, content in a 3-column card grid (image, small `category | date` label, title), simple one-row navigation, short footer
- **Motion:** subtle transitions only
- **Components:** Tailwind CSS with [Starwind UI](https://starwind.dev), an Astro component library. Components are copied into the repo and ship no JavaScript unless they need interaction. Don't use the paid Starwind Pro.
- **Map:** our own SVG map of the Philippines with chapter pins, with no third-party map service

## Releases

| Version | Jira epics |
|---|---|
| **v1.0.0** (launch) | Design system & layout · Home & About · Contact form · Launch v1.0.0 (privacy notice, SEO, monitoring) |
| v1.1.0 | Chapters |
| v1.2.0 | National Activities |
| v1.3.0 | NDO |
| later | Event sign-ups (D1) · News · past-terms filter |

Each release follows the steps in [CONTRIBUTING.md](../CONTRIBUTING.md#releases).
