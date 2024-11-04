# Worklog Management System

A PHP-based application for managing worklogs with CRUD operations using SQLite. This system enables users to create, read, update, and delete worklogs, complete with features like marking tasks as finished.

## Features

- **CRUD Operations**: Create, read, update, and delete worklogs.
- **Task Details**: Each worklog includes a task number, title, link to the task description, detailed description, and analysis.
- **Mark as Finished**: Option to mark tasks as completed, with visual indicators.
- **Responsive UI**: Built with the Bulma CSS framework for a modern and user-friendly interface.
- **Modals for Editing**: Edit worklog entries through modals for a seamless user experience.

## Technologies Used

- **PHP**: Server-side scripting language for backend logic.
- **SQLite**: Lightweight database for data storage.
- **Bulma**: CSS framework for responsive and aesthetically pleasing design.

## Installation

1. **Clone the Repository**:
    ```bash
    git clone https://github.com/yourusername/worklog-management-system.git
    cd worklog-management-system
    ```

2. **Set Up the Database**:
    - Ensure PHP and SQLite3 are installed on your system.
    - Create the SQLite database and the required table by running:
      ```sql
      CREATE TABLE worklogs (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          task_number TEXT NOT NULL,
          title TEXT NOT NULL,
          description_link TEXT NOT NULL,
          description TEXT,
          analysis TEXT,
          is_finished BOOLEAN DEFAULT 0,
          date_created DATETIME DEFAULT CURRENT_TIMESTAMP,
          last_updated DATETIME
      );
      ```

3. **Run the Application**:
    - Place the project in your web server's root directory (e.g., `htdocs` for XAMPP, `www` for WAMP).
    - Access the application via `http://localhost/worklog-management-system`.

## Usage

### Create a Worklog
1. Navigate to the main page and click "Create Worklog".
2. Fill in the task number, title, link, description, and analysis fields.
3. Submit the form to add the worklog to the database.

### Edit a Worklog
1. Click the "Edit" button on any worklog entry.
2. Modify the details in the modal that appears.
3. Save changes to update the entry.

### Mark as Finished
- Use the "Mark as finished" checkbox in the edit modal to mark a task as complete. Finished tasks will appear with a crossed-out title and a `(FINISHED)` label.


## License

This project is licensed under the MIT License. See `LICENSE` for more details.

## Contributing

Contributions are welcome! Please fork this repository and submit a pull request for any enhancements or bug fixes.

## Contact

For questions or feedback, please contact [conectis360@gmail.com](mailto:conectis360@gmail.com).