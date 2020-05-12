import React, { useState, useCallback } from 'react'
import Card from './Card'
import update from 'immutability-helper'

const style = {
    width: 310,
}

export interface Item {
    id: number
    text: string
}

export interface ContainerState {
    cards: Item[]
}

const Container: React.FC = () => {
    {
        const [cards, setCards] = useState([
            {
                id: 1,
                text: 'Test 1',
            },
            {
                id: 2,
                text: 'Test 2',
            },
            {
                id: 3,
                text: 'Test 3',
            },
            {
                id: 4,
                text: 'Test 4',
            },
            {
                id: 5,
                text:
                    'Test 5',
            },
            {
                id: 6,
                text: 'Test 6',
            },
            {
                id: 7,
                text: 'Test 7',
            },
        ])

        const moveCard = useCallback(
            (dragIndex: number, hoverIndex: number) => {
                const dragCard = cards[dragIndex]
                setCards(
                    update(cards, {
                        $splice: [
                            [dragIndex, 1],
                            [hoverIndex, 0, dragCard],
                        ],
                    }),
                )
            },
            [cards],
        )

        const renderCard = (card: { id: number; text: string }, index: number) => {
            return (
                <Card
                    key={card.id}
                    index={index}
                    id={card.id}
                    text={card.text}
                    moveCard={moveCard}
                />
            )
        }

        return (
            <>
                <div style={style}>{cards.map((card, i) => renderCard(card, i))}</div>
            </>
        )
    }
}

export default Container
