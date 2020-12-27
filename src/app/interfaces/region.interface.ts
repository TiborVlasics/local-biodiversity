import { MapBoundingBox } from "./MapBoundingBox.interface";

export interface Region {
    id: string,
    name: string,
    latLngBounds: MapBoundingBox,
    imageUrl?: string
}