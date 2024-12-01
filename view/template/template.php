<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Worklog Management System</title>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bulma@0.9.4/css/bulma.min.css">
    <link rel="stylesheet" href="./../assets/sidebar.css">
</head>

<body>
    <!-- Top Bar -->
    <header class="top-bar">
        <p>Life Management System</p>
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
                        <li><a href="#"><span class="icon has-text-info"><i
                                        class="fas fa-arrow-right"></i></span>WORKLOG</a></li>
                        <li><a href="#">FINANCES</a></li>
                    </ul>
                </aside>
            </aside>
            <!-- Content Area -->
            <main>
                <!-- Dynamic content will be loaded here -->
                <div class="column content-area" id="content">
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
                        <tfoot>
                            <nav class="pagination" role="navigation" aria-label="pagination">
                                <button id="prev" class="button">Previous</button>
                                <button id="next" class="button">Next</button>
                                <p>Page: <span id="page-number">1</span></p>
                            </nav>
                        </tfoot>
                    </table>
                </div>
                <div id="pagination-controls" class="buttons"></div>
            </main>
        </div>
    </div>

    <!-- Bottom Bar -->
    <footer class="bottom-bar footer">
        <p>Worklog Management System &copy; 2024. All rights reserved.</p>
    </footer>

    <script src="../assets/pagination.js" defer></script>
    <script src="../assets/sidebar.js" defer></script>
</body>

</html>