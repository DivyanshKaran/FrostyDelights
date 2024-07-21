"use client";
import { Carousel } from "@mantine/carousel";
import { useMediaQuery } from "@mantine/hooks";
import { Paper, Text, Title, useMantineTheme, rem } from "@mantine/core";
import classes from "../styles/ImageCarousel.module.css";

interface CardProps {
  image: string;
  title: string;
  category: string;
}

function Card({ image, title, category }: CardProps) {
  return (
    <Paper
      shadow="md"
      p="xl"
      radius="md"
      style={{ backgroundImage: `url(${image})` }}
      className={classes.card}
    >
      <div>
        <Text className={classes.category} size="xs">
          {category}
        </Text>
        <Title order={3} className={classes.title}>
          {title}
        </Title>
      </div>
    </Paper>
  );
}

const data = [
  {
    image: "/0.png",
    title: "Butterscoth Cup",
    category: "Cup",
  },
  {
    image: "/1.png",
    title: "Choclate Cup",
    category: "Cup",
  },
  {
    image: "/2.png",
    title: "Chocochip Cup",
    category: "Cup",
  },
  {
    image: "/3.png",
    title: "Magnum",
    category: "Stick",
  },
  {
    image: "/4.png",
    title: "Choco-Vanilla Sanwich",
    category: "Sandwich",
  },
  {
    image: "/5.png",
    title: "Choco-Butterscoth Sandwich",
    category: "Sandwich",
  },
];

export function ImageCarousel() {
  const theme = useMantineTheme();
  const mobile = useMediaQuery(`(max-width: ${theme.breakpoints.sm})`);
  const slides = data.map((item) => (
    <Carousel.Slide key={item.title}>
      <Card {...item} />
    </Carousel.Slide>
  ));

  return (
    <Carousel
      withIndicators
      height={200}
      loop
      slideSize={{ base: "100%", sm: "50%" }}
      slideGap={{ base: rem(2), sm: "xl" }}
      align="start"
      slidesToScroll={mobile ? 1 : 2}
    >
      {slides}
    </Carousel>
  );
}
