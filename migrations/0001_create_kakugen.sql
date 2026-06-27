CREATE TABLE kakugen (
  id         INTEGER PRIMARY KEY AUTOINCREMENT,
  text       TEXT NOT NULL,
  author     TEXT NOT NULL,
  citation   TEXT,
  origin     TEXT NOT NULL DEFAULT 'user' CHECK (origin IN ('seed', 'user')),
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);
