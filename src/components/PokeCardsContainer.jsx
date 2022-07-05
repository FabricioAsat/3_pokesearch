import React, { useState } from "react";
import { useFetch } from "../hooks/useFetch";
import Loader from "./Loader";
import PokeCard from "./PokeCard";

const PokeCardsContainer = ({ pokemonMatches }) => {
	if (!!pokemonMatches) return <NormalContainer />;
};

function NormalContainer() {
	const [url, setUrl] = useState(process.env.REACT_APP_URL);
	const datos = useFetch(url);

	return (
		<>
			{datos.isPending ? (
				<div className="flex justify-center items-center w-full">
					<Loader />
				</div>
			) : (
				<div>
					{/* Botones prev y next */}

					<nav className="flex gap-2 justify-around w-full max-w-xs mx-auto">
						{!!datos.data.previous && (
							<button
								className="bg-emerald-800 px-4 py-1 font-bold border-lime-500 border rounded-md"
								onClick={() => setUrl(datos.data?.previous)}>
								Prev
							</button>
						)}
						{!!datos.data.next && (
							<button
								className="bg-emerald-800 px-4 py-1 font-bold border-lime-500 border rounded-md"
								onClick={() => setUrl(datos.data?.next)}>
								Next
							</button>
						)}
					</nav>

					{/* Cards de pokémon */}
					<div className="grid grid-cols-gridCards justify-items-center gap-x-6 gap-y-6 px-4 py-10">
						{datos.data.results.map((pokemon) => (
							<PokeCard key={pokemon.name} url={pokemon.url} />
						))}
					</div>

					{/* Botones prev y next */}
					<nav className="flex gap-2 justify-around w-full max-w-xs mx-auto">
						{!!datos.data.previous && (
							<button
								className="bg-emerald-800 px-4 py-1 font-bold border-lime-500 border rounded-md"
								onClick={() => setUrl(datos.data?.previous)}>
								Prev
							</button>
						)}
						{!!datos.data.next && (
							<button
								className="bg-emerald-800 px-4 py-1 font-bold border-lime-500 border rounded-md"
								onClick={() => setUrl(datos.data?.next)}>
								Next
							</button>
						)}
					</nav>
				</div>
			)}
		</>
	);
}

export default PokeCardsContainer;
