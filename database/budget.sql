CREATE TABLE income (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER,
    amount DECIMAL(10, 2),
    source TEXT,
    date DATE,
    notes TEXT,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE expenses (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER,
    amount DECIMAL(10, 2),
    category TEXT,
    date DATE,
    notes TEXT,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE savings (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER,
    amount DECIMAL(10, 2),
    goal TEXT,
    date DATE,
    notes TEXT,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE investments (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER,
    amount DECIMAL(10, 2),
    type TEXT,
    category TEXT,
    date DATE,
    notes TEXT
);


CREATE TABLE debts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER,
    amount DECIMAL(10, 2),
    type TEXT,
    due_date DATE,
    notes TEXT,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE budget_summary (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER,
    planned_income DECIMAL(10, 2),
    planned_expenses DECIMAL(10, 2),
    actual_income DECIMAL(10, 2),
    actual_expenses DECIMAL(10, 2),
    month INTEGER,
    year INTEGER,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

