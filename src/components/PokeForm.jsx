import React, { useEffect, useState } from "react";
import { useFetch } from "../hooks/useFetch";

const PokeForm = ({
	handleChangePokemonToSearch,
	pokemonToSearch,
	setPokemonMatches,
	setDoASearch,
	doASearch,
}) => {
	// * States
	const [url, setUrl] = useState(process.env.REACT_APP_URL);
	const [count, setCount] = useState(0);

	// * Fetch
	const datos = useFetch(url);

	//
	useEffect(() => {
		// * Verifica que haya datos.
		if (datos.isPending) return;

		// * Verifica que estén todos los pokemones cargados, y no solo los primeros 20
		if (!datos.data.next) return;

		setCount(datos.data.count);
		setUrl(process.env.REACT_APP_URL + `?offset=0&limit=${count}`);

		return () => {};
	}, [datos]);

	// ! Si hubo un error en el fetch, retornará este error
	if (!!datos.error) return <Error />;

	// ! Si no hay error significa que se encontraron datos, y por ende,

	return (
		<FormSearch
			handleChangePokemonToSearch={handleChangePokemonToSearch}
			pokemonToSearch={pokemonToSearch}
			setPokemonMatches={setPokemonMatches}
			datos={datos}
			setDoASearch={setDoASearch}
			doASearch={doASearch}
		/>
	);
};

// * Error Component
function Error() {
	return (
		<form className="flex justify-center items-center mb-4">
			<input
				type="text"
				placeholder="Error 404 - Fetch error"
				className="bg-red-800 outline-none w-full max-w-md font-bold placeholder:text-white placeholder:text-xl py-4 px-8 text-center"
				disabled
			/>
		</form>
	);
}

// * Normal Component
function FormSearch({
	handleChangePokemonToSearch,
	pokemonToSearch,
	setPokemonMatches,
	setDoASearch,
	datos,
	doASearch,
}) {
	function handleSubmit(e) {
		e.preventDefault();
		setPokemonMatches([]);

		// Si no posee todos los pojemons, sale
		if (!!datos?.data.next) return;
		const matches = [];

		datos.data.results.forEach((pokemon) => {
			if (pokemon.name.replaceAll("-", " ").match(pokemonToSearch.toLowerCase()))
				matches.push({ name: pokemon.name, url: pokemon.url });
		});
		setPokemonMatches(matches);

		if (matches.length === 0) setDoASearch(true);
	}

	return (
		<form
			className="flex justify-start items-center my-8 max-w-lg mx-auto px-6 text-lg"
			onSubmit={handleSubmit}>
			<input
				type="text"
				className={`bg-gray-700 py-1 w-full outline-none pl-3 disabled:opacity-50 md:text-xl`}
				placeholder="Pokémon name"
				onChange={handleChangePokemonToSearch}
				value={pokemonToSearch}
				disabled={!!datos?.data?.next || doASearch}
			/>
			<input
				type="submit"
				value="Search"
				className={`bg-green-800 py-1 px-3 active:brightness-150 disabled:opacity-50 md:text-xl`}
				disabled={
					!!datos?.data?.next || !pokemonToSearch || pokemonToSearch.length < 3 || doASearch
				}
			/>
		</form>
	);
}

export default PokeForm;
