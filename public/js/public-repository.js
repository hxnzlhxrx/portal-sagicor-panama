/* ===========================================
   RECLAMOS REPOSITORY
   <<--- </gishikoDev_> --->
=========================================== */

console.log("repository.js cargado");

console.log("db =", db);

const ReclamosRepository = {

    async actualizarCantidadDocumentos(id, cantidad) {

        const { error } =
            await db
                .from("reclamos")
                .update({
                    docs_count: cantidad
                })
                .eq("id", id);

        if (error) {

            throw error;

        }

    },

    async crear(reclamo) {

        const { data, error } =
            await db
                .from("reclamos")
                .insert([reclamo])
                .select()
                .single();

        if (error) {

            console.error(
                "Error creando reclamo:",
                error
            );

            throw error;
        }

        return data;

    },

    async buscar(numero) {

        const { data, error } =
            await db
                .from("reclamos")
                .select("*")
                .eq("num", numero)
                .single();

        if (error) {

            console.error(
                "Error buscando reclamo:",
                error
            );

            return null;

        }

        return data;

    }

};


window.ReclamosRepository = ReclamosRepository;