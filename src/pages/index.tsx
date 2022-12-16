import Head from "next/head";
import Image from "next/image";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Home() {
  const [pokemon, setPokemon] = useState(null);

  useEffect(() => {
    const inner = async () => {
      const response = await axios.get("https://pokeapi.co/api/v2/pokemon/25");
      setPokemon(response.data);
      console.log(response.data);
    };
    inner();
  }, []);

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="pokequiz" content="pokequiz" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="text-red-600">
        {pokemon && (
          <Image
            src={pokemon.sprites.front_default}
            width="200"
            height="200"
            alt={""}
          />
        )}
      </main>
    </>
  );
}
