export interface Property {
  id?: number;
  title: string;
  slug: string;
  description: string;
  property_type: string;
  transaction_type: string;
  province: string;
  city: string;
  district?: string;
  sub_district?: string;
  address: string;
  postal_code: string;
  price: number;
  available: boolean;
  size: number;
  bedrooms?: number;
  bathrooms?: number;
  parking_spaces?: number;
  furnishing?: string;
  thumbnail_image?: string;
  images?: string[];
  date_added?: Date;
  date_changed?: Date;
  meta_title?: string;
  meta_description?: string;
  features?: string;
  amenities?: string;
  nearby_facilities?: string;
  author_id?: number;
  floors?: number;
  land_area?: number;
  telephone_number?: string;
  facilities?: string[];
}