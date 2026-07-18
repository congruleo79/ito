import { useEffect, useRef, useState } from "react"
import "./App.css"

const categoryGroups = [
  {
    category: "Keepsakes & Big Wishes",
    accent: "watermelon",
    prompts: {
      pamina: [
        "This is something Pamina would take to a lonely island.",
        "This is something Pamina would save from her burning apartment.",
        "This is something Pamina would buy after winning the lottery.",
      ],
      general: ["This is something you would wish for from a genie.", "That is really important in life."],
    },
  },
  {
    category: "Gifts, Food & Sweet Gestures",
    accent: "banana",
    prompts: {
      pamina: ["This is the meal Pamina wants to be spoiled with.", "This is a birthday gift Pamina would be happy about."],
      general: ["This is a nice anniversary gift.", "This is a nice compliment to receive."],
    },
  },
  {
    category: "Places & Travel",
    accent: "lagoon",
    prompts: {
      pamina: ["This is a vacation Pamina would enjoy."],
      general: ["This is a place where I would like to live.", "This is something to visit as a tourist in Vienna."],
    },
  },
  {
    category: "Style",
    accent: "tangerine",
    prompts: {
      pamina: ["This is something Pamina would paint onto her nails."],
      general: ["This is a great outfit for a birthday brunch."],
    },
  },
  {
    category: "Famous Faces",
    accent: "blueberry",
    prompts: {
      pamina: ["This is a fictional character Pamina would go on a date with."],
      general: ["This is a famous person I'd like to get stuck with on an elevator.", "This is a historical figure I would sleep with."],
    },
  },
  {
    category: "Pop Culture & Entertainment",
    accent: "mint",
    prompts: {
      pamina: ["This is a song Pamina could sing at Karaoke.", "This is an emoji Pamina uses a lot."],
      general: ["This song brings everybody to the dancefloor!", "This is a movie/TV series worth rewatching."],
    },
  },
  {
    category: "Embarrassments, Fears & Irritations",
    accent: "bubblegum",
    prompts: {
      pamina: ["This is a lie Pamina would fall for.", "This is something that annoys Pamina."],
      general: ["That's scary!", "That's embarrassing!", "This is a great opener on a dating app."],
    },
  },
  {
    category: "Everyday Life",
    accent: "lemon-lime",
    prompts: {
      pamina: ["This is something Pamina says often.", "This is a nickname Pamina likes to be called."],
      general: ["This is something to do on the subway."],
    },
  },
]

const questionCards = categoryGroups.flatMap((group) =>
  Object.entries(group.prompts).flatMap(([type, prompts]) =>
    prompts.map((question) => ({
      type,
      category: group.category,
      question,
      accent: group.accent,
    })),
  ),
)

const floaters = ["dot-a", "dot-b", "star-a", "dot-c", "star-b", "dot-d"]

function shuffleDeck(length, previousLastIndex = null) {
  const deck = Array.from({ length }, (_, index) => index)

  for (let index = deck.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(Math.random() * (index + 1))
    ;[deck[index], deck[swapIndex]] = [deck[swapIndex], deck[index]]
  }

  if (previousLastIndex !== null && deck.length > 1 && deck[0] === previousLastIndex) {
    ;[deck[0], deck[1]] = [deck[1], deck[0]]
  }

  return deck
}

function App() {
  const [deckOrder, setDeckOrder] = useState(() => shuffleDeck(questionCards.length))
  const [deckPosition, setDeckPosition] = useState(0)
  const [isDrawing, setIsDrawing] = useState(false)
  const [hasDrawn, setHasDrawn] = useState(false)
  const [drawCount, setDrawCount] = useState(0)
  const timeoutRef = useRef(null)

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        window.clearTimeout(timeoutRef.current)
      }
    }
  }, [])

  const selectedIndex = deckOrder[deckPosition] ?? 0
  const selectedCard = questionCards[selectedIndex]

  function handleDraw() {
    if (isDrawing) {
      return
    }

    setIsDrawing(true)
    setDrawCount((count) => count + 1)

    timeoutRef.current = window.setTimeout(() => {
      if (!hasDrawn) {
        setHasDrawn(true)
      } else {
        if (deckPosition >= deckOrder.length - 1) {
          setDeckOrder(shuffleDeck(questionCards.length, selectedIndex))
          setDeckPosition(0)
        } else {
          setDeckPosition((position) => position + 1)
        }
      }

      setIsDrawing(false)
    }, 1500)
  }

  return (
    <main className="app-shell">
      <div className="skyline" aria-hidden="true">
        {floaters.map((shape) => (
          <span key={shape} className={`floater ${shape}`}></span>
        ))}
      </div>

      <section className="play-stage">
        <div className="deck-column">
          <div className={`deck-zone ${isDrawing ? "is-drawing" : ""}`}>
            <div className="pile-shadow"></div>
            <article className="pile-card pile-card-a" aria-hidden="true">
              <span>guess it</span>
            </article>
            <article className="pile-card pile-card-b" aria-hidden="true">
              <span>tell all</span>
            </article>
            <article className="pile-card pile-card-c" aria-hidden="true">
              <span>no bluff</span>
            </article>
            <article className="pile-card pile-card-d" aria-hidden="true"></article>
            <article className="launch-card" aria-hidden="true">
              <span>?</span>
            </article>
          </div>

          <button type="button" className="draw-cta" onClick={handleDraw} disabled={isDrawing}>
            {isDrawing ? "Shuffling the pile..." : "Draw a question card"}
          </button>
        </div>

        {hasDrawn ? (
          <article key={`${selectedIndex}-${drawCount}`} className={`question-card accent-${selectedCard.accent} ${isDrawing ? "is-waiting" : "is-revealed"}`}>
            <div className="card-topline">
              {selectedCard.type === "pamina" ? <span className="card-badge">Pamina</span> : <span className="card-spacer" aria-hidden="true"></span>}
              <span className="card-suit">{selectedCard.category}</span>
            </div>

            <h2>{selectedCard.question}</h2>
          </article>
        ) : (
          <article className="question-card question-card-placeholder">
            <div className="placeholder-copy">
              <p>Draw a card</p>
            </div>
          </article>
        )}
      </section>
    </main>
  )
}

export default App
