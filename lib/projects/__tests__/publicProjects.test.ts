import { describe, expect, it } from 'vitest';
import type { Project } from '@/types/supabase';
import { getProjectHeroImage, getProjectPublicIssues, isPublicReadyProject } from '../publicProjects';

const baseProject: Project = {
  id: 'project-1',
  title: '검수 완료 프로젝트',
  client: '위트 고객',
  location: '전남 함평',
  completed_at: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
  created_at: '2026-06-01',
  description: '현장 사진과 설치 조건이 확인된 공개 가능한 프로젝트입니다.',
  images: ['https://example.com/project.webp'],
  status: 'completed',
  tags: ['modular'],
};

describe('isPublicReadyProject', () => {
  it('allows projects with real title, hero image, and core details', () => {
    expect(isPublicReadyProject(baseProject)).toBe(true);
    expect(getProjectHeroImage(baseProject)).toBe('https://example.com/project.webp');
  });

  it('blocks test-quality project titles from public portfolio', () => {
    expect(isPublicReadyProject({ ...baseProject, title: '테스트 입니다' })).toBe(false);
    expect(isPublicReadyProject({ ...baseProject, title: 'sample project' })).toBe(false);
  });

  it.each([
    ['missing-image', { images: [] }],
    ['missing-image', { images: null }],
    ['missing-location', { location: null }],
    ['missing-client', { client: null }],
    ['missing-completed-date', { completed_at: null }],
  ])('blocks projects with %s', (issue, patch) => {
    expect(getProjectPublicIssues({ ...baseProject, ...patch })).toContain(issue);
    expect(isPublicReadyProject({ ...baseProject, ...patch })).toBe(false);
  });

  it.each([
    ['needs-description', { description: '준비 중' }],
    ['invalid-image-url', { images: ['not-a-url'] }],
    ['invalid-completed-date', { completed_at: '1900-01-01' }],
    ['invalid-completed-date', { completed_at: 'not-a-date' }],
    ['invalid-completed-date', { completed_at: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString() }],
    ['unpublished-status', { status: 'in_progress' }],
  ])('blocks projects with %s', (issue, patch) => {
    expect(getProjectPublicIssues({ ...baseProject, ...patch })).toContain(issue);
    expect(isPublicReadyProject({ ...baseProject, ...patch })).toBe(false);
  });

  it('does not return an invalid hero image for admin or public rendering', () => {
    expect(getProjectHeroImage({ ...baseProject, images: ['ftp://example.com/image.webp'] })).toBeNull();
  });
});
