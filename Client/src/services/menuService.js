import axios from "axios";

// Utilizamos la API pública de Google Sheets
const SHEET_ID = import.meta.env.VITE_SHEET_ID;
const SHEET_NAME = import.meta.env.VITE_SHEET_NAME;
//FOR UPLOAD IMAGE USE https://postimages.org AND GET DIRECT LINK
export const fetchMenuItems = async () => {
  try {
    const url = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:json&sheet=${SHEET_NAME}`;

    const response = await axios.get(url);

    // Elimina el prefijo y sufijo de la respuesta
    const jsonData = JSON.parse(response.data.substring(47).slice(0, -2));

    console.log(jsonData, " jsonData");
    // Extraer los encabezados de la primera fila
    // Extraer los encabezados de cols en lugar de la primera fila
    const headers = jsonData.table.cols.map(col => col.label.toLowerCase());
    console.log(headers, " headers");

    // Procesar las filas de datos (desde la segunda fila)
    const menuItems = [];

    for (let i = 0; i < jsonData.table.rows.length; i++) {
      const row = jsonData.table.rows[i].c;
      const item = {};

      // Generar un ID basado en la posición
      item.id = i;

      // Extraer los valores según los encabezados
      headers.forEach((header, index) => {
        if (header && row[index] && row[index].v !== null && row[index].v !== undefined) {
          if (header == "categoria") {
            item[header] = row[index].v.toLowerCase();
          } else {
            item[header] = row[index].v;
          }
        }
      });
      console.log(item, " item");

      // Solo incluir ítems que tengan al menos nombre y precio
      if (item.nombre && item.precio) {
        // Convertir price a número
        item.precio = Number(item.precio);
        menuItems.push(item);
      }
    }

    const categories = [];
    // Obtener categorías únicas
    const uniqueCategories = new Set(menuItems.map((item) => item.categoria));
    uniqueCategories.forEach((category) => {
      categories.push(category);
    }); 

    console.log("Categories:", categories);

    console.log("Processed menu items:", menuItems);
    return {menuItems,categories};
  } catch (error) {
    console.error("Error fetching menu items:", error);
    throw error;
  }
};
