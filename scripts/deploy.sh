#!/usr/bin/env bash
# Build the site and publish dist/ to the gh-pages branch (GitHub Pages "deploy from branch").
# Once the gh token has the `workflow` scope you can commit .github/workflows/deploy.yml instead
# and switch Pages to "GitHub Actions"; until then this is the deploy path.
set -euo pipefail
cd "$(dirname "$0")/.."
pnpm build
touch dist/.nojekyll
remote=$(git remote get-url origin)
tmp=$(mktemp -d)
git -C dist init -q -b gh-pages
git -C dist add -A
git -C dist -c user.name="$(git config user.name)" -c user.email="$(git config user.email)" commit -q -m "deploy $(git rev-parse --short HEAD)"
git -C dist push -f "$remote" gh-pages:gh-pages
rm -rf dist/.git "$tmp"
echo "published gh-pages from $(git rev-parse --short HEAD)"
