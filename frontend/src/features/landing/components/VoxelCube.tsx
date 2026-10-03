import { useLayoutEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import type { Color, Face } from "../../../types/landing-preview-types";

const N = 16;
const TILE_SIZE = 2.3;
const H = (N * TILE_SIZE) / 2; // a kocka fél élhossza → origóra centrálva

const FACES: Face[] = ["front", "back", "left", "right", "top", "bottom"];

interface Props {
  tiles: Record<Face, Color[]>;
}

function useEdgeTexture() {
  return useMemo(() => {
    const c = document.createElement("canvas");
    c.width = c.height = 32;
    const g = c.getContext("2d")!;
    g.fillStyle = "#808080";
    g.fillRect(0, 0, 32, 32);
    g.fillStyle = "#ffffff";
    g.fillRect(2, 2, 28, 28);
    const t = new THREE.CanvasTexture(c);
    t.magFilter = THREE.NearestFilter;
    t.colorSpace = THREE.SRGBColorSpace;
    return t;
  }, []);
}

// Egy csempe helye és elforgatása az adott oldalon
function place(face: Face, u: number, v: number, o: THREE.Object3D) {
  o.rotation.set(0, 0, 0);
  switch (face) {
    case "front":
      o.position.set(u, v, H);
      break;
    case "back":
      o.position.set(-u, v, -H);
      o.rotation.y = Math.PI;
      break;
    case "right":
      o.position.set(H, v, -u);
      o.rotation.y = Math.PI / 2;
      break;
    case "left":
      o.position.set(-H, v, u);
      o.rotation.y = -Math.PI / 2;
      break;
    case "top":
      o.position.set(u, H, -v);
      o.rotation.x = -Math.PI / 2;
      break;
    case "bottom":
      o.position.set(u, -H, v);
      o.rotation.x = Math.PI / 2;
      break;
  }
  o.updateMatrix();
}

export default function VoxelCube({ tiles }: Props) {
  const ref = useRef<THREE.InstancedMesh>(null!);
  const edgeTex = useEdgeTexture();
  const count = N * N * 6;

  // Az instanceColor már a mesh létrejöttekor létezik → a shader színezni fog
  const colors = useMemo(() => new Float32Array(count * 3), [count]);

  useLayoutEffect(() => {
    const mesh = ref.current;
    const dummy = new THREE.Object3D();
    const c = new THREE.Color();
    let k = 0;

    for (const face of FACES) {
      tiles[face].forEach((tile, i) => {
        const x = i % N;
        const y = Math.floor(i / N);
        const u = (x + 0.5) * TILE_SIZE - H;
        const v = H - (y + 0.5) * TILE_SIZE;
        place(face, u, v, dummy);
        mesh.setMatrixAt(k, dummy.matrix);
        mesh.setColorAt(k, c.set(tile.name));
        k++;
      });
    }

    mesh.count = k;
    mesh.instanceMatrix.needsUpdate = true;
    mesh.instanceColor!.needsUpdate = true;
    mesh.computeBoundingSphere();
  }, [tiles]);

  return (
    <instancedMesh ref={ref} args={[undefined, undefined, count]}>
      <planeGeometry args={[TILE_SIZE, TILE_SIZE]} />
      <meshBasicMaterial map={edgeTex} />
      <instancedBufferAttribute attach="instanceColor" args={[colors, 3]} />
    </instancedMesh>
  );
}
