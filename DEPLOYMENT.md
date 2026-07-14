# Kenya Fiscal & Economic Intelligence Platform — Deployment Pipeline

This repository uses an **AI-Assisted Automated Deployment Workflow** connected to Vercel via GitHub continuous deployment.

## The Deployment Protocol (Zero Broken Code Guarantee)

After completing any feature, component addition, or architectural modification, the following strict 10-step verification and deployment pipeline **MUST** be executed before pushing to GitHub:

```
AI / Developer Workspace
         │
         ▼
1. npm install (if dependency changes occurred)
         │
         ▼
2. npm run lint (Verify zero ESLint errors across all views)
         │
         ▼
3. npm run build (Verify production Vite build succeeds)
         │
         ▼
4. Fix every warning and error before proceeding
         │
         ▼
5. Run automated tests / validation checks
         │
         ▼
6. git add . && git commit -m "feat/fix: descriptive commit message"
         │
         ▼
7. git push origin main (or appropriate feature branch)
         │
         ▼
8. Vercel Automatic Deployment triggered
         │
         ▼
9. Verify deployment health on live URL
         │
         ▼
10. Provide Deployment Summary & Commit Hash
```

### Branching & Safe Iteration
For major or ambitious multi-module upgrades, feature branches should be used to protect the live Vercel environment:
* `feature/economic-health`
* `feature/finance-bill`
* `feature/debt-risk`
* `feature/projects`
* `feature/ui-redesign`

Once verified on the feature branch or staging preview, code is merged and pushed to `main` for instant live deployment.

---
**Rule**: Never push code that fails `npm run lint` or `npm run build`. The GitHub repository must always remain 100% deployable.
