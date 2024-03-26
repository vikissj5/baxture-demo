'use client'

import Cards from "./components/Cards";
import { Grid, GridCol } from "@mantine/core";
import { getData } from "./api";
import { useEffect, useState } from "react";

export default function HomePage() {
  const [cards, setCards] = useState([]);
  const [screenSize, setScreenSize] = useState<number>(window.innerWidth); // Initialize with the initial screen width

  useEffect(() => {
    async function getCards() {
      let data = await getData();
      setCards(data);
    }

    getCards();

    const handleResize = () => {
      setScreenSize(window.innerWidth); // Update screen size on resize
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize); // Cleanup on component unmount
    };
  }, []);

  const deleteItem = (id: number) => {
    const newCards = cards.filter((d: any) => id !== d.id);
    setCards(newCards);
  };

  return (
    <>
      <Grid overflow="hidden" style={{ margin: '20px' }}>
        {cards.map((d: any) => (
          <GridCol span={screenSize <= 768 ? 12 : screenSize <= 1024 ? 6 : 3} key={d.id}>
            <Cards
              title={d.name}
              email={d.email}
              domain={d.website}
              phone={d.phone}
              id={d.id}
              deleteAction={() => deleteItem(d.id)}
            />
          </GridCol>
        ))}
      </Grid>
    </>
  );
}


