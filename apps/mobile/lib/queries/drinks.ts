import type { Drink, DrinkCategory } from '@tamp/types';
import { useQuery } from '@tanstack/react-query';
import { api } from '../api';

export const drinkKeys = {
  all: ['drinks'] as const,
  list: (category?: DrinkCategory) => ['drinks', { category }] as const,
  detail: (slug: string) => ['drinks', slug] as const,
};

export function useDrinks(category?: DrinkCategory) {
  return useQuery({
    queryKey: drinkKeys.list(category),
    queryFn: () => {
      const path = category ? `/drinks?category=${category}` : '/drinks';
      return api.get<Drink[]>(path);
    },
  });
}

export function useDrink(slug: string) {
  return useQuery({
    queryKey: drinkKeys.detail(slug),
    queryFn: () => api.get<Drink>(`/drinks/${slug}`),
    enabled: !!slug,
  });
}
