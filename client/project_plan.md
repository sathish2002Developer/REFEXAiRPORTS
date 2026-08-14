# Refex Airports — CMS Admin Panel Plan

## 1. Project Description
Add a full CMS (Content Management System) admin panel to the existing Refex Airports website. The admin panel will allow non-technical users to edit page content (text, images, stats, etc.) across all pages without code changes. Frontend pages will read content dynamically from the CMS database.

## 2. Page Structure

### Public Pages (existing)
- `/` — Home
- `/about` — About Us
- `/news` — News & Updates
- `/pune-airport` — Pune Airport (Traveler)
- `/pune-airport-assets` — Pune Airport (Retail)
- `/pune-airport-lounge` — Pune Airport (Lounge)
- `/srinagar-airport` — Srinagar Airport (Traveler)
- `/srinagar-airport-assets` — Srinagar Airport (Retail)
- `/srinagar-airport-lounge` — Srinagar Airport (Lounge)
- `/trichy-airport` — Trichy Airport (Traveler)
- `/trichy-airport-assets` — Trichy Airport (Retail)
- `/trichy-airport-lounge` — Trichy Airport (Lounge)
- `/aurangabad-airport` — Aurangabad Airport (Traveler)
- `/aurangabad-airport-assets` — Aurangabad Airport (Retail)
- `/aurangabad-airport-lounge` — Aurangabad Airport (Lounge)
- `/shirdi-airport` — Shirdi Airport (Traveler)
- `/shirdi-airport-assets` — Shirdi Airport (Retail)
- `/shirdi-airport-lounge` — Shirdi Airport (Lounge)

### Admin Pages (new)
- `/admin/login` — Admin Login
- `/admin/dashboard` — Admin Dashboard (overview of all pages)
- `/admin/pages/:pageId` — Edit specific page content
- `/admin/content` — Content manager (all editable sections)

## 3. Core Features
- [ ] Admin login with protected routes
- [ ] Separate admin layout (header, sidebar, footer)
- [ ] CMS content tables for storing page sections
- [ ] Page editor UI with form fields for each section
- [ ] Frontend pages fetch content from CMS database
- [ ] Image upload/management via storage

## 4. Data Model Design

### Table: `cms_pages`
| Field | Type | Description |
|-------|------|-------------|
| id | uuid | Primary key |
| slug | text | Page URL slug (e.g., 'home', 'about', 'pune-airport') |
| title | text | Page title |
| sections | jsonb | Array of content sections with keys and values |
| created_at | timestamp | Auto |
| updated_at | timestamp | Auto |

### Table: `cms_sections`
| Field | Type | Description |
|-------|------|-------------|
| id | uuid | Primary key |
| page_id | uuid | FK to cms_pages |
| section_key | text | Section identifier (e.g., 'hero_title', 'stats_passengers') |
| content_type | text | 'text', 'image', 'rich_text', 'number', 'json' |
| value | text | Actual content value |
| label | text | Human-readable label for admin UI |
| sort_order | int | Display order in admin |
| updated_at | timestamp | Auto |

## 5. Backend Integration Plan
- **Supabase (Readdy Backend or SaaS)**: Required for CMS database, auth, and storage
- **Auth**: Admin login using Supabase Auth
- **Storage**: For uploaded images in CMS

## 6. Development Phase Plan

### Phase 1: Admin Panel UI Structure
- Goal: Build the admin pages shell — login form, dashboard layout, sidebar navigation, admin header/footer
- Deliverable: All admin routes working with mock data, ready for backend connection

### Phase 2: Database & Auth Setup
- Goal: Connect Supabase, create CMS tables, set up admin authentication
- Deliverable: Working login/logout, database schema ready
- **User action required**: Connect Supabase before this phase

### Phase 3: CMS Content Editor
- Goal: Build the page editor UI where admin can view and edit content sections
- Deliverable: `/admin/pages/:pageId` with editable forms for each section

### Phase 4: Wire Frontend Pages to CMS
- Goal: Update all public pages to fetch content from CMS tables instead of hardcoded text
- Deliverable: All pages dynamically load content from the database

### Phase 5: Image Management
- Goal: Add image upload capability and wire CMS-managed images into pages
- Deliverable: Admin can upload and replace images through the CMS