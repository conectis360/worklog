<?php
include "create.php"
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Create Worklog</title>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bulma@0.9.4/css/bulma.min.css">
</head>
<body>
    <section class="section">
        <div class="container">
            <h1 class="title">Create a Worklog</h1>
            <form action="create.php" method="post">
                <div class="field">
                    <label class="label">Task Number</label>
                    <div class="control">
                        <input class="input" type="text" name="task_number" placeholder="Task Number" required>
                    </div>
                </div>

                <div class="field">
                    <label class="label">Title</label>
                    <div class="control">
                        <input class="input" type="text" name="title" placeholder="Title" required>
                    </div>
                </div>

                <div class="field">
                    <label class="label">Link to Task Description</label>
                    <div class="control">
                        <input class="input" type="url" name="description_link" placeholder="Link to Task Description" required>
                    </div>
                </div>

                <div class="field">
                    <label class="label">Description</label>
                    <div class="control">
                        <textarea class="textarea" name="description" placeholder="Task Description"></textarea>
                    </div>
                </div>

                <div class="field">
                    <label class="label">Analysis</label>
                    <div class="control">
                        <textarea class="textarea" name="analysis" placeholder="Analysis"></textarea>
                    </div>
                </div>

                <div class="field is-grouped">
                    <div class="control">
                        <button class="button is-primary" type="submit">Create Worklog</button>
                    </div>
                    <div class="control">
                        <button class="button is-light" type="reset">Reset</button>
                    </div>
                </div>
            </form>
        </div>
    </section>
</body>
</html>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Worklog List</title>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bulma@0.9.4/css/bulma.min.css">
    <script>
        // JavaScript to handle opening and closing the modal
        document.addEventListener('DOMContentLoaded', () => {
            document.querySelectorAll('.edit-button').forEach(button => {
                button.addEventListener('click', () => {
                    const modal = document.getElementById(`modal-${button.dataset.id}`);
                    modal.classList.add('is-active');
                });
            });

            document.querySelectorAll('.modal-close, .modal-background').forEach(closeBtn => {
                closeBtn.addEventListener('click', () => {
                    closeBtn.closest('.modal').classList.remove('is-active');
                });
            });
        });
    </script>
</head>
<body>
    <section class="section">
        <div class="container">
            <h1 class="title">Worklog Entries</h1>
            <?php
            $worklogs = getWorklogs(); // Assume getWorklogs() fetches data from the database
            if (count($worklogs) > 0) {
                foreach ($worklogs as $worklog) {
                    $titleDisplay = $worklog['is_finished'] ? "<s>{$worklog['title']}</s> (FINISHED)" : $worklog['title'];
                    echo "<div class='box'>";
                    echo "<h2 class='subtitle'>$titleDisplay (Task #{$worklog['task_number']})</h2>";
                    echo "<p><a href='{$worklog['description_link']}' target='_blank' class='is-link'>View Task Description</a></p>";
                    echo "<p><strong>Description:</strong> {$worklog['description']}</p>";
                    echo "<p><strong>Analysis:</strong> {$worklog['analysis']}</p>";
                    echo "<p class='has-text-grey-light'>Created on: {$worklog['date_created']}</p>";
                    echo "<button class='button is-info edit-button' data-id='{$worklog['id']}'>Edit</button>";
                    echo "</div>";
                   
                    // Modal for editing this specific worklog
                    echo "
                    <div class='modal' id='modal-{$worklog['id']}'>
                        <div class='modal-background'></div>
                        <div class='modal-card'>
                            <header class='modal-card-head'>
                                <p class='modal-card-title'>Edit Worklog</p>
                                <button class='delete modal-close' aria-label='close'></button>
                            </header>
                            <section class='modal-card-body'>
                                <form action='edit.php' method='post'>
                                    <input type='hidden' name='id' value='{$worklog['id']}'>
                                    
                                    <div class='field'>
                                        <label class='label'>Task Number</label>
                                        <div class='control'>
                                            <input class='input' type='text' name='task_number' value='{$worklog['task_number']}' required>
                                        </div>
                                    </div>

                                    <div class='field'>
                                        <label class='label'>Title</label>
                                        <div class='control'>
                                            <input class='input' type='text' name='title' value='{$worklog['title']}' required>
                                        </div>
                                    </div>

                                    <div class='field'>
                                        <label class='label'>Link to Task Description</label>
                                        <div class='control'>
                                            <input class='input' type='url' name='description_link' value='{$worklog['description_link']}' required>
                                        </div>
                                    </div>

                                    <div class='field'>
                                        <label class='label'>Description</label>
                                        <div class='control'>
                                            <textarea class='textarea' name='description'>{$worklog['description']}</textarea>
                                        </div>
                                    </div>

                                    <div class='field'>
                                        <label class='label'>Analysis</label>
                                        <div class='control'>
                                            <textarea class='textarea' name='analysis'>{$worklog['analysis']}</textarea>
                                        </div>
                                    </div>

                                    <div class='field'>
                                        <label class='checkbox'>
                                            <input type='checkbox' name='is_finished' value='1' <?php
                                            if ($worklog[is_finished]) {
                                                echo 'checked'
                                            }
                                            ?>
                                            Mark as finished
                                        </label>
                                    </div>

                                    <div class='field is-grouped'>
                                        <div class='control'>
                                            <button class='button is-success' type='submit'>Save Changes</button>
                                        </div>
                                        <div class='control'>
                                            <button class='button is-light modal-close' type='button'>Cancel</button>
                                        </div>
                                    </div>
                                </form>
                            </section>
                        </div>
                    </div>
                    ";
                }
            } else {
                echo "<p class='notification is-warning'>No worklog entries found.</p>";
            }
            ?>
        </div>
    </section>
</body>
</html>
