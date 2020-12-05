
const { Vehicle, sequelize } = require('../models/vehicle');
const { Tariff } = require('../models/tariff');
const { QueryTypes } = require('sequelize');
const { parseTime, getTime } = require('../helpers/functions');

const createInsert = async (req, res) => {

    const { vehicle, placa, fecha, hour, pay } = req.body;
    try {

        let newVehicle = await Vehicle.create({
            vehicle,
            placa,
            fecha,
            hour,
            pay
        }, {
            fields: ['vehicle', 'placa', 'fecha', 'hour', 'pay']
        });
        if (newVehicle) {
            res.json({
                ok: true,
                newVehicle,
            });
        }
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Falló'
        });
    }
}
const search = async (req, res) => {
    const { placa } = req.body;
    try {
        const vehicle = await Vehicle.findOne(
            {
                where: {
                    placa,
                    pay: false
                },
                order: [
                    ['id', 'DESC'],
                ]
            });
        if (!vehicle) {
            return res.status(404).json({
                ok: false,
                msg: 'Vehiculo no encontrado'
            });
        }

        res.json({
            ok: true,
            vehicle
        })
    }
    catch (error) {
        return res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }

}
const getReport = async (req, res) => {
    try {
        const time = req.params.wk
        let vehicle = null;
        if (time == 0) {
            vehicle = await sequelize.query("select * from vehicles where fecha = current_date;", { type: QueryTypes.SELECT });
        } else {
            vehicle = await sequelize.query(`SELECT * FROM vehicles where fecha > now() - interval '${time} week';`, { type: QueryTypes.SELECT });
        }
        console.log(vehicle);
        if (!vehicle) {
            return res.status(404).json({
                ok: false,
                msg: 'Vehiculo no encontrado'
            });
        }
        res.json({
            ok: true,
            vehicle
        })
    }
    catch (error) {
        return res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }
}

const pay = async (req, res) => {
    try {
        let total = 0;
        const { cStart, cStop, id_transport } = req.body;
        var tStart = parseTime(cStart);
        var tStop = parseTime(cStop);

        const value = parseInt((tStop - tStart) / (1000 * 60));

        time = getTime(value);

        const tarrif = await Tariff.findOne(
            {
                where: {
                    id_transport,
                }
            });
        total = (tarrif['fraccion'] * time['P']) + (tarrif['half'] * time['M']) + (tarrif['hour'] * time['H']);
        res.json({
            ok: true,
            value,
            total
        })
    } catch (error) {
        return res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }

}
module.exports = {
    createInsert,
    search,
    getReport,
    pay
}