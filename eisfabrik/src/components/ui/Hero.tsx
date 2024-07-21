import { Title, Text, Button, Container } from "@mantine/core";
import { Dots } from "./Dots";
import classes from "../styles/Hero.module.css";

export function Hero() {
  return (
    <Container className={classes.wrapper} size={1400}>
      <Dots className={classes.dots} style={{ left: 0, top: 0 }} />
      <Dots className={classes.dots} style={{ left: 60, top: 0 }} />
      <Dots className={classes.dots} style={{ left: 0, top: 140 }} />
      <Dots className={classes.dots} style={{ right: 0, top: 60 }} />

      <div className={classes.inner}>
        <Title className={classes.title}>
          <Text component="span" className={classes.highlight} inherit>
            EisFabrik:
          </Text>{" "}
          Where Every Scoop is a Dream
        </Title>

        <Container p={0} size={600}>
          <Text size="lg" c="dimmed" className={classes.description}>
            Indulge in Pure Ice Cream Bliss with Eisfabrik. Our Commitment to
            Quality and Innovation Means Every Scoop is Crafted to Perfection.
          </Text>
        </Container>

        <div className={classes.controls}>
          <Button
            className={classes.control}
            size="lg"
            variant="default"
            color="gray"
          >
            Shops near you
          </Button>
          <Button className={classes.control} size="lg">
            Our Flavors
          </Button>
        </div>
      </div>
    </Container>
  );
}
