# Novexis Website

A multilingual Astro-powered website with React components, content collections, and i18n support.

## 🚀 Project Structure

Inside of your Astro project, you'll see the following folders and files:

```text
/
├── public/
├── src/
│   ├── components/
│   │   ├── homeSections/
│   │   │   ├── aboutSection/
│   │   │   │   ├── AboutCard.astro
│   │   │   │   └── AboutSection.astro
│   │   │   ├── contactSection/
│   │   │   │   ├── ContactForm.tsx
│   │   │   │   └── ContactSection.astro
│   │   │   └── useCasesSection/
│   │   │       ├── ShowCase.tsx
│   │   │       ├── UseCasesSection.astro
│   │   │       └── ProductSection.astro
│   │   ├── layout/
│   │   │   ├── Container.astro
│   │   │   ├── Footer.astro
│   │   │   ├── Header.astro
│   │   │   ├── HomeSectionLayout.astro
│   │   │   ├── Menu.tsx
│   │   │   └── SectionPost.astro
│   │   └── ui/
│   │       ├── BaseButton.astro
│   │       ├── BaseCarousel.tsx
│   │       ├── BaseIconsList.astro
│   │       └── BaseTile.astro
│   ├── content/
│   │   ├── en/
│   │   │   ├── about/
│   │   │   │   ├── aboutPost.mdx
│   │   │   │   ├── partners.json
│   │   │   │   └── reviewers.json
│   │   │   ├── product/
│   │   │   │   ├── keyBenefits.json
│   │   │   │   └── productPost.mdx
│   │   │   ├── site/
│   │   │   │   └── baseLine.mdx
│   │   │   └── useCases/
│   │   └── fr/
│   │       └── ... (same structure)
│   ├── data/
│   │   ├── menuItems.json
│   │   ├── showCaseItems.json
│   │   └── social.json
│   ├── images/
│   │   ├── icons/
│   │   ├── illustrations/
│   │   └── showCaseImages/
│   ├── locales/
│   │   ├── useTranlations.ts
│   │   ├── en.json
│   │   └── fr.json
│   ├── pages/
│   │   ├── [lang]/
│   │   │   └── index.astro
│   │   └── index.astro
│   ├── styles/
│   │   └── global.css
│   └── types/
└── package.json
```

### Directory Overview

- **`src/pages/`** - Astro looks for `.astro` or `.md` files here. Each page is exposed as a route based on its file name.
- **`src/components/`** - Reusable Astro, React, Vue, Svelte, or Preact components.
- **`src/content/`** - Markdown/MDX posts and JSON collections organized by language.
- **`src/data/`** - Configuration files for site structure (menu, showcase, social links).
- **`src/locales/`** - Translation files for multilingual support.
- **`src/images/`** - Image assets organized by category.
- **`public/`** - Static assets served as-is (fonts, favicons, robots.txt).

## 🧞 Commands

All commands are run from the root of the project, from a terminal:

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `npm install`             | Installs dependencies                            |
| `npm run dev`             | Starts local dev server at `localhost:4321`      |
| `npm run build`           | Build your production site to `./dist/`          |
| `npm run preview`         | Preview your build locally, before deploying     |
| `npm run astro ...`       | Run CLI commands like `astro add`, `astro check` |
| `npm run astro -- --help` | Get help using the Astro CLI                     |

## 🌐 Internationalization (i18n)

The site supports multiple languages with dynamic routing.

**Available languages:**

- 🇬🇧 English (`en`)
- 🇫🇷 French (`fr`)

**URL Structure:**

- `/en/` - English version
- `/fr/` - French version
- `/` - Redirects to default language

### Adding a New Language

1. Create content directory: `/src/content/{lang}/`
2. Duplicate the content structure from an existing language
3. Create translation file: `/src/locales/{lang}.json`
4. Declare the new language in `/src/locales/useTranlations.ts`
5. Test all routes with `npm run dev`

## ✍️ Content Management

There are 3 ways to modify content on the Novexis website:

### 1. Data Files (Site Configuration)

Data files configure structural parts of the site.

**Location:** `/src/data/`

**Files:**

- `menuItems.json` - Main navigation menu structure
- `showCaseItems.json` - Homepage product showcase items
- `social.json` - Social media links in the footer

**Example structure (`menuItems.json`):**

```json
[
  {
    "id": "home",
    "label": "navigation.home",
    "href": "/"
  }
]
```

> #### ⚠️ Be Careful!
>
> Changes to these files affect site structure and could break navigation. Always:
>
> - Maintain valid JSON syntax
> - Test locally before deploying
> - Keep the existing data structure

### 2. Translation Files

Translation files contain all static text strings for each language.

**Location:** `/src/locales/`

**Structure:**

```
/src/locales/
  ├── useTranlations.ts  # Translation utility
  ├── en.json            # English translations
  └── fr.json            # French translations
```

**Example (`en.json`):**

```json
{
  "header": {
    "buttons": {
      "contact-us": "Contact us",
      "learn-more": "Learn more"
    }
  },
  "menu": {
    "home": "Home",
    "product": "Product",
    "use-cases": "Use cases",
    "about": "About",
    "contact": "Contact"
  }
}
```

**Usage:** Reference translations in components using the translation key path (e.g., `navigation.home`).

### 3. Content Files

Content files store the actual content for posts, collections, and data.

**Location:** `/src/content/{lang}/`

#### Content Types

| Type            | Format  | Example         | Use Case                               |
| --------------- | ------- | --------------- | -------------------------------------- |
| **Posts**       | `.mdx`  | `aboutPost.mdx` | Rich editorial content with components |
| **Collections** | `.json` | `partners.json` | Lists, galleries, structured data      |

#### Editing MDX Posts

**Example (`aboutPost.mdx`):**

```markdown
---
productPost: "Post in the About section"
---

## How EDF Modernized Analog Meter Reading with Novexis

EDF needed to digitize millions of analog meters without...
```

#### Editing JSON Collections

**Example (`reviewers.json`):**

```json
[
  {
    "fullName": "Dr Sophie Laurent",
    "position": "Research Director at Tech Institute",
    "testimonial": "« Novexis represents a breakthrough in making Al both accessible and sustainable. Their approach to tinyML has enabled research projects that simply weren’t feasible with traditional cloud-based A/. »"
  },
  {
    "fullName": "Pierre Dubois",
    "position": "Iot Lead at EDF",
    "testimonial": "« By implementing Novexis for analog meter reading, we reduced our energy consumption by 98% compared to our previous cloud-based solution while maintaining 99.7% accuracy. »"
  }
]
```

### Content Organization by Section

```
/src/content/{lang}/
  ├── about/          # About page content
  │   ├── aboutPost.mdx
  │   ├── partners.json
  │   └── reviewers.json
  ├── product/        # Product section
  │   ├── productPost.mdx
  │   └── keyBenefits.json
  ├── site/           # Global site content
  │   └── baseLine.mdx
  └── useCases/       # Use cases section
```

## 🎯 Quick Modification Guide

### What Can I Safely Change?

| ✅ **Safe**      | ⚠️ **Medium Risk**  | 🚨 **High Risk** |
| ---------------- | ------------------- | ---------------- |
| MDX content      | Translation strings | Menu structure   |
| JSON collections | Translation keys    | Data files       |
| Images           | File names          | Routing          |
| Text in posts    | Component props     | i18n config      |

### Before Making Sensitive Changes

- [ ] Create a backup of the file
- [ ] Test locally with `npm run dev`
- [ ] Build the site with `npm run build`
- [ ] Preview with `npm run preview`
- [ ] Check all language versions

## 💡 Common Tasks

### Add a New Reviewer

**File:** `/src/content/en/about/reviewers.json` (and other languages)

```json
{
  "fullName": "Emma Chen",
  "position": "CTO at GreeTech Solutions",
  "testimonial": "« The no-code interface allowed our field technicians to deploy Al models for predictive maintenance without needing data science expertise—a game changer for our."
}
```

### Change Button Text

**File:** `/src/locales/en.json`

```json
    "buttons": {
      "contact-us": "Contact us",
      "learn-more": "Learn more"
    }
```

Remember to update all language files!

### Add a Showcase Image

1. Place image in `/src/images/showCaseImages/`
2. Eventually, place an icon in `/src/images/icons/`
3. Reference in `/src/data/showCaseItems.json`:

```json
{
  "id": "RealTimeTriggersItem",
  "labelTranslationKey": "real-time-triggers-label",
  "descriptionTranslationKey": "real-time-triggers-description",
  "iconPath": "/icon-servers.svg",
  "imagePath": "/illustration4.jpg"
}
```

3. Add translations to locale files

### Update Social Media Links

**File:** `/src/data/social.json`

```json
[
  {
    "iconPath": "/icon-linkedin.svg",
    "href": "https://www.linkedin.com"
  }
]
```

## 🚀 Deployment

### Pre-deployment Checklist

```bash
# Build the site
npm run build

# Preview the production build
npm run preview

# Check for errors
npm run astro check
```

### Supported Platforms

- **Vercel** - Zero-config deployment
- **Netlify** - Automatic builds from Git
- **Cloudflare Pages** - Edge network delivery
- **Node.js servers** - Via the @astrojs/node adapter

> See the [Astro deployment guide](https://docs.astro.build/en/guides/deploy/) for platform-specific instructions.

## 🔧 Troubleshooting

### Common Issues

#### Development server won't start

```bash
# Clean install
rm -rf node_modules package-lock.json
npm install

# Clear Astro cache
rm -rf .astro
```

#### Build errors

**Check for:**

- Invalid JSON syntax in data/content files
- Malformed MDX frontmatter
- Missing image imports
- Broken translation keys

#### Missing translations

**Verify:**

- Translation key exists in all language files
- Key path is correct (case-sensitive)
- No typos in the key name

**Example:**

```typescript
// Correct
t("navigation.home");

// Incorrect
t("Navigation.Home"); // Wrong case
t("navigation.hone"); // Typo
```

#### Images not loading

- Check file path is correct
- Verify image exists in `/src/images/` or `/public/`
- Use correct import syntax for Astro image optimization

### Getting Help

- Check the [Astro documentation](https://docs.astro.build)
- Search existing [GitHub issues](https://github.com/withastro/astro/issues)
- Join the [Astro Discord](https://astro.build/chat)

## 🛠️ Tech Stack

- **Framework:** Astro
- **UI Components:** React
- **Styling:** Tailwind CSS (assumed)
- **Language:** TypeScript
- **Content:** Markdown/MDX + JSON

## 📝 Development Notes

### Code Conventions

- Use TypeScript for type safety
- Keep components small and focused
- Follow the existing file structure
- Write semantic HTML
- Optimize images before adding them

### Performance Tips

- Images are automatically optimized by Astro
- MDX content is rendered at build time
- Static routes are pre-rendered for fast loading

## 👀 Want to Learn More?

- [Astro Documentation](https://docs.astro.build)
- [Astro Content Collections](https://docs.astro.build/en/guides/content-collections/)
- [Astro i18n Guide](https://docs.astro.build/en/guides/internationalization/)

---

**Questions?** Check the documentation or reach me : julien.bruneel@gmail.com.
