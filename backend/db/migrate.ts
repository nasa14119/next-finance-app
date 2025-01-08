import { db } from ".";
try {
  db.run(`
    CREATE TABLE gastos(
      id TEXT, 
      valor FLOAT, 
      descripcion TEXT, 
      dia INT,
      mes INT,
      ano INT
    );
  `)
} catch (error) {
  console.log(db.query("SELECT * FROM gastos;").columnNames);
}
try {
  db.run(`
    CREATE TABLE agregar_ingresos(
      id TEXT, 
      valor FLOAT, 
      descripcion TEXT, 
      dia INT,
      mes INT,
      ano INT
    );
  `);
} catch (error) {
  console.log(db.query("SELECT * FROM agregar_ingresos;").columnNames);
}
try {
  db.run(`
    CREATE TABLE ingresos_fijos(
      valor FLOAT, 
      dia_entrada INT,
      mes_entrada INT,
      ano_entrada INT,
      isDelay BOOLEAN,
      isPay BOOLEAN,
      time_delay INT,
      estado INT
    );
  `);
} catch (error) {
  console.log(db.query("SELECT * FROM ingresos_fijos;").columnNames);  
}
try {
  db.run(`
    CREATE TABLE metas(
      id TEXT,
      titulo TEXT,
      porcentaje INT, 
      ahorro BIGINT, 
      ahorro_meta BIGINT
    );
  `);
} catch (error) {
  console.log(db.query("SELECT * FROM metas;").columnNames);
}
try {
  db.run(`
    CREATE TABLE ingresos_este_mes(
      dinero_actualmente FLOAT, 
      prev_value FLOAT
    );
  `);
} catch (error) {
  console.log(db.query("SELECT * from ingresos_este_mes;").columnNames)
}