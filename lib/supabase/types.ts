/**
 * Tipuri scrise manual după schema din supabase/migrations/0001_init.sql.
 * După ce proiectul Supabase există, se pot regenera exact cu:
 *   npx supabase gen types typescript --project-id <id> > lib/supabase/types.ts
 */

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type SpecRow = { label: string; value: string };
export type ColorOption = { name: string; skuSuffix: string };

export type Database = {
  public: {
    Tables: {
      categories: {
        Row: {
          id: string;
          slug: string;
          name: string;
          status: "active" | "coming-soon";
          description: string;
          images: string[];
          sort_order: number;
          created_at: string;
          updated_at: string;
        };
        Insert: Partial<Database["public"]["Tables"]["categories"]["Row"]> & {
          slug: string;
          name: string;
        };
        Update: Partial<Database["public"]["Tables"]["categories"]["Row"]>;
        Relationships: [];
      };
      products: {
        Row: {
          id: string;
          category_id: string;
          slug: string;
          name: string;
          short_description: string;
          price: number;
          price_before_discount: number | null;
          price_unit: string;
          unit_label: string | null;
          thicknesses: string[];
          widths: string[];
          lengths: string[];
          description: string[];
          use_cases: string[];
          has_cart: boolean;
          images: string[];
          sku: string | null;
          weight: string | null;
          colors: ColorOption[];
          colors_label: string | null;
          width_label: string | null;
          length_label: string | null;
          specs: SpecRow[];
          sort_order: number;
          created_at: string;
          updated_at: string;
        };
        Insert: Partial<Database["public"]["Tables"]["products"]["Row"]> & {
          category_id: string;
          slug: string;
          name: string;
        };
        Update: Partial<Database["public"]["Tables"]["products"]["Row"]>;
        Relationships: [
          {
            foreignKeyName: "products_category_id_fkey";
            columns: ["category_id"];
            referencedRelation: "categories";
            referencedColumns: ["id"];
          }
        ];
      };
      product_variants: {
        Row: {
          id: string;
          product_id: string;
          thickness: string;
          width: string;
          length: string;
          price: number;
          old_price: number | null;
          sku: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: Partial<
          Database["public"]["Tables"]["product_variants"]["Row"]
        > & {
          product_id: string;
          thickness: string;
          width: string;
          length: string;
          price: number;
        };
        Update: Partial<Database["public"]["Tables"]["product_variants"]["Row"]>;
        Relationships: [
          {
            foreignKeyName: "product_variants_product_id_fkey";
            columns: ["product_id"];
            referencedRelation: "products";
            referencedColumns: ["id"];
          }
        ];
      };
      promotions: {
        Row: {
          id: string;
          name: string;
          discount_type: "percent" | "fixed";
          discount_value: number;
          scope: "all" | "category" | "product";
          category_id: string | null;
          product_id: string | null;
          starts_at: string | null;
          ends_at: string | null;
          active: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: Partial<Database["public"]["Tables"]["promotions"]["Row"]> & {
          name: string;
          discount_type: "percent" | "fixed";
          discount_value: number;
        };
        Update: Partial<Database["public"]["Tables"]["promotions"]["Row"]>;
        Relationships: [
          {
            foreignKeyName: "promotions_category_id_fkey";
            columns: ["category_id"];
            referencedRelation: "categories";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "promotions_product_id_fkey";
            columns: ["product_id"];
            referencedRelation: "products";
            referencedColumns: ["id"];
          }
        ];
      };
      campaigns: {
        Row: {
          id: string;
          name: string;
          description: string;
          promotion_id: string | null;
          starts_at: string;
          ends_at: string;
          status: "scheduled" | "active" | "ended" | "cancelled";
          created_at: string;
          updated_at: string;
        };
        Insert: Partial<Database["public"]["Tables"]["campaigns"]["Row"]> & {
          name: string;
          starts_at: string;
          ends_at: string;
        };
        Update: Partial<Database["public"]["Tables"]["campaigns"]["Row"]>;
        Relationships: [
          {
            foreignKeyName: "campaigns_promotion_id_fkey";
            columns: ["promotion_id"];
            referencedRelation: "promotions";
            referencedColumns: ["id"];
          }
        ];
      };
      admin_users: {
        Row: { user_id: string; email: string; created_at: string };
        Insert: { user_id: string; email: string };
        Update: Partial<Database["public"]["Tables"]["admin_users"]["Row"]>;
        Relationships: [];
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
};

export type Category = Database["public"]["Tables"]["categories"]["Row"];
export type ProductRow = Database["public"]["Tables"]["products"]["Row"];
export type ProductVariantRow =
  Database["public"]["Tables"]["product_variants"]["Row"];
export type Promotion = Database["public"]["Tables"]["promotions"]["Row"];
export type Campaign = Database["public"]["Tables"]["campaigns"]["Row"];
