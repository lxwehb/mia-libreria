const AIRTABLE_API_KEY = process.env.AIRTABLE_API_KEY;
const BASE_ID = "patjeGY2SdgLA0sr2";  // Il tuo ID base
const TABLE_NAME = "Libri";

export default async function handler(req, res) {
  const url = `https://api.airtable.com/v0/${BASE_ID}/${TABLE_NAME}`; // 🔥 Qui corretto

  try {
    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${AIRTABLE_API_KEY}`,
      },
    });

    if (!response.ok) {
      throw new Error(`Airtable errore: ${response.status}`);
    }

    const data = await response.json();
    const libri = data.records.map(record => record.fields);

    res.status(200).json(libri);
  } catch (error) {
    console.error("Errore:", error);
    res.status(500).json({ error: "Impossibile caricare i libri" });
  }
}

