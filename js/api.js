const base_url = "https://api.football-data.org/v2/competitions/2014/" //La Liga = 2014
const token = "27719df59a6f4a64959954fa35d4a6ad";

const fetchApi = function(base_url) {
    return fetch(base_url, {
        headers: {
            'X-Auth-Token': token
        },
    });
};

function status(response) {
    if(response.status !== 200) {
        console.log("error : " + response.status);
        return Promise.reject(new Error(response.statusText));
    } else {
        return Promise.resolve(response);
    }
}

function json(response) {
    return response.json();
}

function error(error) {
    console.log("Error : ", error);
}

function getKlasemen() {
        fetchApi(base_url + "standings")
        .then(status)
        .then(json)
        .then(function (data) {
            data.standings.forEach(function (season) {
                if (season.type == "TOTAL") {
                    season.table.forEach(function(match) {
                        var klasemenHTML = ""
                        var icon = match.team.crestUrl.replace(/^http:\/\//i, 'https://')
                        klasemenHTML += `
                        <table>
                            <tr>
                                <td class="center-align">${match.position}</td>
                                <td class="center-align">
                                    <img src="${icon}" class="icon-team">
                                </td>
                                <td>
                                    <a href="info-klub.html?id=${match.team.id}">${match.team.name}</a>
                                </td>
                                <td class="center-align">${match.playedGames}</td>
                                <td class="center-align">${match.won}</td>
                                <td class="center-align">${match.draw}</td>
                                <td class="center-align">${match.lost}</td>
                                <td class="center-align">${match.goalsFor}</td>
                                <td class="center-align">${match.goalsAgainst}</td>
                                <td class="center-align">${match.goalDifference}</td>
                                <td class="center-align">${match.points}</td>
                            </tr>
                        </table>
                    `;

                    document.getElementById("body-content").innerHTML += klasemenHTML;

                    })
                }
            });
        })
        .catch(error);
}

function getKlub() {
    fetchApi(base_url + "teams")
    .then(status)
    .then(json)
    .then(function(data) {
        var klubHTML = "";
        data.teams.forEach(function(team) {
            var icon = team.crestUrl.replace(/^http:\/\//i, 'https://')
            klubHTML += `
                    <div class="col s12 m6">
                        <div class="card">
                            <div class="card-image">
                                <img src="${icon}" class="logo-klub valign-wrapper">
                                
                            </div>
                            <div class="card-content">
                            <span class="card-title"><strong> ${team.name} </strong></span>
                                <ul>
                                    <li>Nama Pendek : ${team.shortName} </li>
                                    <li>Berdiri     : ${team.founded} </li>
                                    <li>Stadion     : ${team.venue} </li>
                                    <li>Website     : <a href="${team.website}" target="_blank">${team.website} </li>
                                </ul>
                            </div>
                            <div class="card-action">
                                <a href="info-klub.html?id=${team.id}">Info Klub</a>
                            </div>
                        </div>
                    </div>
        `;
        });
        document.getElementById("list-klub").innerHTML += klubHTML;
    })
    .catch(error);
}

function getKlubById() {
    var urlParams = new URLSearchParams(window.location.search);
    var idParam = urlParams.get("id");
    
    fetchApi("https://api.football-data.org/v2/teams/" + idParam)
    .then(status)
    .then(json)
    .then(function(data) {
        var infoklubHTML = ""
        var icon = data.crestUrl.replace(/^http:\/\//i, 'https://');

        infoklubHTML = `
        <div class="card">
            <div class="card-image">
                <img src="${icon}" class="logo-klub">
            </div>
            <div class="card-content">
            <span class="card-title"><strong> ${data.name} </strong></span>
                <table>
                    <tr>
                        <th> Nama Pendek  </th> 
                        <td> ${data.shortName} </td>
                    </tr>
                    <tr>
                        <th> Singkatan  </th> 
                        <td> ${data.tla} </td>
                    </tr>
                    <tr>
                        <th> Berdiri  </th> 
                        <td> ${data.founded} </td>
                    </tr>
                    <tr>
                        <th> Stadion  </th> 
                        <td> ${data.venue} </td>
                    </tr>
                    <tr>
                        <th> Alamat  </th> 
                        <td> ${data.address} </td>
                    </tr>
                    <tr>
                        <th> No. Tlp  </th> 
                        <td> ${data.phone} </td>
                    </tr>
                    <tr>
                        <th> Website  </th> 
                        <td> <a href="${data.website}" target="_blank">${data.website} </td>
                    </tr>
                    <tr>
                        <th> Email  </th>
                        <td> ${data.email} </td>
                    </tr>
                </table>
            </div>
        </div>
        `;

        var pemainHTML = ""
            data.squad.forEach(function(pemain){
                pemainHTML += `
                    <div class="card horizontal">
                        <div class="card-stacked">
                            <div class="card-content">
                            <span class="card-title"><strong> ${pemain.name} </strong></span>
                                <p> Posisi : ${pemain.position} </p>
                                <p> Tempat Lahir : ${pemain.countryOfBirth} </p>
                                <p> Negara : ${pemain.nationality} </p>
                            </div>
                        </div>
                    </div>
                `;
            });

            document.getElementById("detail-klub").innerHTML = infoklubHTML;
            document.getElementById("pemain").innerHTML = pemainHTML;

    })
    .catch(error);
}
    

function getPertandingan() {
        fetchApi(base_url + "matches")
        .then(status)
        .then(json)
        .then(function (data) {

            var pertandinganHTML = "";
            data.matches.forEach(function (match) {
                pertandinganHTML += `
                    <div class="card horizontal">
                        <div class="card-stacked">
                            <div class="card-content">
                                <div class="col s12 m5">
                                    <h2 class="center-align"> ${match.score.fullTime.homeTeam} </h2>
                                    <h4 class="center-align"> ${match.homeTeam.name} </h4>
                                </div>

                                <div class="col s12 m2">
                                    <h3 class="center-align"> VS </h3>
                                </div>

                                <div class="col s12 m5">
                                    <h2 class="center-align"> ${match.score.fullTime.awayTeam} </h2>
                                    <h4 class="center-align"> ${match.awayTeam.name} </h4>
                                </div>
                            </div>
                            <p class="center-align"><strong> ${match.utcDate} </strong> </p>
                            <p class="center-align"><strong> ${match.status} </strong></p>
                            <div class="card-action right-align">
                                <a href="#" class="tambah-favorit btn indigo darken-4">Tambah ke favorit</a>
                            </div>
                        </div>
                    </div>
            `
            });

            document.getElementById("list-pertandingan").innerHTML = pertandinganHTML;

            const elms = document.getElementById("list-pertandingan").getElementsByClassName("tambah-favorit");
            for (let i = 0; i < elms.length; i++) {
                elms[i].onclick = () => {
                    const simpanData = {
                        id: data.matches[i].id,
                        home_id: data.matches[i].homeTeam.id,
                        home_name: data.matches[i].homeTeam.name,
                        away_id: data.matches[i].awayTeam.id,
                        away_name: data.matches[i].awayTeam.name,
                        date: data.matches[i].utcDate,
                        status: data.matches[i].status,
                        home_score: data.matches[i].score.fullTime.homeTeam,
                        away_score: data.matches[i].score.fullTime.awayTeam
                    };
                    dbTambahData(simpanData)
                }
            }

        })
        .catch(error);

}