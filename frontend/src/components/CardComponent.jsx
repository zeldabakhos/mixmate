import React, { useState } from 'react';
import styled from 'styled-components';

// Styled-components, slightly adjusted for cocktail cards
const CardContainer = styled.div`
  perspective: 1000px;
  width: 280px;
  height: 420px;
  margin: 1rem;
  position: relative;
  overflow: hidden;
`;

const CardInner = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  transition: transform 0.6s;
  transform-style: preserve-3d;
  transform: ${props => (props.flipped ? 'rotateY(180deg)' : 'none')};
`;

const CardFace = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  border: 1px solid #ccc;
  border-radius: 12px;
  overflow: hidden;
  background: white;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const CardFront = styled(CardFace)`
  z-index: 2;
`;

const CardBack = styled(CardFace)`
  transform: rotateY(180deg);
  padding: 1rem;
  background-color: #fef8f1;
  overflow-y: auto;
`;

const CardImage = styled.img`
  width: 100%;
  height: 50%;
  object-fit: cover;
`;

const CardBody = styled.div`
  padding: 1rem;
  flex-grow: 1;
`;

const Button = styled.button`
  background-color: #8b5c2c;
  color: white;
  padding: 10px 15px;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  cursor: pointer;
  width: 100%;
  margin-top: 10px;
  transition: background-color 0.3s ease, transform 0.3s ease;

  &:hover {
    background-color: #a97847;
    transform: scale(1.05);
  }

  &:focus {
    outline: none;
  }
`;

// Helper to show ingredients dynamically from cocktail data
const getIngredients = (cocktail) => {
  const ingredients = [];
  for (let i = 1; i <= 15; i++) {
    const ingredient = cocktail[`strIngredient${i}`];
    const measure = cocktail[`strMeasure${i}`];
    if (ingredient) {
      ingredients.push(
        <li key={i}>
          {measure ? measure : ''} {ingredient}
        </li>
      );
    }
  }
  return ingredients;
};

const CocktailCard = ({ cocktail, onMakeDrink }) => {
  const [flipped, setFlipped] = useState(false);

  return (
    <CardContainer>
      <CardInner flipped={flipped}>
        <CardFront>
          <CardImage src={cocktail.strDrinkThumb} alt={cocktail.strDrink} />
          <CardBody>
            <h3>{cocktail.strDrink}</h3>
            <Button onClick={() => setFlipped(true)}>View Recipe</Button>
          </CardBody>
        </CardFront>

        <CardBack>
          <div>
            <h3>{cocktail.strDrink}</h3>
            <h4>Ingredients:</h4>
            <ul>{getIngredients(cocktail)}</ul>
            <h4>Instructions:</h4>
            <p>{cocktail.strInstructions}</p>
          </div>
          <Button onClick={() => { setFlipped(false); }}>Back</Button>
          <Button onClick={() => onMakeDrink(cocktail)} style={{ marginTop: '10px' }}>
            Make This Drink
          </Button>
        </CardBack>
      </CardInner>
    </CardContainer>
  );
};

export default CocktailCard;
