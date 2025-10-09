import configPromise from "@/domains/payload/payload.config";
import { getPayload } from "payload";

export const GET = async () => {
	const payload = await getPayload({
		config: configPromise,
	});

	// const data = await payload.find({
	// 	collection: "users",
	// });

	await payload.update({
		collection: "users", // nome da collection de usuários
		id: "COLOQUE_O_ID_DO_USUARIO_AQUI",
		data: {
			password: "@Mudarsenha123",
		},
	});

	return Response.json({ message: "Senha alterada com sucesso" });
};
