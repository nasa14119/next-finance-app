import { z } from "zod";
import { db } from "../db";

export const getMetas = () => {
  const res = db.query("SELECT * FROM metas")
  const isDuplicated = db.query(`SELECT * FROM metas WHERE titulo = "viaje"`); 
  console.log(isDuplicated.get());
  return res.all()
}
export const Meta = z.object({
  titulo: z.string(), 
  porcentaje: z.number(),
  ahorro:z.number(), 
  ahorro_meta : z.number()
}); 
type Meta = z.infer<typeof Meta>
export const getMeta = (id:string) => { 
  const res = db.prepare(`
    SELECT * fROM metas WHERE id = $id
  `)
  return res.get({$id: id}) as Meta
}
export const createMeta = (meta: Meta) => {
  const check = Meta.safeParse(meta)
  if(!check.success){
    console.log(check.error);
    return null
  }
  const query = db.query(`SELECT * FROM metas WHERE titulo = $newTitle`); 
  const isDuplicated = query.get({$newTitle: meta.titulo})
  if(isDuplicated !== null){
    return getMetas()
  }
  const value = db.prepare(`
    INSERT INTO metas (id, titulo, porcentaje, ahorro, ahorro_meta)
    VALUES ($id, $titulo, $porcentaje, $ahorro, $ahorro_meta)
  `)
  value.run({
    $id: crypto.randomUUID(), 
    $titulo: meta.titulo,
    $porcentaje: meta.porcentaje, 
    $ahorro: meta.ahorro, 
    $ahorro_meta: meta.ahorro_meta
  })
  return getMetas()
}
export const deleteMeta = (id:string)  => {
  const meta = getMeta(id); 
  if(meta === null){
    return null
  }
  const query = db.prepare(`
    DELETE FROM metas WHERE id = $id
  `)
  query.run({$id: id}); 
  return meta
}
export const MetasChanges = z.object({
  id: z.string(), 
  porcentaje: z.number().max(100).min(0), 
})
const MetasChangesSchema = z.array(MetasChanges).nonempty()
type MetasChanges = z.infer<typeof MetasChangesSchema>
export const changePorcentage = (metas: MetasChanges) => {
  const check  = MetasChangesSchema.safeParse(metas)
  if(!check.success){
    console.log(check.error.errors);
    return null 
  }
  const query = db.prepare(`
    UPDATE metas
    SET porcentaje = $newPorcentaje
    WHERE id = $id
  `)
  const UpdateRows = db.transaction(metas =>{
    for (const meta of metas) query.run(meta);
    return getMetas()
  })
  const changes = metas.map(v => ({$id: v.id, $newPorcentaje: v.porcentaje}))
  return UpdateRows(changes); 
}
interface Metas extends Meta {id: string} 
export const updateMetas = (metas:Metas[]) =>{
  // TODO
  return null
}