# STICS Workflow Docs

This repository is a standalone `mdBook` website for documenting the STICS and
related crop-model workflows without entangling them with your main portfolio
website.

## Why this exists

The raw guides you already wrote contain the hard part: the domain knowledge.
This site gives that knowledge:

- a homepage
- a sidebar
- a consistent voice
- room for runbooks, troubleshooting, and reproducibility notes

## Recommended setup

Treat `STICS` as its own GitHub repository.

That gives you:

- clean history for docs-only changes
- simple GitHub Pages deployment
- easy backlinking from your main website
- editing without touching the portfolio codebase

## Local preview

Install `mdBook`, then from the repository root run:

```powershell
mdbook serve
```

Then open the local URL shown in the terminal, usually
`http://localhost:3000`.

## Minimum install paths

If you have Scoop:

```powershell
scoop install mdbook
```

If you have Cargo:

```powershell
cargo install mdbook
```

If you want the prebuilt binary directly, grab the latest release from:

- <https://github.com/rust-lang/mdBook/releases>

## Publish as its own website

1. Use this repository as the GitHub repository root.
2. Push the contents to GitHub.
3. In GitHub Pages settings, use GitHub Actions as the deployment source.
4. The included workflow at `.github/workflows/deploy.yml` will build and
   publish the site automatically.
5. Update `book.toml` with the real repository URL.

## Backlink from your main website

Use a normal external link from the portfolio site, for example:

```html
<a href="https://your-user.github.io/your-workflow-docs-repo/">Workflow docs</a>
```

For this repo, the final URL will likely look more like:

```html
<a href="https://your-user.github.io/STICS/">STICS workflow docs</a>
```

## How to extend this book

- Add new pages under `src/`
- Register them in `src/SUMMARY.md`
- Keep the original long-form guides in `/docs` as source material
- Split monster guides into focused runbooks as they stabilize

## Notes

- The generated site output lives in `book/`
- `book/` should not be committed
- `src/` is the content you actually maintain
