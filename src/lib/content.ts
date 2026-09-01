// SPEC §5 — drafts are excluded from prod builds (and feeds), shown in dev.
export const isVisible = (data: { draft?: boolean }): boolean =>
  import.meta.env.PROD ? !data.draft : true;
