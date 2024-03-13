import { useEffect } from "react";
import { useState } from "react";
import Quote from "./Quote";
import { Badge } from "@/components/ui/badge";

export default function App() {
  const [quotes, setQuotes] = useState([]);
  const [tags, setTags] = useState(["tag1", "tag2", "tag3", "tag4"]);
  const [selectedTag, setSelectedTag] = useState(null);

  async function getQuotes() {
    const request = await fetch(`/quotes.json`);
    const podatki = await request.json();
    setQuotes(podatki);
  }

  function isQuoteSelected(quote) {
    if (!selectedTag) return true;
    return quote.tags.includes(selectedTag);
    // quote.tags.forEach((tag) => {
    //   if (tag == selectedTag) {
    //     console.log(tag + " " + selectedTag);
    //     return true;
    //   }
    // });
    // return false;
  }

  useEffect(() => {
    console.log("quotes:", quotes);
    console.log(
      "filtered:",
      quotes.filter((q) => isQuoteSelected(q)),
    );
  }, [selectedTag, quotes]);

  useEffect(() => {
    getQuotes();
  }, []);

  useEffect(() => {
    //Ali qutes obstaja in ima elemente
    if (!(quotes && quotes.length > 0)) {
      // Ce ne , prenehamo izvajati funkcijo
      return;
    }
    //Ce pridemo do sem , vemo da se zgornji if ni izvedel
    let tags = [];

    quotes.forEach((e) => {
      const quote_tags = e["tags"];
      // 1. for loop za vse tage od tega quota (e["tags"]);
      quote_tags.forEach((t) => {
        //console.log(t);
        if (tags.includes(t)) {
          //console.log(t);
        } else {
          tags.push(t);
        }
      });
    });
    // 2. za vsakega preverimo,ce je v seznamu tags.includes("FamuoQuotes")
    // 3. ce tega elementa se ni v seznamu, ga dodamo tags.push("FamousQuotes")

    setTags(tags);
    console.log(tags);
  }, [quotes]);

  return (
    <div className="p-4">
      <h2>{selectedTag}</h2>
      <div>
        {tags.map((tag) => (
          <Badge key={tag} onClick={() => setSelectedTag(tag)}>
            {tag}
          </Badge>
        ))}
      </div>
      <div className="grid grid-cols-3 gap-4">
        {quotes
          .filter((q) => isQuoteSelected(q))
          .map((quote) => (
            <Quote test={quote} key={quote["id"]}></Quote>
          ))}
      </div>
    </div>
  );
}
