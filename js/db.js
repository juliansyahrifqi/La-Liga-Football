var dbPromise = idb.open("laligadicoding", 1, function(upgradeDb) {
    if (!upgradeDb.objectStoreNames.contains("pertandingan-favorit")) {
        var peopleOS = upgradeDb.createObjectStore("pertandingan-favorit");
        peopleOS.createIndex("id", "id", {
            unique: true
        });
    }
});


function dbTambahData(match) {
    console.log(match.id);
    dbPromise.then(function (db) {
        var tx = db.transaction('pertandingan-favorit', 'readwrite');
        var store = tx.objectStore('pertandingan-favorit');

        store.put(match, match.id);

        return tx.complete;
    }).then(function () {
        M.toast({html: 'Ditambahkan ke favorit'})
        console.log('Pertandingan Favorit disimpan.');
    }).catch(function () {
        M.toast({html: 'Gagal disimpan'})
        console.log('Favorite Match gagal disimpan.');
    })
}

function dbHapusData(match_id) {
    dbPromise.then(function(db) {
        var tx = db.transaction('pertandingan-favorit', 'readwrite');
        var store = tx.objectStore('pertandingan-favorit');
        store.delete(match_id);
        return tx.complete;
    }).then(function () {
        M.toast({html: 'Dihapus dari favorit'})
        console.log('Berhasil dihapus dari favorit');
    });
}

function dbGetPertandinganFavorit() {
    dbPromise.then(function(db) {
        var tx = db.transaction('pertandingan-favorit', 'readonly');
        var store = tx.objectStore('pertandingan-favorit');
        return store.getAll();
    }).then(function (matches) {
        console.log(matches);
        var pertandinganHTML = "";
        matches.forEach(function(match) {
            pertandinganHTML += `
                <div class="card horizontal">
                    <div class="card-stacked">
                        <div class="card-content">
                            <div class="col s12 m5">
                                <h2 class="center-align"> ${match.home_score} </h2>
                                <h4 class="center-align"> ${match.home_name} </h4>
                            </div>

                            <div class="col s12 m2">
                                <h3 class="center-align"> VS </h3>
                            </div>

                            <div class="col s12 m5">
                                <h2 class="center-align"> ${match.away_score} </h2>
                                <h4 class="center-align"> ${match.away_name} </h4>
                            </div>
                        </div>
                        <p class="center-align"><strong> ${match.date} </strong> </p>
                        <p class="center-align"><strong> ${match.status} </strong></p>
                        <div class="card-action right-align">
                            <a href="#" class="btn indigo darken-4 hapus-favorit">Hapus</a>
                        </div>
                    </div>
                </div>
            `
        });

        document.getElementById("list-pertandingan").innerHTML = pertandinganHTML;

        const elms = document.getElementById("list-pertandingan").getElementsByClassName("hapus-favorit");
        for (let i = 0; i < elms.length; i++) {
            elms[i].onclick = () => {
                dbHapusData(matches[i].id);
                dbGetPertandinganFavorit();
            }
        }

    });
}