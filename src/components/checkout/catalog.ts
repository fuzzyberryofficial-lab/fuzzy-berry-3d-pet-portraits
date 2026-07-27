export type CollectionKey = "single" | "multi";
export type TypeKey = "head" | "body" | "double" | "triple";
export type FrameColorKey =
  | "purpleGold"
  | "lightGold"
  | "titaniumGold"
  | "matteBlack"
  | "matteSilver"
  | "blackWalnut"
  | "naturalWood";

export interface SizeOption {
  label: string;
  price: number;
}

export interface TypeInfo {
  key: TypeKey;
  sizes: SizeOption[];
}

export interface CollectionInfo {
  key: CollectionKey;
  from: number;
  types: Record<string, TypeInfo>;
}

export const COLLECTIONS_BASE: Record<CollectionKey, CollectionInfo> = {
  single: {
    key: "single",
    from: 179,
    types: {
      head: {
        key: "head",
        sizes: [
          { label: "20×20 cm", price: 179 },
          { label: "25×25 cm", price: 199 },
          { label: "30×30 cm", price: 209 },
        ],
      },
      body: {
        key: "body",
        sizes: [
          { label: "25×25 cm", price: 209 },
          { label: "20×30 cm", price: 229 },
          { label: "30×30 cm", price: 229 },
        ],
      },
    },
  },
  multi: {
    key: "multi",
    from: 279,
    types: {
      double: {
        key: "double",
        sizes: [
          { label: "20×30 cm", price: 279 },
          { label: "20×40 cm", price: 279 },
        ],
      },
      triple: {
        key: "triple",
        sizes: [{ label: "20×40 cm", price: 329 }],
      },
    },
  },
};

export const FRAME_SWATCHES: Record<FrameColorKey, string> = {
  purpleGold:
    "linear-gradient(120deg, transparent 30%, rgba(255,255,255,.55) 48%, transparent 66%), repeating-linear-gradient(95deg, #B4888C 0px, #E8C7C7 1px, #9C7377 2px, #F2DEDE 3px, #A8797E 4px, #DDB8B8 5px)",
  lightGold:
    "linear-gradient(120deg, transparent 30%, rgba(255,255,255,.6) 48%, transparent 66%), repeating-linear-gradient(95deg, #EBE0AD 0px, #FDF8E4 1px, #D8C888 2px, #FFFBEE 3px, #DDCE8F 4px, #F5EDC9 5px)",
  titaniumGold:
    "linear-gradient(120deg, transparent 30%, rgba(255,255,255,.6) 48%, transparent 66%), repeating-linear-gradient(95deg, #E7AD3E 0px, #FCE29A 1px, #C88F26 2px, #FFEDB8 3px, #D29B2F 4px, #F5CE6E 5px)",
  matteBlack:
    "repeating-linear-gradient(95deg, #302C2A 0px, #423D3A 1px, #1E1B19 2px, #3A3532 3px, #262220 4px)",
  matteSilver:
    "repeating-linear-gradient(95deg, #C9CFD3 0px, #E6EAEC 1px, #AEB6BA 2px, #D8DDE0 3px, #BEC5C9 4px)",
  blackWalnut:
    "repeating-linear-gradient(98deg, #4A3627 0px, #6F5641 2px, #3D2C1F 4px, #5C4433 5px, #7A604A 7px, #453224 9px, #64493A 11px, #3A2A1E 13px, #6A503C 16px, #4D3728 19px, #785D46 22px, #402E20 25px)",
  naturalWood:
    "repeating-linear-gradient(98deg, #B27B3D 0px, #DBAB70 2px, #A06B32 4px, #C68F51 5px, #E3BA82 7px, #A8703A 9px, #D19E5F 11px, #9C6530 13px, #D3A164 16px, #B27B3D 19px, #E0B577 22px, #97622D 25px)",
};
