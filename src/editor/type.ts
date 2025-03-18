export type GeomeryViewObj = {
    type: 'CUBE' | 'CONE' | 'SPHERE';
    parentType: 'GEOMARY' | 'LIGHT' | 'TEXTURE'
}

export enum GEOMARY {
    CUBE = 'CUBE',
    CONE = 'CONE',
    SPHERE = 'SPHERE'
}

export type GeomeryObj = {
    gid: string;
    x: number;
    y: number;
    BoxGeometry?: number[];
    ConeGeometry?: number[];
    SphereGeometry?: number[];
    type: GeomeryViewObj['type'];
}
