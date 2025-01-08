import express from "express";
import ingresos_fijos from "./routes/ingresos_fijos"
import metas from "./routes/metas"
import gastos from "./routes/gastos"
import ingresoData from "./routes/ingresos"
import cors from "cors"
const app = express();
const port = process.env.PORT || 3000;
app.use(express.json())
app.use(cors())

app.use("/", (req, res, next) => {
  console.log(req.url)
  next(); 
})
app.get("/", (req, res) => {
  res.status(200).send("conection made");
});

app.use("/ingresos-fijos", ingresos_fijos); 
app.use("/ingresos", ingresoData); 
app.use("/metas", metas); 
app.use("/gastos", gastos); 

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});