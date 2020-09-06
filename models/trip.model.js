const { con } = require('../models/conn.db.js')

const Trip = function Trip(trip) {
    this.id = trip.id
    this.uuid = trip.uuid
    this.country = trip.country
    this.city = trip.city
    this.code = trip.code
    this.depdate = trip.depdate
    this.arrdate = trip.arrdate
    this.remark = trip.remark
    this.lastupdate = trip.lastupdate
    this.tripgrpkey = trip.tripgrpkey
}

Trip.insert = (newTrip, result) => {
    con.query("INSERT INTO trips SET ? ", newTrip, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, { message: err.message, id: newTrip.id });
            return
        }

        console.log("created new trip: ", { ...newTrip });
        result(null, { ...newTrip });
    });
}

Trip.get = (uuid, result) => {
    con.query("SELECT * FROM trips WHERE uuid = ?", uuid, (err, res) => {
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

        result(null, res);
    });
}

Trip.update = (trip, result) => {
    const q = "UPDATE trips SET id = ?, uuid = ?, country = ?, city = ?, code = ?, depdate = ?, arrdate = ?, remark = ?, lastupdate = ?, tripgrpkey = ?"
    con.query(q, [trip.id, trip.uuid, trip.country, trip.city, trip.code, trip.depdate, trip.arrdate, trip.remark, trip.lastupdate, trip.tripgrpkey], (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        if (res.affectedRows == 0) {
            // not found Customer with the id
            result({ kind: "not_found" }, null);
            return;
        }

        console.log("updated trip: ", { id: trip.id, ...trip });
        result(null, { id: trip.id, ...trip });
    }
    );
}

Trip.delete = (id, result) => {
    con.query('DELETE FROM trips WHERE id = ? ', id, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        if (res.affectedRows == 0) {
            // not found Customer with the id
            result({ kind: "not_found" }, null);
            return;
        }

        console.log("deleted trip with id: ", id);
        result(null, uuid);
    })
}

module.exports = Trip