import { useMemo, useState } from "react";
import { capitaisBR } from "../../data/data";
import { normalize } from "../../utils/normalize";
import "./CapitalAutocomplete.css"

export default function CapitalAutocomplete ({onSelect}){
    const [query, setQuery] = useState("");
    const [open, setOpen] = useState(false)

    const suggestions = useMemo(()=>{
        const q = normalize(query);
        if(!q) return [];
        return capitaisBR
        .filter((c)=> normalize(c.nome).startsWith(q))
        .slice(0,8);
    }, [query])

    function handlePick(capital) {
    setQuery(capital.nome);
    setOpen(false);
    onSelect?.(capital); // {uf, nome}
  }

  return (
    <div className="autocomplete">
      <input
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          setOpen(true);
        }}
        onFocus={() => setOpen(true)}
        onBlur={() => setTimeout(() => setOpen(false), 120)}
        placeholder="Digite uma capital (ex: rio...)"
      />

      {open && suggestions.length > 0 && (
        <ul className="autocomplete__list">
          {suggestions.map((c) => (
            <li key={c.uf}>
              <button type="button" onClick={() => handlePick(c)}>
                {c.nome} — {c.uf} ({c.estado})
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}