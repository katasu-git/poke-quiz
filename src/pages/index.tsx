import Head from "next/head";
import Image from "next/image";
import axios from "axios";
import { useEffect, useState } from "react";

type PokeQuiz = {
  name: string;
  genus: string;
  imageUrl: string;
};

export default function Home() {
  const [pokeQuiz, setPokeQuiz] = useState<PokeQuiz | null>(null);
  const [inputtedValue, setInputtedValue] = useState<string>("");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputtedValue(event.target.value);
  };

  const kanaToHira = (str: string) => {
    return str.replace(/[\u30a1-\u30f6]/g, function (match) {
      var chr = match.charCodeAt(0) - 0x60;
      return String.fromCharCode(chr);
    });
  };

  useEffect(() => {
    const inner = async () => {
      const bookId = Math.floor(Math.random() * 904) + 1;
      // ポケモン情報取得.
      const pokemon = await axios.get(
        `https://pokeapi.co/api/v2/pokemon/${bookId}`
      );
      const imageUrl =
        pokemon.data.sprites.other["official-artwork"].front_default;
      // ポケモン種族情報取得.
      const speciesUrl = pokemon.data.species.url;
      const pokeSpecies = await axios.get(speciesUrl);
      // 日本語名
      const jaName = pokeSpecies.data.names.find(
        (v: { language: { name: string } }) => v.language.name == "ja"
      );
      // 日本語分類名
      const genus = pokeSpecies.data.genera.find(
        (v: { language: { name: string } }) => v.language.name == "ja"
      );
      console.log(jaName);
      console.log(genus);
      setPokeQuiz({
        name: jaName.name,
        genus: genus.genus,
        imageUrl: imageUrl,
      });
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
      <main className="">
        {pokeQuiz && (
          <>
            <Image
              src={pokeQuiz?.imageUrl}
              width={200}
              height={200}
              alt="pokemon image"
            />
            <p>{pokeQuiz.name}</p>
            <p>{pokeQuiz.genus}</p>
          </>
        )}
        <form onSubmit={() => {}}>
          <label>
            こたえ:
            <input
              type="text"
              value={inputtedValue}
              onChange={handleChange}
              className="border"
            />
          </label>
          {/*<input type="submit" value="Submit" />*/}
        </form>
        {pokeQuiz && (
          <>
            <div>
              {kanaToHira(pokeQuiz.genus) === inputtedValue + "ぽけもん" ? (
                <p>正解！</p>
              ) : (
                <p>不正解！</p>
              )}
            </div>
          </>
        )}
      </main>
    </>
  );
}
