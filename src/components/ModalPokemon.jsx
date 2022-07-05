import React, { useEffect, useState } from "react";

const ModalPokemon = ({ datos, setShowModal }) => {
	const [data, setData] = useState({
		img: [],
		name: "",
		types: [],
		abilities: [],
		base_experience: 0,
		height: 0,
		weight: 0,
	});

	useEffect(() => {
		if (datos.isPending) return;

		const name = datos.data.name.replaceAll("-", " ");
		const img = [
			datos.data.sprites.front_default,
			datos.data.sprites.back_default,
			datos.data.sprites.front_shiny,
			datos.data.sprites.back_shiny,
		];
		const base_experience = datos.data.base_experience;
		const height = datos.data.height;
		const weight = datos.data.weight;
		let types = "";
		let abilities = [];

		datos.data.types.forEach((type) => {
			types += type.type.name + " ";
		});

		datos.data.abilities.forEach((ability) => {
			abilities.push({ name: ability.ability.name, is_hidden: ability.is_hidden });
		});

		setData({ name, img, types, abilities, base_experience, height, weight });
	}, []);

	return (
		<div className="fixed flex justify-center items-center bg-black/50 h-full w-full top-0 left-0">
			<div className="flex flex-col gap-10 w-full sm:w-3/4 max-w-4xl bg-slate-900 h-3/4 overflow-y-auto">
				{/* Botón X */}
				<span className="fixed w-full sm:w-3/4 max-w-4xl flex justify-end">
					<button
						className="absolute -top-2 sm:-right-3 h-12 w-12 bg-gray-800 border border-gray-600 rounded-full font-black text-2xl"
						onClick={() => setShowModal(false)}>
						X
					</button>
				</span>

				<div className="grid grid-cols-1 md:grid-cols-2 justify-items-center items-center">
					<picture className="grid grid-cols-2">
						{data.img.map((image, index) => (
							<img src={image} key={index} alt="" className="h-32 md:h-40 object-cover" />
						))}
					</picture>

					<span className="text-center">
						<h2 className="text-4xl md:text-5xl lg:text-6xl font-bold capitalize">{data.name}</h2>
						<small className="text-lg md:text-xl lg:text-2xl italic capitalize">{data.types}</small>
					</span>
				</div>

				<div className="grid grid-cols-1 gap-y-4 md:grid-cols-2 justify-items-center items-center">
					<span className="flex flex-col items-center justify-center">
						<h4 className="text-xl font-medium">Base data</h4>
						<p>
							Height: <b>{data.height} Foots</b>
						</p>
						<p>
							Weight: <b>{data.weight} Pounds</b>
						</p>
						<p>
							Base Experience: <b>{data.base_experience}</b>
						</p>
					</span>

					<span className="flex flex-col items-center justify-center">
						<h4 className="text-xl font-medium">Abilities</h4>
						{data.abilities.map((ability, index) => (
							<div key={index} className="flex justify-center items-center gap-2">
								<small className="">
									{ability.is_hidden ? " Hidden Ability: " : " Normal Ability: "}
								</small>
								<h4 className="capitalize ">{ability.name} </h4>
							</div>
						))}
					</span>
				</div>
			</div>
		</div>
	);
};

export default ModalPokemon;
