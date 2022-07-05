import React, { lazy, Suspense, useEffect, useState } from "react";
import { useFetch } from "../hooks/useFetch";
import Loader from "./Loader";

const ModalPokemon = lazy(() => import("./ModalPokemon"));

const PokeCard = ({ url }) => {
	const datos = useFetch(url);

	if (datos.error) return <Error />;

	return <Card datos={datos} />;
};

export default PokeCard;

function Error() {
	return (
		<div className="bg-gradient-to-t from-red-900 via-red-500 to-red-900 flex flex-col items-center justify-center gap-2 h-64 w-48 text-center">
			<h2 className="text-4xl font-bold">Error 404</h2>
			<small className="italic text-base">Pokemon not found</small>
		</div>
	);
}

function Card({ datos }) {
	const [datosCard, setDatosCard] = useState({ name: "", img: "", types: "" });
	const [showModal, setShowModal] = useState(false);

	useEffect(() => {
		if (datos.isPending) return;

		const name = datos.data.name.replaceAll("-", " ");
		const img = datos.data.sprites.front_default;
		let types = "";

		datos.data.types.forEach((type) => {
			types += type.type.name + " ";
		});

		setDatosCard({ name, img, types });
	}, [datos]);

	if (datos.isPending)
		return (
			<div className="bg-black/75 flex flex-col items-center justify-center gap-2 h-64 w-48 text-center shadow-md shadow-black rounded-lg animate-pulse">
				<Loader />
			</div>
		);

	return (
		<>
			<button onClick={() => setShowModal(true)}>
				<div className="bg-gradient-to-t from-black/50 via-black/30 to-black/50 flex flex-col items-center justify-center gap-1 h-64 w-48 text-center shadow-md shadow-black rounded-lg px-2 py-4">
					<img src={datosCard.img} alt={datosCard.name} className="h-5/6 max-h-32" />
					<h2 className="text-2xl font-bold capitalize">{datosCard.name}</h2>
					<small className="italic text-base capitalize">{datosCard.types}</small>
				</div>
			</button>

			{showModal && (
				<Suspense fallback={<Loader />}>
					<ModalPokemon setShowModal={setShowModal} datos={datos} />
				</Suspense>
			)}
		</>
	);
}
