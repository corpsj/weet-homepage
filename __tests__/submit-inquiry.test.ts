import { describe, it, expect, vi, beforeEach } from 'vitest';
import { submitInquiry } from '@/app/actions/submit-inquiry';

// Mock Supabase server utilities
vi.mock('@/utils/supabase/server', () => ({
  createClient: vi.fn(),
}));

// Mock next/cache
vi.mock('next/cache', () => ({
  revalidatePath: vi.fn(),
}));

describe('submitInquiry', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('validation', () => {
    it('should return error when name is missing', async () => {
      const formData = new FormData();
      formData.append('phone', '010-1234-5678');
      formData.append('message', 'Test message');

      const result = await submitInquiry({}, formData);

      expect(result.success).toBe(false);
      expect(result.message).toBe('필수 항목을 입력해주세요.');
    });

    it('should return error when phone is missing', async () => {
      const formData = new FormData();
      formData.append('name', 'John Doe');
      formData.append('message', 'Test message');

      const result = await submitInquiry({}, formData);

      expect(result.success).toBe(false);
      expect(result.message).toBe('필수 항목을 입력해주세요.');
    });

    it('should return error when message is missing', async () => {
      const formData = new FormData();
      formData.append('name', 'John Doe');
      formData.append('phone', '010-1234-5678');

      const result = await submitInquiry({}, formData);

      expect(result.success).toBe(false);
      expect(result.message).toBe('필수 항목을 입력해주세요.');
    });

    it('should return error when name is empty string', async () => {
      const formData = new FormData();
      formData.append('name', '');
      formData.append('phone', '010-1234-5678');
      formData.append('message', 'Test message');

      const result = await submitInquiry({}, formData);

      expect(result.success).toBe(false);
      expect(result.message).toBe('필수 항목을 입력해주세요.');
    });

    it('should return error when phone is empty string', async () => {
      const formData = new FormData();
      formData.append('name', 'John Doe');
      formData.append('phone', '');
      formData.append('message', 'Test message');

      const result = await submitInquiry({}, formData);

      expect(result.success).toBe(false);
      expect(result.message).toBe('필수 항목을 입력해주세요.');
    });

    it('should return error when message is empty string', async () => {
      const formData = new FormData();
      formData.append('name', 'John Doe');
      formData.append('phone', '010-1234-5678');
      formData.append('message', '');

      const result = await submitInquiry({}, formData);

      expect(result.success).toBe(false);
      expect(result.message).toBe('필수 항목을 입력해주세요.');
    });

    it('should accept optional email field', async () => {
      const { createClient } = await import('@/utils/supabase/server');
      const mockInsert = vi.fn().mockResolvedValue({ error: null });
      const mockFrom = vi.fn().mockReturnValue({ insert: mockInsert });
      (createClient as any).mockResolvedValue({ from: mockFrom });

      const formData = new FormData();
      formData.append('name', 'John Doe');
      formData.append('phone', '010-1234-5678');
      formData.append('message', 'Test message');
      formData.append('email', 'john@example.com');

      await submitInquiry({}, formData);

      expect(mockInsert).toHaveBeenCalled();
      const insertedData = mockInsert.mock.calls[0][0];
      expect(insertedData.email).toBe('john@example.com');
    });

    it('should accept optional category field', async () => {
      const { createClient } = await import('@/utils/supabase/server');
      const mockInsert = vi.fn().mockResolvedValue({ error: null });
      const mockFrom = vi.fn().mockReturnValue({ insert: mockInsert });
      (createClient as any).mockResolvedValue({ from: mockFrom });

      const formData = new FormData();
      formData.append('name', 'John Doe');
      formData.append('phone', '010-1234-5678');
      formData.append('message', 'Test message');
      formData.append('category', 'Product');

      await submitInquiry({}, formData);

      expect(mockInsert).toHaveBeenCalled();
      const insertedData = mockInsert.mock.calls[0][0];
      expect(insertedData.category).toBe('Product');
    });

    it('should default category to General when not provided', async () => {
      const { createClient } = await import('@/utils/supabase/server');
      const mockInsert = vi.fn().mockResolvedValue({ error: null });
      const mockFrom = vi.fn().mockReturnValue({ insert: mockInsert });
      (createClient as any).mockResolvedValue({ from: mockFrom });

      const formData = new FormData();
      formData.append('name', 'John Doe');
      formData.append('phone', '010-1234-5678');
      formData.append('message', 'Test message');

      await submitInquiry({}, formData);

      expect(mockInsert).toHaveBeenCalled();
      const insertedData = mockInsert.mock.calls[0][0];
      expect(insertedData.category).toBe('General');
    });

    it('should default email to empty string when not provided', async () => {
      const { createClient } = await import('@/utils/supabase/server');
      const mockInsert = vi.fn().mockResolvedValue({ error: null });
      const mockFrom = vi.fn().mockReturnValue({ insert: mockInsert });
      (createClient as any).mockResolvedValue({ from: mockFrom });

      const formData = new FormData();
      formData.append('name', 'John Doe');
      formData.append('phone', '010-1234-5678');
      formData.append('message', 'Test message');

      await submitInquiry({}, formData);

      expect(mockInsert).toHaveBeenCalled();
      const insertedData = mockInsert.mock.calls[0][0];
      expect(insertedData.email).toBe('');
    });

    it('should set status to new when inserting', async () => {
      const { createClient } = await import('@/utils/supabase/server');
      const mockInsert = vi.fn().mockResolvedValue({ error: null });
      const mockFrom = vi.fn().mockReturnValue({ insert: mockInsert });
      (createClient as any).mockResolvedValue({ from: mockFrom });

      const formData = new FormData();
      formData.append('name', 'John Doe');
      formData.append('phone', '010-1234-5678');
      formData.append('message', 'Test message');

      await submitInquiry({}, formData);

      expect(mockInsert).toHaveBeenCalled();
      const insertedData = mockInsert.mock.calls[0][0];
      expect(insertedData.status).toBe('new');
    });
  });

  describe('database operations', () => {
    it('should call supabase insert when validation passes', async () => {
      const { createClient } = await import('@/utils/supabase/server');
      const mockInsert = vi.fn().mockResolvedValue({ error: null });
      const mockFrom = vi.fn().mockReturnValue({ insert: mockInsert });
      (createClient as any).mockResolvedValue({ from: mockFrom });

      const formData = new FormData();
      formData.append('name', 'John Doe');
      formData.append('phone', '010-1234-5678');
      formData.append('message', 'Test message');

      await submitInquiry({}, formData);

      expect(mockFrom).toHaveBeenCalledWith('inquiries');
      expect(mockInsert).toHaveBeenCalled();
    });

    it('should return error when database insert fails', async () => {
      const { createClient } = await import('@/utils/supabase/server');
      const mockError = { message: 'Database error' };
      const mockInsert = vi.fn().mockResolvedValue({ error: mockError });
      const mockFrom = vi.fn().mockReturnValue({ insert: mockInsert });
      (createClient as any).mockResolvedValue({ from: mockFrom });

      const formData = new FormData();
      formData.append('name', 'John Doe');
      formData.append('phone', '010-1234-5678');
      formData.append('message', 'Test message');

      const result = await submitInquiry({}, formData);

      expect(result.success).toBe(false);
      expect(result.message).toBe('문의 등록 중 오류가 발생했습니다.');
    });

    it('should call revalidatePath on successful insert', async () => {
      const { createClient } = await import('@/utils/supabase/server');
      const { revalidatePath } = await import('next/cache');
      const mockInsert = vi.fn().mockResolvedValue({ error: null });
      const mockFrom = vi.fn().mockReturnValue({ insert: mockInsert });
      (createClient as any).mockResolvedValue({ from: mockFrom });

      const formData = new FormData();
      formData.append('name', 'John Doe');
      formData.append('phone', '010-1234-5678');
      formData.append('message', 'Test message');

      await submitInquiry({}, formData);

      expect(revalidatePath).toHaveBeenCalledWith('/admin/inquiries');
    });

    it('should return success message on successful insert', async () => {
      const { createClient } = await import('@/utils/supabase/server');
      const mockInsert = vi.fn().mockResolvedValue({ error: null });
      const mockFrom = vi.fn().mockReturnValue({ insert: mockInsert });
      (createClient as any).mockResolvedValue({ from: mockFrom });

      const formData = new FormData();
      formData.append('name', 'John Doe');
      formData.append('phone', '010-1234-5678');
      formData.append('message', 'Test message');

      const result = await submitInquiry({}, formData);

      expect(result.success).toBe(true);
      expect(result.message).toBe('문의가 성공적으로 등록되었습니다.');
    });
  });
});
