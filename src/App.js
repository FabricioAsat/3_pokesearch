import { useState } from "react";
import PokeCard from "./components/PokeCard";
import PokeCardsContainer from "./components/PokeCardsContainer";
import PokeForm from "./components/PokeForm";

const App = () => {
	const [pokemonToSearch, setPokemonToSearch] = useState("");
	const [pokemonMatches, setPokemonMatches] = useState([]);
	const [doASearch, setDoASearch] = useState(false);

	function handleChangePokemonToSearch(e) {
		setPokemonToSearch(e.target.value);
		// if (doASearch) setDoASearch(false);
	}

	// Resetea los 3 estados
	function resetStates() {
		setPokemonToSearch("");
		setPokemonMatches([]);
		setDoASearch(false);
	}

	return (
		<div className="pb-10">
			<PokeForm
				handleChangePokemonToSearch={handleChangePokemonToSearch}
				pokemonToSearch={pokemonToSearch}
				setPokemonMatches={setPokemonMatches}
				setDoASearch={setDoASearch}
				doASearch={doASearch}
			/>

			<Container
				pokemonMatches={pokemonMatches}
				pokemonToSearch={pokemonToSearch}
				resetStates={resetStates}
				doASearch={doASearch}
			/>
		</div>
	);
};

function Container({ pokemonMatches, pokemonToSearch, doASearch, resetStates }) {
	// ! Retorna las cards con los pokemones que cumplen en nombre de búsqueda.
	if (pokemonMatches.length !== 0)
		return (
			<>
				<button
					className="bg-emerald-800 px-4 py-1 font-bold border-lime-500 border rounded-md block mx-auto"
					onClick={resetStates}>
					Come back
				</button>
				<div className="grid grid-cols-gridCards justify-items-center gap-x-6 gap-y-6 px-4 py-10">
					{pokemonMatches.map((pokemon) => (
						<PokeCard key={pokemon.name} url={pokemon.url} />
					))}
				</div>
			</>
		);

	if (doASearch)
		return (
			<div className="w-full text-center">
				<h2 className="text-3xl py-4">
					No existe el pokémon <b>{pokemonToSearch}</b>
				</h2>
				<button
					onClick={resetStates}
					className="bg-emerald-800 px-4 py-1 font-bold border-lime-500 border rounded-md">
					Volver
				</button>
			</div>
		);

	return <PokeCardsContainer pokemonMatches={pokemonMatches} />;
}

export default App;
