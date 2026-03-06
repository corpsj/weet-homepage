'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';

type TrackingStatus = {
  order_code: string;
  current_step: string;
  steps: Array<{
    label: string;
    desc: string;
    status: 'done' | 'current' | 'pending';
    updated_at?: string;
  }>;
  updated_at: string;
};

function getTrackingClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return null;
  return createClient(url, key);
}

export function useTrackingRealtime(orderCode: string | null) {
  const [tracking, setTracking] = useState<TrackingStatus | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!orderCode) {
      setTracking(null);
      return;
    }

    const maybeClient = getTrackingClient();
    if (!maybeClient) {
      setError('서비스 연결에 문제가 있습니다.');
      return;
    }
    const trackingClient: NonNullable<typeof maybeClient> = maybeClient;

    setLoading(true);
    setError(null);

    async function fetchTracking() {
      const { data, error: fetchError } = await trackingClient
        .from('build_tracking')
        .select('*')
        .eq('order_code', orderCode)
        .single();

      if (fetchError) {
        setError('주문번호를 찾을 수 없습니다. 다시 확인해주세요.');
        setLoading(false);
        return;
      }

      if (data) {
        setTracking(data as TrackingStatus);
      }
      setLoading(false);
    }

    fetchTracking();

    const channel = trackingClient
      .channel(`tracking-${orderCode}`)
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'build_tracking',
          filter: `order_code=eq.${orderCode}`,
        },
        (payload) => {
          setTracking(payload.new as TrackingStatus);
        }
      )
      .subscribe();

    return () => {
      trackingClient.removeChannel(channel);
    };
  }, [orderCode]);

  return { tracking, loading, error };
}
