import express from "express";
import presupuesto_mensual from "./routes/presupuesto_mensual"
import metas from "./routes/metas"
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

app.use("/presupuesto_mensual", presupuesto_mensual)
app.use("/metas", metas)

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});