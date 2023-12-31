/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.2.15 cadreTransformed.glb 
*/

import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'

export function Model(props) {
  const { nodes, materials } = useGLTF('/cadreTransformed.glb')
  return (
    <group {...props} dispose={null}>
      <mesh geometry={nodes.Cube004.geometry} material={materials.Fond} />
      <mesh geometry={nodes.Cube004_1.geometry} material={materials.Cadre} />
    </group>
  )
}

useGLTF.preload('/cadreTransformed.glb')
