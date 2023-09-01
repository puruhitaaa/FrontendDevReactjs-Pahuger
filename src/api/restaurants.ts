import axios from 'axios';

export type TRestaurant = {
  location_id: string;
  name: string;
  latitude: string;
  longitude: string;
  num_reviews: string;
  timezone: string;
  location_string: string;
  photo: {
    images: {
      small: Image;
      thumbnail: Image;
      original: Image;
      large: Image;
      medium: Image;
    };
    is_blessed: boolean;
    uploaded_date: string;
    caption: string;
    id: string;
    helpful_votes: string;
    published_date: string;
    user: {
      user_id: string | null;
      member_id: string;
      type: string;
    };
  };
  awards: any[]; // Update with actual type
  doubleclick_zone: string;
  preferred_map_engine: string;
  raw_ranking: string;
  ranking_geo: string;
  ranking_geo_id: string;
  ranking_position: string;
  ranking_denominator: string;
  ranking_category: string;
  ranking: string;
  distance: string | null;
  distance_string: string | null;
  bearing: string | null;
  rating: string;
  is_closed: boolean;
  open_now_text: string;
  is_long_closed: boolean;
  price_level: string;
  price: string;
  description: string;
  web_url: string;
  write_review: string;
  ancestors: Ancestor[];
  category: Category;
  subcategory: Subcategory[];
  parent_display_name: string;
  is_jfy_enabled: boolean;
  nearest_metro_station: any[]; // Update with actual type
  phone: string;
  website: string;
  email: string;
  address_obj: Address;
  address: string;
  hours: {
    week_ranges: OpeningTime[][];
    timezone: string;
  };
  is_candidate_for_contact_info_suppression: boolean;
  cuisine: Cuisine[];
  dietary_restrictions: DietaryRestriction[];
  establishment_types: EstablishmentType[];
};

type Image = {
  width: string;
  url: string;
  height: string;
};

type Ancestor = {
  subcategory: {
    key: string;
    name: string;
  }[];
  name: string;
  abbrv: string | null;
  location_id: string;
};

type Category = {
  key: string;
  name: string;
};

type Subcategory = {
  key: string;
  name: string;
};

type Address = {
  street1: string;
  street2: string;
  city: string;
  state: string | null;
  country: string;
  postalcode: string;
};

type OpeningTime = {
  open_time: number;
  close_time: number;
};

export type Cuisine = {
  key: string;
  name: string;
};

type DietaryRestriction = {
  key: string;
  name: string;
};

type EstablishmentType = {
  key: string;
  name: string;
};

export type TRestaurantList = TRestaurant[];

type Params = {
  url: string;
  limit?: string;
};

export const api = axios.create({
  baseURL: 'https://travel-advisor.p.rapidapi.com',
  headers: {
    'X-RapidAPI-Key': '16df39f6e3mshf1df5ed0e86925ep17a45djsnbb72dc9f5b35',
    'X-RapidAPI-Host': 'travel-advisor.p.rapidapi.com'
  }
});


export const fetchRestaurants = async ({ url }: Params) => {
  const params = {
    location_id: '293919',
    restaurant_tagcategory: '10591',
    restaurant_tagcategory_standalone: '10591',
    currency: 'USD',
    lunit: 'km',
    lang: 'en_US',
    limit: '30'
  };

  return api.get(url, { params }).then((res) => res.data.data);
};