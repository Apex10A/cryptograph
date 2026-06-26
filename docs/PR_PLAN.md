# CryptoFlow PR Plan

Merge in this order when files overlap.

## PR 1 — `feat/aurora-ink-tokens`

Theme tokens, fonts, chart colors.

```bash
git add index.html src/style.css src/styles/fonts.css src/utils/chartTheme.ts
```

## PR 2 — `feat/aurora-ink-marketing`

Marketing pages and Aurora styling.

```bash
git add src/styles/marketing.css src/layouts/MarketingLayout.vue src/components/marketing/ src/views/marketing/
```

## PR 3 — `feat/aurora-ink-terminal-polish`

Early terminal polish (optional if PR 4 includes these).

```bash
git add src/components/cards/MetricCard.vue
```

## PR 4 — `feat/dashboard-layout`

Sidebar + bento-grid terminal dashboard.

```bash
git add src/styles/terminal.css src/style.css src/components/terminal/DashboardSidebar.vue src/components/terminal/DashboardTopBar.vue src/components/terminal/DashboardMarketSummary.vue src/components/charts/ChartCard.vue src/components/feed/ActivityFeed.vue src/views/Dashboard.vue
```

## PR 5 — `feat/onboarding-tour`

First-visit spotlight tour on `/terminal`.

```bash
git add src/stores/onboardingStore.ts src/components/onboarding/OnboardingTour.vue src/views/Dashboard.vue src/components/terminal/DashboardSidebar.vue
```

## PR 6 — `feat/trade-sounds`

Optional Web Audio ticks on significant trades (off by default).

```bash
git add src/stores/preferencesStore.ts src/composables/useTradeSounds.ts src/components/terminal/PreferenceToggles.vue src/views/Dashboard.vue
```

## PR 7 — `feat/oracle-mode`

Night / toggle cryptic copy + whisper banner.

```bash
git add src/data/oracleLines.ts src/composables/useOracleMode.ts src/components/terminal/OracleWhisper.vue src/components/terminal/DashboardTopBar.vue src/components/terminal/DashboardSidebar.vue src/components/terminal/PreferenceToggles.vue src/components/feed/ActivityFeed.vue
```

## Notes

- `DashboardControls.vue` is no longer used; delete in PR 4 or a cleanup PR.
- Sound requires a user gesture — toggle **Sound** on in the sidebar to unlock audio.
- Oracle auto-activates at night (10pm–6am) in dark mode; manual toggle overrides anytime in dark mode.

---

## Week 5 — Terminal polish

Merge after earlier PRs if needed.

### PR 36 — `feat/coin-icons`

```bash
git add src/config/coinIcons.ts src/config/coins.ts src/components/coins/CoinIcon.vue src/components/cards/MetricCard.vue src/components/terminal/DashboardSidebarPanel.vue
```

### PR 37 — `feat/price-tick-flash`

```bash
git add src/composables/usePriceTickFlash.ts src/components/cards/MetricCard.vue src/style.css
```

### PR 38 — `feat/mobile-sidebar`

```bash
git add src/components/terminal/DashboardSidebar.vue src/components/terminal/DashboardSidebarPanel.vue src/components/terminal/DashboardMobileDrawer.vue src/components/terminal/DashboardTopBar.vue src/views/Dashboard.vue
```
