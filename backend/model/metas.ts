import { string, z } from "zod";
import { db } from "../db";

export const getMetas = () => {
  const res = db.query("SELECT * FROM metas")
  return res.all()
}
export const Meta = z.object({
  titulo: z.string(), 
  porcentaje: z.number(),
  ahorro:z.number(), 
  ahorro_meta : z.number()
}); 
export type Meta = z.infer<typeof Meta>
interface IternalMeta extends Meta {id: string}
export const getMeta = (id:string) => { 
  const res = db.prepare(`
    SELECT * fROM metas WHERE id = $id
  `)
  return res.get({$id: id}) as Meta
}
export const createMeta = (meta: Meta) => {
  const query = db.query(`SELECT * FROM metas WHERE titulo = $newTitle`); 
  const isDuplicated = query.get({$newTitle: meta.titulo}) !== null
  if(isDuplicated){
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
    throw "meta dosent exits"; 
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
export const changeManyPorcentage = (metas: MetasChanges) => {
  metas.forEach(v => {
    const check = getMeta(v.id); 
    if(check === null){
      throw "There is an error with the id of an element, element not found"
    }
  })
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
export const updateMeta = (meta:IternalMeta) => {
  const isInDb = getMeta(meta.id) === null; 
  if(isInDb){
    throw "meta is not in db, check the id"; 
  }
  const prepareQuery = db.prepare(`
    UPDATE metas
    SET titulo = $titulo, porcentaje = $porcentaje, ahorro = $ahorro, ahorro_meta = $ahorro_meta
    WHERE id = $id
  `)
  prepareQuery.run({
    $id: meta.id, 
    $titulo: meta.titulo,
    $porcentaje: meta.porcentaje, 
    $ahorro: meta.ahorro, 
    $ahorro_meta: meta.ahorro_meta
  })
  return getMeta(meta.id); 
}