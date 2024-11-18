<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Worklog Management System</title>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bulma@0.9.4/css/bulma.min.css">
    <link rel="stylesheet" href="./../assets/sidebar.css">
    <style>
        /* Custom styles to make the layout responsive */
        .top-bar {
            padding: 1rem;
            background-color: #3273dc;
            color: white;
            text-align: center;
        }

        .menu-bar {
            height: 100vh;
            background-color: #f5f5f5;
            padding-top: 1rem;
        }

        .content-area {
            padding: 2rem;
        }

        .bottom-bar {
            padding: 1rem;
            background-color: #3273dc;
            color: white;
            text-align: center;
        }
    </style>
</head>

<body>
    <!-- Top Bar -->
    <header class="top-bar">
        <p>Worklog Management System</p>
    </header>
    <!-- Toggle Button -->
    <button class="toggle-button" id="toggleButton">☰ Menu</button>
    <!-- Layout Container -->
    <div class="container is-fluid">
        <div class="columns">

            <!-- Sidebar -->
            <aside class="sidebar" id="sidebar">
                <br>
                <br>
                <aside class="menu">
                    <p class="menu-label">Navigation</p>
                    <ul class="menu-list">
                        <li><a href="#">WORKLOG</a></li>
                        <li><a href="#">FINANCES</a></li>
                    </ul>
                </aside>
            </aside>
            <!-- Content Area -->
            <main class="column content-area">
                <!-- Dynamic content will be loaded here -->
                <div id="">
                    <table class="table">
                        <thead>
                            <tr>
                                <th><abbr title="Worklog ID">ID</abbr></th>
                                <th><abbr title="Title">Titulo</abbr></th>
                                <th><abbr title="Description Link">Chamado</abbr></th>
                                <th><abbr title="Description">Descrição</abbr></th>
                                <th><abbr title="Analysis">Analise</abbr></th>
                                <th><abbr title="Created">Criado Em</abbr></th>
                                <th><abbr title="Editar">Editar</abbr></th>
                                <th><abbr title="Deletar">Deletar</abbr></th>
                            </tr>
                        </thead>
                        <?php include 'pagination.html' ?>
                    </table>
                </div>
                <div id="pagination-controls" class="buttons"></div>
            </main>
        </div>
    </div>

    <!-- Bottom Bar -->
    <footer class="bottom-bar">
        <p>Worklog Management System &copy; 2024. All rights reserved.</p>
    </footer>

    <script src="../assets/pagination.js" defer></script>
    <script src="../assets/sidebar.js" defer></script>
</body>

</html>