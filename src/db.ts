export interface Kakugen {
  id: number;
  text: string;
  author: string;
  citation: string | null;
  origin: "seed" | "user";
  created_at: string;
}

export async function randomKakugen(db: D1Database): Promise<Kakugen | null> {
  return await db
    .prepare("SELECT * FROM kakugen ORDER BY RANDOM() LIMIT 1")
    .first<Kakugen>();
}

export async function getKakugen(db: D1Database, id: number): Promise<Kakugen | null> {
  return await db
    .prepare("SELECT * FROM kakugen WHERE id = ?")
    .bind(id)
    .first<Kakugen>();
}

export async function insertKakugen(
  db: D1Database,
  text: string,
  author: string
): Promise<number> {
  const res = await db
    .prepare("INSERT INTO kakugen (text, author, citation, origin) VALUES (?, ?, NULL, 'user')")
    .bind(text, author)
    .run();
  return res.meta.last_row_id as number;
}
