<!DOCTYPE html>
<html lang="fr">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Flight Search</title>
    <style>
html, body {
    height: 100%;
    margin: 0;
    padding: 0;
    font-family: Arial, sans-serif;
}

body {
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #f4f4f4;
    width:100%;
}

.container {
    width: 100%;
    height: 100%;
 
    margin: 0;
    padding: 20px;
    background-color: #fff;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

header {
    background-color: #003366;
    color: #fff;
    padding: 20px;
    border-radius: 10px 10px 0 0;
}

.top-bar {
    display: flex;
    justify-content: space-between;
}

.search-bar h1 {
    margin: 0;
    padding: 0;
    text-align: center;
}

.search-options {
    display: flex;
    justify-content: space-around;
    margin-top: 10px;
}

.search-options button {
    background: none;
    border: none;
    color: #fff;
    padding: 10px;
    cursor: pointer;
}

.search-options .active {
    border-bottom: 2px solid #ff6600;
}

.search-inputs {
    display: flex;
    justify-content: space-between;
    margin-top: 10px;
    flex-wrap: wrap;
}

.search-inputs input[type="text"],
.search-inputs input[type="date"] {
    width: 48%;
    padding: 10px;
    margin-top: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
}

.passenger-class {
    display: flex;
    justify-content: space-between;
    margin-top: 10px;
    color: #fff;
}

main {
    flex: 1;
    padding: 20px;
    overflow-y: auto;
}

.flights {
    margin-top: 20px;
}

.flights h2 {
    margin: 0;
    padding: 0;
    font-size: 24px;
    color: #333;
    text-align: center;
}

.filters {
    display: flex;
    justify-content: space-around;
    margin-top: 10px;
}

.filters button {
    background: none;
    border: none;
    color: #003366;
    padding: 10px;
    cursor: pointer;
}

.flight-list {
    margin-top: 20px;
}

.flight {
    background-color: #f9f9f9;
    padding: 10px;
    margin-bottom: 10px;
    border-radius: 5px;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
}

.flight .airline {
    font-weight: bold;
}

.flight .details {
    display: flex;
    justify-content: space-between;
    margin-top: 5px;
}

.flight .details .time,
.flight .details .duration,
.flight .details .stop,
.flight .details .price {
    display: block;
}    </style>
</head>

<body>
    <div class="container">
        <header>
            <div class="top-bar">
                <span class="time">1:23 🌙</span>
                <span class="signal">📶</span>
            </div>
            <div class="search-bar">
                <h1>Rechercher</h1>
                <div class="search-options">
                    <button class="active">Aller-retour</button>
                    <button>Aller simple</button>
                    <button>Multi-destinations</button>
                </div>
                <div class="search-inputs">
                    <input type="text" placeholder="Madrid-Barajas">
                    <span class="arrow">➡️</span>
                    <input type="text" placeholder="Bangkok">
                    <input type="date" value="2024-07-01">
                    <input type="date" value="2024-07-08">
                </div>
                <div class="passenger-class">
                    <span>1 voyageur</span>
                    <span>Classe économique</span>
                </div>
            </div>
        </header>
        <main>
            <section class="flights">
                <h2>Vols pour Bangkok</h2>
                <div class="filters">
                    <button>Les meilleurs</button>
                    <button>Les moins chers</button>
                    <button>Les plus rapides</button>
                </div>
                <div class="flight-list">
                    <div class="flight">
                        <div class="airline">Air France et KLM</div>
                        <div class="details">
                            <span class="time">12:20 - 09:05+1</span>
                            <span class="duration">15 h 45 min</span>
                            <span class="stop">1 escale</span>
                            <span class="price">312748 UM</span>
                        </div>
                    </div>
                    <div class="flight">
                        <div class="airline">Iberia</div>
                        <div class="details">
                            <span class="time">16:10 - 12:45+1</span>
                            <span class="duration">15 h 35 min</span>
                            <span class="stop">1 escale</span>
                            <span class="price">353926 UM</span>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    </div>
</body>

</html>