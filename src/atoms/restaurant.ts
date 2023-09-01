import { TRestaurantList } from '@/api/restaurants';
import { atomWithStorage } from 'jotai/utils';

export const limit = atomWithStorage('limit', 8);
export const price = atomWithStorage('price', '');
export const isOpen = atomWithStorage('isOpen', false);
export const restaurantData = atomWithStorage<TRestaurantList>("restaurantData", []);
export const category = atomWithStorage('category', '');