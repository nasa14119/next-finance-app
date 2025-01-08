import { Router } from "express";
import { changeManyPorcentage , createMeta, deleteMeta, getMetas , Meta, MetasChanges, updateMeta} from "../model/metas";
import { z } from "zod";

const app = Router()

app.get("/", (req, res) => {
  const metas = getMetas()
  res.status(200).send(metas); 
})
app.post("/", (req, res) => {
  const check  = Meta.safeParse(req.body); 
  if("error" in check){
    console.log(check.error.errors);
    return res.status(400).send(check.error.errors); 
  }
  const newValues = createMeta(req.body); 
  res.status(200).send(newValues); 
})
const MetasChangesSchema = z.array(MetasChanges).nonempty()
app.post("/change-porcentajes", (req, res) => {
  const check = MetasChangesSchema.safeParse(req.body)
  if("error" in check){
    return res.status(400).send({error: check.error.errors})
  }
  try {
    const newValues = changeManyPorcentage(req.body); 
    res.status(200).send(newValues); 
  } catch (error) {
    res.status(404).send({error}); 
  }
})
app.delete("/", (req, res) =>{
  const { id } : {id:string} = req.body
  if(!id){
    return res.status(400).send({error: "no id was send as payload"})
  }
  try {
    deleteMeta(id) 
    res.sendStatus(200); 
  } catch (error) {
    return res.status(404).send({error})
  }
})
app.put("/update-meta", (req, res ) =>{
  const check = Meta.safeParse(req.body); 
  if("error" in check){
    res.status(400).send({error: check.error.errors}); 
  }
  try {
    const updatedMeta = updateMeta(req.body); 
    res.status(200).send(updatedMeta);
  } catch (error) {
    res.status(404).send({error})
  }
})
export default app