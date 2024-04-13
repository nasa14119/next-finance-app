import { Router } from "express";
import { changePorcentage, createMeta, deleteMeta, getMetas , Meta, MetasChanges} from "../model/metas";
import { z } from "zod";

const app = Router()

app.get("/", (req, res) => {
  const metas = getMetas()
  res.status(200).send(metas); 
})
app.post("/", (req, res) => {
  const check  = Meta.safeParse(req.body); 
  if(!check.success){
    console.log(check.error.errors);
    return res.status(400).send(check.error.errors); 
  }
  const newValues = createMeta(req.body); 
  res.status(200).send(newValues); 
})
const MetasChangesSchema = z.array(MetasChanges).nonempty()
app.post("/change-porcentajes", (req, res) => {
  const check = MetasChangesSchema.safeParse(req.body)
  if(!check.success){
    return res.status(400).send({error: check.error.errors})
  }
  const newValues = changePorcentage(req.body); 
  if(newValues === null){
    return res.status(400).send({error: "there was an error in the payload"})
  }
  return res.status(200).send(newValues);
})
app.delete("/", (req, res) =>{
  const { id }: {id:string} = req.body
  if(!id){
    return res.status(400).send({error: "no id was send as payload"})
  }
  const isDeleted = deleteMeta(id) 
  if(isDeleted === null){
    return res.status(404).send({error: "current delete meta, check the id"})
  }
})

export default app