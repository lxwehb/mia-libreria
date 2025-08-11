export default async function handler(req, res) {
  const AIRTABLE_API_KEY = process.env.AIRTABLE_API_KEY;
  const BASE_ID = "appzKMcpJupcEcB9v";        // Il tuo Base ID
  const TABLE_NAME = "Table%201";             // Nome della tabella con spazio

  const url = `https://api.airtable.com/v0/${BASE_ID}/${TABLE_NAME}`;

  try {
    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${AIRTABLE_API_KEY}`,
      },
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error("Airtable errore:", response.status, errorData);
      throw new Error(`Airtable errore: ${response.status}`);
    }

    const data = await response.json();
    const libri = data.records.map(record => record.fields);

    res.status(200).json(libri);
  } catch (error) {
    console.error("Errore nel backend:", error);
    res.status(500).json({ 
      error: "Impossibile caricare i libri",
      message: error.message 
    });
  }
}

