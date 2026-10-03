export interface Color {
  name: string;
  color: string;
  index?: number;
}

export interface Tile {
  front: Color[];
  back: Color[];
  left: Color[];
  right: Color[];
  top: Color[];
  bottom: Color[];
}

export interface CurrentTile {
  face: Face;
  tiles: Color[]
}

export type Face = "front" | "back" | "left" | "right" | "top" | "bottom";