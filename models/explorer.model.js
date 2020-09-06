const { con } = require('../models/conn.db.js')

const Flyings = function (flyings) {
    this.uuid = flyings.uuid
    this.firstName = flyings.firstName
    this.photoURL = flyings.photoURL
    this.distance = flyings.distance
    this.id = flyings.id
    this.remark = flyings.remark
    this.isVerified = flyings.isVerified
}

const Explorer = function (explorer) {
    this.id = explorer.id
    this.country = explorer.country
    this.city = explorer.city
    this.code = explorer.code
    this.depdate = explorer.depdate
    this.tripgrpkey = explorer.tripgrpkey
    this.flyings = explorer.flyings
}

Explorer.get = (lat, lon, uuid, dist, result) => {
    var q = "SELECT u.uuid, u.firstName, u.photoURL, ( 6371 * acos( cos( radians(" + lat + ") ) * cos( radians( u.lat ) ) * " +
        "cos( radians( u.lon ) - radians(" + lon + ") ) + sin( radians(" + lat + ") ) * " +
        "sin( radians( u.lat )))) AS distance, t.id, t.country, t.city, t.code, t.depDate, t.tripGrpKey, t.remark, u.isVerified " +
        " FROM profiles as u inner join trips as t on t.uuid = u.uuid  " +
        " WHERE u.uuid <> '" + uuid + "' AND t.depDate >= CURDATE() HAVING distance < " + dist + " ORDER BY distance;"

    con.query(q, uuid, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        if (res.length == 0) {
            // not found Customer with the id
            result({ kind: "not_found" }, null);
            return;
        }
        var explorers = []

        res.forEach(element => {
            if (explorers.length > 0) {
                var ekey = element.country + element.city + element.code

                var found = explorers.filter(x => x.country + x.city + x.code === ekey);
                if (found.length > 0) {
                    explorers.forEach(item => {
                        var ikey = item.country + item.city + item.code
                        if (ekey == ikey) {
                            var f = new Flyings({
                                uuid: element.uuid,
                                firstName: element.firstName,
                                photoURL: element.photoURL,
                                distance: element.distance,
                                id: element.id,
                                remark: element.remark,
                                isVerified: element.isVerified
                            })
                            item.flyings.push(f)
                        }
                    })
                }
                else {
                    var explorer = new Explorer({
                        id: Number(element.tripGrpKey),
                        country: element.country,
                        city: element.city,
                        code: element.code,
                        depdate: element.depDate,
                        tripgrpkey: element.tripGrpKey,
                        flyings: [
                            new Flyings({
                                uuid: element.uuid,
                                firstName: element.firstName,
                                photoURL: element.photoURL,
                                distance: element.distance,
                                id: element.id,
                                remark: element.remark,
                                isVerified: element.isVerified
                            })
                        ]
                    })
                    explorers.push(explorer)
                }

            } else {
                var explorer = new Explorer({
                    id: Number(element.tripGrpKey),
                    country: element.country,
                    city: element.city,
                    code: element.code,
                    depdate: element.depDate,
                    tripgrpkey: element.tripGrpKey,
                    flyings: [
                        new Flyings({
                            uuid: element.uuid,
                            firstName: element.firstName,
                            photoURL: element.photoURL,
                            distance: element.distance,
                            id: element.id,
                            remark: element.remark,
                            isVerified: element.isVerified
                        })
                    ]
                })
                explorers.push(explorer)
            }
        })

        result(null, explorers);
    });
}

module.exports = Explorer;