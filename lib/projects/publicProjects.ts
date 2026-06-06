import type { Project } from '@/types/supabase';

const blockedTitlePattern = /(테스트|test|샘플|sample|임시|dummy|placeholder)/i;
const blockedFieldPattern = /(테스트|test|샘플|sample|임시|dummy|placeholder|미정|unknown|n\/a)/i;

function hasMeaningfulText(value: string | null, minLength = 2) {
  const trimmed = value?.trim() ?? '';

  return trimmed.length >= minLength && !blockedFieldPattern.test(trimmed);
}

export function hasValidProjectImageUrl(value: string | undefined) {
  if (!value) return false;

  return /^https?:\/\/.+/i.test(value) || value.startsWith('/images/');
}

function hasSaneCompletedDate(value: string | null) {
  if (!value) return false;

  const time = Date.parse(value);
  if (Number.isNaN(time)) return false;

  const year = new Date(time).getFullYear();

  return year >= 2020 && time <= Date.now();
}

export function getProjectHeroImage(project: Project) {
  const heroImage = project.images?.[0]?.trim();

  return hasValidProjectImageUrl(heroImage) ? heroImage : null;
}

export function getProjectPublicIssues(project: Project) {
  const issues: string[] = [];
  const heroImage = project.images?.[0]?.trim();

  if (!project.title || blockedTitlePattern.test(project.title)) issues.push('test-title');
  if (!heroImage) issues.push('missing-image');
  if (heroImage && !hasValidProjectImageUrl(heroImage)) issues.push('invalid-image-url');
  if (!hasMeaningfulText(project.client)) issues.push('missing-client');
  if (!hasMeaningfulText(project.location)) issues.push('missing-location');
  if (!project.completed_at) issues.push('missing-completed-date');
  if (project.completed_at && !hasSaneCompletedDate(project.completed_at)) issues.push('invalid-completed-date');
  if (!hasMeaningfulText(project.description, 24)) issues.push('needs-description');
  if (project.status !== 'completed') issues.push('unpublished-status');

  return issues;
}

export function isPublicReadyProject(project: Project) {
  return getProjectPublicIssues(project).length === 0;
}
