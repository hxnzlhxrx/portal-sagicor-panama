/* ===========================================
   RECLAMOS REPOSITORY
   <<--- </gishikoDev_> --->>
=========================================== */

console.log("repository.js cargado");

const ReclamosRepository = {

    async obtenerTodos(){

        const { data, error } =
            await db
                .from("reclamos")
                .select("*")
                .eq("archivado", false)
                .order(
                    "creado_en",
                    {
                        ascending: false
                    }
                );

        if(error){

            console.error(error);

            throw error;

        }

        return data;

    },

    async obtenerPorId(id){

        const { data, error } =
            await db
                .from("reclamos")
                .select("*")
                .eq("id", id)
                .single();

        if(error){

            console.error(error);

            return null;

        }

        return data;

    },

    async obtenerDocumentos(reclamoId){

        const { data, error } =
            await db
                .from("reclamos_documentos")
                .select("*")
                .eq("reclamo_id", reclamoId);

        if(error){

            console.error(error);

            return [];

        }

        return data;

    },

    async actualizarEstado(id, estado){

        const { error } =
            await db
                .from("reclamos")
                .update({

                    estado: estado

                })
                .eq("id", id);

        if(error){

            console.error(error);

            throw error;

        }

        return true;

    },

    async guardarObservacion(id, observacion){

        const { error } =
            await db
                .from("reclamos")
                .update({

                    observaciones_internas: observacion

                })
                .eq("id", id);

        if(error){

            throw error;

        }

        return true;

    },

    async actualizarAsignacion(id, asignado){

        const { data, error } =
            await db
                .from("reclamos")
                .update({

                    asignado_a: asignado,

                    actualizado_en:
                        new Date().toISOString()

                })
                .eq("id", id)
                .select()
                .single();

        if(error){

            console.error(error);

            throw error;

        }

        return data;

    },

    async archivar(id){

    const { error } =

        await db

            .from("reclamos")

            .update({

                archivado: true

            })

            .eq("id", id);

    if(error){

        console.error(error);

        throw error;

    }

    return true;

},

    async obtenerArchivados(){

        const { data, error } =
            await db
                .from("reclamos")
                .select("*")
                .eq("archivado", true)
                .order(
                    "creado_en",
                    {
                        ascending: false
                    }
                );

        if(error){

            throw error;

        }

        return data;

    }

};

window.ReclamosRepository = ReclamosRepository;
window.db = db;