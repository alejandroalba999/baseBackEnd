const Usuario = require('../models/usuario'); //subir nivel
const { ObjectId } = require('mongoose').Types.ObjectId;

const getRolUsuario = async (id) => {
    try {
        const obtenerUsuario = await Usuario.aggregate(
            [
                { $match: { _id: ObjectId(id) } },
                {
                    $lookup: {
                        from: 'rols',
                        let: { idRol: '$objIdRol' },
                        pipeline: [
                            { $match: { $expr: { $eq: ['$_id', '$$idRol'] } } },
                            {
                                $lookup: {
                                    from: 'apis',
                                    let: { idApi: '$arrApi' },
                                    pipeline: [
                                        {
                                            $match: { $expr: { $in: [{ $toString: '$_id' }, "$$idApi"] } }
                                        }
                                    ],
                                    as: 'api'
                                }
                            },
                            {
                                $project: {
                                    "strNombre": "$strNombre",
                                    "apis": "$api"
                                }
                            }
                        ],
                        as: 'rol'
                    }
                },
                {
                    $project: {
                        strNombre: 1,
                        strDireccion: 1,
                        strDireccion: 1,
                        strEmail: 1,
                        "rol": {
                            $arrayElemAt: ["$rol", 0]
                        }
                    }
                }
            ]
        )
        return obtenerUsuario;
    } catch (error) {
        return error
    }
}



module.exports = {
    getRolUsuario,
};